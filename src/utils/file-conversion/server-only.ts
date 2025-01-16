import { access, mkdir } from "fs/promises";

// Create the new directory if not exist
export async function createDirectory(directoryName: string) {
    const uploadDirectoryExists = await access(directoryName)
        .then(() => true)
        .catch(() => false);
    if (!uploadDirectoryExists) await mkdir(directoryName, { recursive: true })
}