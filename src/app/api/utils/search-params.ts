export default function searchParams(request: any, key: string) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams)
    const searchKey = searchParams.get(key);
    return searchKey || undefined;
}