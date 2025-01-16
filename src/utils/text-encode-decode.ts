export function encode(originalData: any) {
    const shuffle: { [key: string]: string } = {
        "0": "1", "1": "3", "2": "5", "3": "7", "4": "9",
        "5": "a", "6": "c", "7": "f", "8": "e", "9": "d",
        "a": "b", "b": "8", "c": "6", "d": "4", "e": "2", "f": "0"
    };

    const packet = JSON.stringify([originalData]);
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(packet);
    let hex = Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0')).join('');

    let shuffledHex = "";
    for (let i = 0; i < hex.length; i++) {
        shuffledHex += shuffle[hex[i]];
    }
    return shuffledHex;
}

export function decode(hexadecimalData: any) {
    try {
        const shuffle: { [key: string]: string } = {
            "1": "0", "3": "1", "5": "2", "7": "3", "9": "4",
            "a": "5", "c": "6", "f": "7", "e": "8", "d": "9",
            "b": "a", "8": "b", "6": "c", "4": "d", "2": "e", "0": "f"
        };

        let hex = "";
        for (let i = 0; i < hexadecimalData.length; i++) {
            hex += shuffle[hexadecimalData[i]];
        }

        let byteArray = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
        const decoder = new TextDecoder();
        const packet = decoder.decode(byteArray);
        const originalData = JSON.parse(packet)[0];

        return originalData;
    } catch (error) {
        console.log("Decode failed", error);
        return null;
    }
}
