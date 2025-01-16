export function shuffleString(str: string) {
    let arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}
// input: BittaBoibhobBarmon, output: MoBhobBarBBoiittNa

// .....................................

// Make first alphabet in uppercase
export function convertFirstLetterInUppercase(value: string) {
    let result = value.charAt(0).toUpperCase() + value.slice(1);
    return result;
}
// input: bitta, output: Bitta

// .....................................

export function getFirstLetterOnlyInUppercase(str: string) {
    // Check if the input string is not empty
    if (str && str.trim().length > 0) {
        // Get the first character of the string and convert it to uppercase
        return str.trim().charAt(0).toUpperCase();
    } else {
        // Return an empty string if the input is empty
        return "";
    }
}
// input: bitta, output: B

export function intFloatConversion(input: number) {
    const number = parseFloat(input.toFixed(2).toString());
    if (Number.isInteger(number)) {
        return number;
    } else {
        return number.toFixed(2);
    }
}

// .....................................
export function isDigit(num: any) {
    return /^\d+$/.test(num)
}

export function removeDuplicateWords(input: string) {
    // Split the input string into an array of words
    const words = input.split(" ");
    // Create a Set to store unique words
    const uniqueWords: any = new Set(words);
    // Convert the Set back into an array and join the words into a string
    const output = [...uniqueWords].join(" ");
    return output;
}

// .....................................
export function textTruncate(text: string, length: number) {
    if (text.length <= length) return text;
    else return `${text.substring(0, (length - 3))}...`;
}