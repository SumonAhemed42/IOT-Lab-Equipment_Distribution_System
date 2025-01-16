import { verify } from "jsonwebtoken";
export const jwtTokenVerify = (request: any) => {
    try {
        // if (request.cookies.get(process.env.TOKEN_NAME)) {
        //     const tokenValue = request.cookies.get(process.env.TOKEN_NAME).value;
        // } return undefined;
        const tokenValue = request.headers.get("auth-token")
        let data = verify(tokenValue, process.env.JWT_KEY!);
        return data;
    } catch (error) {
        return undefined;
    }
}