import Axios, { AxiosResponse } from "axios";
import Console from "../console";
import { decode, encode } from "../text-encode-decode";
import $$ from "@/utils/global-variables";
import { LocalStorage } from "../stroage";

/*****
 * SUB function
 * Receive response of API
 ******/
export function processApiResponse(url: string, res: any, errorMessage?: any) {
    if (!res) {
        Console.api.error(url)
        const result = { status: 403, message: errorMessage }
        console.log(result)
        return result
    } else if (res.status === 200) {
        const resData = decode(res.data)
        Console.api.success(url)
        console.log(resData)
        return resData
    }
    else {
        if (res.status === 401) {
            alert("Unauthorized access");
            window.location.replace(`${$$.loginSiteDomain}/c/logout`)
        }
        Console.api.error(url)
        const result = { status: res.status, message: errorMessage }
        console.log(result)
        return result
    }
}

/*
-- Eliminate: Because $$.authToken not updated here.
export const axiosHeaders = {
    headers: {
        "auth-token": $$.authToken || ""
    }
}
*/

/*****
 * Modified version of Axios
 * Try-catch block scope is attached
 * Give actual response data by decoding encoded response
 ******/
const axios: {
    get: (url: string) => any,
    post: (url: string, inputData?: any) => any,
    delete: (url: string) => any,
} = {
    get: async (url: string) => {
        $$.totalOnProgressAPI++;
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
    },
    post: async (url: string, inputData?: any) => {
        $$.totalOnProgressAPI++;
        if (!inputData) {
            try {
                const res: AxiosResponse = await Axios.post(url, {
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
        } else if (inputData) {
            try {
                const res: AxiosResponse = await Axios.post(url, { payload: encode(inputData) }, {
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
    },
    delete: async (url: string) => {
        $$.totalOnProgressAPI++;
        try {
            const res: AxiosResponse = await Axios.delete(url, {
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
    },
    // PUT method omit here. Bug: auth-token verification problem happened.
}

export default axios;