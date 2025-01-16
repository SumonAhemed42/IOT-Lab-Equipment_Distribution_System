export function renameFileName(fileName: string, renameCount: number) {
    // Extract file name and extension
    const parts = fileName.split('.');
    const extension = parts.pop();
    let name = parts.join('.');

    // Check if the file name already contains parentheses with a count
    const regex = /\(\d+\)$/;
    const match = name.match(regex);

    // If the file name already contains parentheses with a count, update the count
    if (match) {
        const count = parseInt(match[0].slice(1, -1)); // Extract existing count
        name = name.replace(regex, `(${count + renameCount})`);
    } else {
        // Otherwise, append the count within parentheses
        name += `(${renameCount})`;
    }

    // Append the file extension and return the updated file name
    return `${name}.${extension}`;
}
// - - - - - - - - - - - - - - -
export function formatFileSize(fileSize: number) {
    if (fileSize < 1024) {
        return fileSize.toFixed(2) + " B";
    } else if (fileSize < 1024 * 1024) {
        return (fileSize / 1024).toFixed(2) + " KB";
    } else if (fileSize < 1024 * 1024 * 1024) {
        return (fileSize / (1024 * 1024)).toFixed(2) + " MB";
    } else {
        return (fileSize / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    }
}
// - - - - - - - - - - - - - - -