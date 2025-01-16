import Axios, { AxiosResponse } from "axios";
import useSWR_actual, { mutate as mutate_actual } from 'swr';
import axios, { processApiResponse } from "./axios";
import { useEffect } from "react";
import { encode } from "../text-encode-decode";
import Console from "../console";
import $$ from "@/utils/global-variables";

const cache: any = {}

/*****
 * Modified version of SWR
 * Try-catch block scope is attached
 * Provide better caching functionality
 * Control over revalidate on mount
 * Give actual response data by decoding encoded response
 ******/
export function useSWR(url: any, refreshInterval?: number) {
    const { data, error, isLoading, isValidating, mutate } = useSWR_actual(url, fetcherSWR, {
        // revalidateOnMount: true,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: true,
        refreshInterval: refreshInterval || 0,
    })

    //  Global registry for hooks
    //  When cacheKey's value is true, thats means the hook is on mount component
    //  When cacheKey's value is undefined, thats means the hook is not on mount component
    //  When cacheKey's value is defined but not true, thats means the hook is not on mount component and there have cache value for the hook
    useEffect(() => {
        if (!url) return;
        const cacheKey = encode(url);

        (async () => {
            // When first time mount
            if (cache[cacheKey] === undefined) cache[cacheKey] = true;

            // Check any cache data available
            else {
                if (cache[cacheKey] !== true && cache[cacheKey]) {
                    const data = cache[cacheKey]
                    cache[cacheKey] = true;
                    await mutate(data);
                }
            }
        })();

        return () => {
            cache[cacheKey] = undefined;
        }
    }, [url, mutate])

    return [data, mutate]
}

/*****
 * Modified version of mutate of SWR
 * Provide better caching functionality
 * If hook is available on mount component the recall the hook, else fetch response from API and cache the response
 ******/
export async function mutate(url: any) {
    if (!url) return;
    const cacheKey = encode(url);
    if (cache[cacheKey] === true) {
        const res = await mutate_actual(url);
        return res;
    }
    else {
        const urlKey = typeof url === "string" ? url : url[0];
        const inputData = typeof url === "string" ? null : url[1]
        if (inputData) {
            const res = await axios.post(urlKey, inputData);
            cache[cacheKey] = encode(res)
        }
        else {
            const res = await axios.get(urlKey);
            cache[cacheKey] = encode(res)
        }
        const text = typeof url === "string" ? url : url[0]
        Console.api.cache(text)
        return cache[cacheKey];
    }
}


/*****
 * This function follow the functionaly of modified-version-of-Axios
 ******/
export async function fetcherSWR(input: any) {
    $$.totalOnProgressAPI++;
    if (typeof input === "string") {
        const url: string = input;
        try {
            const res: AxiosResponse = await Axios.get(url, {
                headers: {
                    "auth-token": $$.authToken || ""
                }
            });
            $$.totalOnProgressAPI--;
            return processApiResponse(url, res);
        } catch (error: any) {
            console.log("error", error)
            $$.totalOnProgressAPI--;
            return processApiResponse(url, error.response, error.message);
        }
    } else {
        const [url, obj] = input;
        try {
            const res: AxiosResponse = await Axios.post(url, { payload: encode(obj) }, {
                headers: {
                    "auth-token": $$.authToken || ""
                }
            });
            $$.totalOnProgressAPI--;
            return processApiResponse(url, res);
        } catch (error: any) {
            console.log("error", error)
            $$.totalOnProgressAPI--;
            return processApiResponse(url, error.response, error.message);
        }
    }
};