export function downloadCSV(data: any[], fileName: string) {

    // Function to convert JSON to CSV
    function convertToCSV(data: any) {
        const csvRows = [];

        // Get the headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Loop over the rows
        for (const row of data) {
            const values = headers.map(header => {
                const val = row[header];
                return `"${val}"`; // Enclose in double quotes to handle commas and special characters
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    }

    // Convert data to CSV
    const csvData = convertToCSV(data);

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element
    const link = document.createElement('a');

    // Create a URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Set the download attribute with a filename
    link.download = fileName + '.csv';

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}