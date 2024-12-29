//your code here
// Function to initialize the state and render images
function initializeApp() {
    const container = document.getElementById("container");
    const header = document.createElement("h3");
    header.id = "h";
    header.textContent = "Please click on the identical tiles to verify that you are not a robot.";
    container.innerHTML = "";
    container.appendChild(header);

    const images = generateImages();
    renderImages(container, images);
}

// Function to generate random images
function generateImages() {
    const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
    const randomIndex = Math.floor(Math.random() * 5);
    const duplicateImage = imageClasses[randomIndex];

    const images = [...imageClasses, duplicateImage];
    return images.sort(() => Math.random() - 0.5);
}

// Function to render images in the DOM
function renderImages(container, images) {
    const imageContainer = document.createElement("div");
    imageContainer.id = "image-container";

    images.forEach((imgClass, index) => {
        const img = document.createElement("div");
        img.className = imgClass;
        img.dataset.index = index;
        img.addEventListener("click", handleImageClick);
        imageContainer.appendChild(img);
    });

    container.appendChild(imageContainer);
}

// State management
let clickedImages = [];
let verifyButton, resetButton, message;

function handleImageClick(event) {
    const clickedImage = event.currentTarget;

    if (clickedImages.includes(clickedImage)) return; // Ignore double-clicks

    clickedImages.push(clickedImage);

    if (clickedImages.length === 1) {
        renderResetButton();
    }

    if (clickedImages.length === 2) {
        renderVerifyButton();
    }
}

function renderResetButton() {
    if (!resetButton) {
        resetButton = document.createElement("button");
        resetButton.id = "reset";
        resetButton.textContent = "Reset";
        resetButton.addEventListener("click", resetApp);
        document.getElementById("container").appendChild(resetButton);
    }
}

function renderVerifyButton() {
    if (!verifyButton) {
        verifyButton = document.createElement("button");
        verifyButton.id = "verify";
        verifyButton.textContent = "Verify";
        verifyButton.addEventListener("click", verifyUser);
        document.getElementById("container").appendChild(verifyButton);
    }
}

function resetApp() {
    clickedImages = [];
    if (verifyButton) verifyButton.remove();
    if (resetButton) resetButton.remove();
    if (message) message.remove();
    verifyButton = null;
    resetButton = null;
    message = null;
    initializeApp();
}

function verifyUser() {
    if (message) message.remove();

    const [firstImage, secondImage] = clickedImages;
    const areIdentical = firstImage.className === secondImage.className;

    message = document.createElement("p");
    message.id = "para";
    message.textContent = areIdentical
        ? "You are a human. Congratulations!"
        : "We can't verify you as a human. You selected the non-identical tiles.";

    document.getElementById("container").appendChild(message);
    verifyButton.remove();
    verifyButton = null;
}

// Initializing the app
initializeApp();

