import { encode } from "./text-encode-decode";

/*****
 * Get URL pathnames in array
 * Example:
    - URL: http://localhost:3000/home, Output: ["home"]
    - URL: http://localhost:3000/home/electronics, Output: ["home", "electronics"]
 ******/
export function getUrlParams() {
    const pathname = window.location.pathname;
    const arr = pathname.slice(1).split("/");
    return arr
}

// -----
// Check- Is a variable null or not?
// Number, string, object, array data type can be validate here
// -----
export function isNull(variable: any): boolean {
    if (variable === "" || variable === null || variable === undefined) return true;

    if (typeof variable === "number") {
        if (variable === 0) return true;
        else return false;
    }
    else if (typeof variable === "string") {
        if (variable.trim() === "" || variable.trim() === null || variable.trim() === undefined) return true;
        else return false;
    } if (Array.isArray(variable)) {
        if (variable.length === 0) return true;
        else return false;
    } else if (typeof variable === "object") {
        if (Array.isArray(variable)) {
            if (variable.length === 0) return true;
            else return false;
        } else {
            if (Object.keys(variable).length === 0) return true;
            else return false;
        }
    } else return true;
}

// -----
// Check- Is a variable null or not?
// Number, string, object, array data type can be validate here
// -----
export function isNotNull(variable: any): boolean {
    return isNull(variable) === true ? false : true;
}

// -----
// Check- Is a letter or word or digit presented on a text/paragraph?
// -----
export function searchKeywordMatched(text: string, keyword: string) {
    try {
        return text.toLowerCase().search(keyword.toLowerCase()) !== -1;
    } catch (error: any) {
        return text.search(keyword) !== -1;
    }
}

// -----
// It can pause the execution of an async function for defined time.
// -----
export async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function containsNonDigit(str: string): boolean {
    return /[^0-9]/.test(str);
}

/*
// Example usage
containsNonDigit("1234") // output: false
containsNonDigit("123a4") // output: true
*/

function replaceRandomDigitWithA(input: string): string {
    // Convert the string to an array of characters
    const arr: string[] = input.split('');

    // Find all indices of digits in the array
    const digitIndices: number[] = arr.reduce((indices: number[], char: string, index: number) => {
        if (/\d/.test(char)) {
            indices.push(index);
        }
        return indices;
    }, []);

    // Check if there are any digits in the array
    if (digitIndices.length === 0) {
        return input; // Return the original input if no digits are found
    }

    // Choose a random index from the digitIndices array
    const randomIndex: number = digitIndices[Math.floor(Math.random() * digitIndices.length)];

    // Replace the digit at the chosen index with 'a'
    arr[randomIndex] = 'a';

    // Join the array back into a string
    return arr.join('');
}

/*
// Example usage
const input: string = "12345678";
const result: string = replaceRandomDigitWithA(input);
console.log(result); // Output could be "123a5678", "12a45678", "1234a678", etc.
*/



// -----
// It can generate an unique integer ID
// -----
let createdId = 0;
export function createId(): number {
    if (createdId === 0) createdId = new Date().getTime() - 1709297743920; // Substracted time is 6:55PM, 1 March 2024
    createdId++;
    return createdId;
}

// -----
// It can generate an unique string ID
// -----
export function createStringId(): string {
    let id = createId()
    const newId = encode(id);
    if (containsNonDigit(newId)) return newId;
    else return replaceRandomDigitWithA(newId)
}

// -----
// Check- Is the device is mobile or not?
// It only runs on client side
// -----
export function isMobileDevice(): boolean {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
}

// -----
// Check- Is the device is mobile or not?
// It only runs on client side
// -----
/*
export function cleanImageResizeOptions(imageElement: string) {
    if (isNull(imageElement)) return imageElement;
    else return imageElement.replaceAll(
        `onmousedown="startImageResize(event)" onmouseout="imageCornerSquareCtrl(false)" onmousemove="setCursorOnImage(event)"`,
        ""
    )
        .replaceAll(`CLOUD_UPLOAD_DIR`, gv.cloudUploadDir)
        .replaceAll(`hover:outline hover:outline-2 HoverOutlineDeep`, "")
        .replaceAll(`nwse-resize`, "default")
        .replaceAll(`nesw-resize`, "default")
        .replaceAll(`EditorImage `, "");
}
*/

/*****
 * Camel-case to sentence
 * Input: viewOthersHistory, Output: Everyones history
 ******/
export function camelCaseToSentence(input: string) {
    // Add a space before each uppercase letter
    let result = input.replace(/([A-Z])/g, ' $1');

    // Capitalize the first character and make the rest lowercase
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

/*****
 * Convert any range of number into specific range
 *****/
export function shrinkNumberRange(anyNum: number, maxNum: number) {
    return ((anyNum - 1) % maxNum) + 1;
}
/*
// Examples:
console.log(shrinkNumberRange(1, 5)); // output: 1
console.log(shrinkNumberRange(2, 5)); // output: 2
console.log(shrinkNumberRange(3, 5)); // output: 3
console.log(shrinkNumberRange(4, 5)); // output: 4
console.log(shrinkNumberRange(5, 5)); // output: 5
console.log(shrinkNumberRange(6, 5)); // output: 1
console.log(shrinkNumberRange(7, 5)); // output: 2
console.log(shrinkNumberRange(8, 5)); // output: 3
console.log(shrinkNumberRange(9, 5)); // output: 4
console.log(shrinkNumberRange(10, 5)); // output: 5
*/

export function adjustTextareaHeight(e: any) {
    const el = e.target;
    if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }
}

/*
export function clickIntoBlankSpace() {
    console.log("clickIntoBlankSpace()")
    const inputField = document.createElement('input');
    inputField.id = "idTempInput";
    inputField.style.position = "fixed";
    inputField.style.bottom = "0";
    inputField.style.background = "lightblue";
    inputField.type = "text";
    inputField.value = "Hello world";

    // Append the input field to the body
    document.body.appendChild(inputField);

    // Simulate a click on the input field, then remove it
    setTimeout(() => {
        const el = document.getElementById("idTempInput");
        if (el) {
            el.focus();
            setTimeout(() => {
                // el.remove();
            }, 10);
        }
    }, 10);
}
    */

/*
  // Check if any input field is focused
        if (
          document.activeElement &&
          (document.activeElement.tagName === "INPUT" ||
            document.activeElement.tagName === "TEXTAREA" ||
            document.activeElement.tagName === "SELECT")
        ) {
          // Remove focus from the focused input field
          (document.activeElement as any).blur();
        }
*/

let clickTimeout: any = undefined;
export function singleDoubleClickEvent(singleClickAction: () => void, doubleClickAction: () => void) {

    // Single click action
    if (clickTimeout === undefined) {
        clickTimeout = setTimeout(() => {
            singleClickAction()
            clickTimeout = undefined;
        }, 250);
    }

    // Double click action
    else {
        clearTimeout(clickTimeout);
        clickTimeout = undefined;
        doubleClickAction()
    }
}