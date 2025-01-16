export function format(format: string) {
    let el: any;

    if (format === "bold")
        el = document.querySelector(".reactQuill .quill .ql-formats .ql-bold");
    else if (format === "italic")
        el = document.querySelector(".reactQuill .quill .ql-formats .ql-italic");
    else if (format === "underline")
        el = document.querySelector(
            ".reactQuill .quill .ql-formats .ql-underline"
        );
    else if (format === "link")
        el = document.querySelector(".reactQuill .quill .ql-formats .ql-link");
    else if (format === "image")
        el = document.querySelector(".reactQuill .quill .ql-formats .ql-image");
    else if (format === "clean")
        el = document.querySelector(".reactQuill .quill .ql-formats .ql-clean");
    else if (format === "ordered")
        el = document.querySelectorAll(
            ".reactQuill .quill .ql-formats .ql-list"
        )[0];
    else if (format === "bullet")
        el = document.querySelectorAll(
            ".reactQuill .quill .ql-formats .ql-list"
        )[1];
    else if (format === "heading")
        el = document.querySelectorAll(
            ".reactQuill .quill .ql-formats .ql-header .ql-picker-options span"
        )[1];
    if (el) el.click();
}


export function removeLastBrTag(input: string) {
    // Trim the input to remove any trailing whitespace
    const trimmedInput = input.trim();

    // Define the <br> tag pattern to check at the end
    const brPattern = /<br\s*\/?>$/;

    // If the trimmed input ends with a <br> tag, remove it
    if (brPattern.test(trimmedInput)) {
        return trimmedInput.replace(brPattern, '');
    }

    // Return the original input if no <br> tag is found at the end
    return input;
}
/*
// Example 1
const input1 = "<p>Hello</p><p><br>";
console.log(removeLastBrTag(input1)); // "<p>Hello</p><p>"

// Example 2
const input2 = "<p>Hello</p><p>";
console.log(removeLastBrTag(input2)); // "<p>Hello</p><p>"

// Example 3
const input3 = "<p>Hello<br></p><p><br>";
console.log(removeLastBrTag(input3)); // "<p>Hello<br></p><p>"
*/
