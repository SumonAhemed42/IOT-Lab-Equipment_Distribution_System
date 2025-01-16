import { decode, encode } from "./text-encode-decode";

export const LocalStorage: any = new Proxy({}, {
    get(target, prop: any) {
        if (prop === "clear") return () => localStorage.clear()
        else if (prop === "removeItem") return (keyName: string) => localStorage.removeItem(encode(keyName))
        else {
            // Set new key-value
            prop = encode(prop);
            const data = localStorage[prop];
            if (!data) return null;
            else return decode(data);
        }

    },
    set(target, prop: any, value) {
        prop = encode(prop)
        value = encode(value)
        localStorage[prop] = value;
        return true; // indicates success
    }
});

export const SessionStorage: any = new Proxy({}, {
    get(target, prop: any) {
        if (prop === "clear") return () => sessionStorage.clear()
        else if (prop === "removeItem") return (keyName: string) => sessionStorage.removeItem(encode(keyName))
        else {
            // Set new key-value
            prop = encode(prop);
            const data = sessionStorage[prop];
            if (!data) return null;
            else return decode(data);
        }
    },
    set(target, prop: any, value) {
        prop = encode(prop)
        value = encode(value)
        sessionStorage[prop] = value;
        return true; // indicates success
    }
});

/*
// Usage:
LocalStorage.name = "Bitta"
LocalStorage["name"] = "Bitta";
LocalStorage.name); // output: Bitta
LocalStorage["name"]; // output: Bitta
*/


