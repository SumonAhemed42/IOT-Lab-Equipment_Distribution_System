export function fetchImage(url: string) {
    const maxAttempts = 10
    let attempts = 0;

    return new Promise<void>((resolve, reject) => {
        function tryFetchImage() {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        console.log(url + " - Found");
                        resolve(); // Resolve the promise if the image is found
                    } else {
                        retry();
                    }
                })
                .catch(() => {
                    retry();
                });
        }

        function retry() {
            attempts++;
            if (attempts < maxAttempts) {
                setTimeout(tryFetchImage, 1000); // Retry after 1 second
            } else {
                console.log(url + " - Not found");
                reject(); // Reject the promise if the image is not found after maxAttempts
            }
        }

        tryFetchImage();
    });
}

/*
--Usages--

function secondFunction() {
    console.log("secondFunction");
}

// Example usage:
fetchImage("http://localhost:3002/image/bdu-logo.png")
    .then(secondFunction)
    .catch(() => {
        console.log("Image not found after maximum attempts.");
    });
*/