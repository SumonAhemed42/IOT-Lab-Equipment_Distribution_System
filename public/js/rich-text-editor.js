function autoHeightAccordingInnerContent(id) {
    const element = document.getElementById(id);
    if (element) {
        element.style.transition = "height ease 0.25s";
        element.style.overflow = "hidden";
        const innerHeight =
            element.querySelector("&>div")?.clientHeight;
        element.style.height = innerHeight + "px";
    }
}


// Function to reload the image after a delay
async function handleEditorImageLoadError(id) {
    while (!document.getElementById(id)) await new Promise((resolve) => setTimeout(resolve, 150));
    var image = document.getElementById(id);
    if (image) {
        function reloadImage() {
            image.src = image.src; // Reload the image
        }

        // Listen for the load event on the image
        image.addEventListener("load", function () {
            // console.log(`Image loaded successfully!`);

            // Remove image loader from editor
            const element = document.getElementById("idImageLoading")
            if (element) element.remove();
        });

        // If the image fails to load, retry after a delay
        image.addEventListener("error", function () {
            // console.log(`Error loading image. Retrying...`);
            reloadImage();
        });
    }
}

//   % -- divider -- %

let startX;
let startY;
let startWidth;
let startHeight;
let imageId = "";
let isCursorInCorner = false;

function startImageResize(event) {
    if (isCursorInCorner) {
        event.preventDefault();
        startX = event.clientX;
        startY = event.clientY;
        startWidth = parseInt(
            document.defaultView.getComputedStyle(event.target).width,
            10
        );
        startHeight = parseInt(
            document.defaultView.getComputedStyle(event.target).height,
            10
        );
        document.documentElement.addEventListener("mousemove", imageResizing);
    }
    document.documentElement.addEventListener("mouseup", stopImageResize);
}

// -----------

function imageResizing(event) {
    if (imageId === "") return;
    const element = document.getElementById(imageId);
    const width = startWidth + event.clientX - startX;
    const height = startHeight + event.clientY - startY;
    if (element) element.style.width = width + "px";
    if (element) element.style.height = height + "px";
    positionSquaresOnImage(event);
}

// -----------

function stopImageResize() {
    imageId = "";
    document.documentElement.removeEventListener("mousemove", imageResizing);
    document.documentElement.removeEventListener("mouseup", stopImageResize);
}

// -----------

function setCursorOnImage(event) {
    // --
    imageId = event.target.id;
    positionSquaresOnImage(event);
    imageCornerSquareCtrl(true);
    // --

    const div = event.target;
    const rect = div.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x <= 16 && y <= 16) {
        div.style.cursor = "nwse-resize";
        isCursorInCorner = true;
    } else if (x >= rect.width - 16 && y <= 16) {
        div.style.cursor = "nesw-resize";
        isCursorInCorner = true;
    } else if (x <= 16 && y >= rect.height - 16) {
        div.style.cursor = "nesw-resize";
        isCursorInCorner = true;
    } else if (x >= rect.width - 16 && y >= rect.height - 16) {
        div.style.cursor = "nwse-resize";
        isCursorInCorner = true;
    } else {
        div.style.cursor = "default";
        isCursorInCorner = false;
    }
}

// -----------

function positionSquaresOnImage(event) {
    const image = event.target;
    const imageWidth = image.width;
    const leftTop = document.querySelector("#fourSquareOfImage > .leftTop");
    const leftBottom = document.querySelector("#fourSquareOfImage > .leftBottom");
    const rightTop = document.querySelector("#fourSquareOfImage > .rightTop");
    const rightBottom = document.querySelector("#fourSquareOfImage > .rightBottom");

    const imageRect = image.getBoundingClientRect();
    const leftPosition =
        imageRect.left > image.offsetLeft ? imageRect.left : image.offsetLeft;

    if (leftTop) leftTop.style.left = leftPosition - 4 + "px";
    if (leftTop) leftTop.style.top = imageRect.top - 4 + "px";

    if (leftBottom) leftBottom.style.left = leftPosition - 4 + "px";
    if (leftBottom) leftBottom.style.top = imageRect.bottom - 4 + "px";

    if (rightTop) rightTop.style.left = leftPosition - 4 + imageWidth + "px";
    if (rightTop) rightTop.style.top = imageRect.top - 4 + "px";

    if (rightBottom) rightBottom.style.left = leftPosition - 4 + imageWidth + "px";
    if (rightBottom) rightBottom.style.top = imageRect.bottom - 4 + "px";
}

// -----------

var timeoutIdToHandleFourCornersSquareDivOfImage;

function imageCornerSquareCtrl(isShow) {
    clearTimeout(timeoutIdToHandleFourCornersSquareDivOfImage);
    if (isShow) {
        timeoutIdToHandleFourCornersSquareDivOfImage = setTimeout(() => {
            console.log("timeoutIdToHandleFourCornersSquareDivOfImage")
            imageCornerSquareCtrl(false);
        }, 1000);
    }

    const leftTop = document.querySelector("#fourSquareOfImage > .leftTop");
    const leftBottom = document.querySelector("#fourSquareOfImage > .leftBottom");
    const rightTop = document.querySelector("#fourSquareOfImage > .rightTop");
    const rightBottom = document.querySelector("#fourSquareOfImage > .rightBottom");
    if (leftTop) {
        if (isShow) leftTop.style.opacity = "1";
        else leftTop.style.opacity = "0";
    }
    if (leftBottom) {
        if (isShow) leftBottom.style.opacity = "1";
        else leftBottom.style.opacity = "0";
    }
    if (rightTop) {
        if (isShow) rightTop.style.opacity = "1";
        else rightTop.style.opacity = "0";
    }
    if (rightBottom) {
        if (isShow) rightBottom.style.opacity = "1";
        else rightBottom.style.opacity = "0";
    }
}