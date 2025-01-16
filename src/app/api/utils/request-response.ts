import { decode, encode } from "@/utils/text-encode-decode";
import { NextResponse } from "next/server";

/*****
 * Modified version of receive requested payload
 * Prevent showing actual response on client browser
 * Able to received text, object, array, number, boolean etc. in encoded format
 ******/
export async function requestJson(request: any) {
    const data = await request.json();
    return decode(data.payload)
}
/*****
 * Modified version of NextResponse.json()
 * Prevent showing actual response on client browser
 * Able to return text, object, array, number, boolean etc. in encoded format
 ******/
const doEncode = true;
export function nextResponseJson(data: any, status?: number) {
    if (doEncode) return NextResponse.json(data ? encode(data) : null, { status: status ? status : 200 })
    else return NextResponse.json(data ? data : null, { status: status ? status : 200 })
}