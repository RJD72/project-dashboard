// Initialize your variables and event listeners
document.addEventListener("DOMContentLoaded", function () {
    var loadEffectiveTypographyButton = document.getElementById("loadEffectiveTypography");
    var loadTypographyEssentialsButton = document.getElementById("loadTypographyEssentials");
    var closeButton = document.getElementById("closeButton");
    var contentContainer = document.getElementById("contentContainer");


// Event listener for the "Effective Typography" button
loadEffectiveTypographyButton.addEventListener("click", function () {
    loadContent("Effective Typography.html");
});

// Event listener for the "Typography Essentials" button
loadTypographyEssentialsButton.addEventListener("click", function () {
    loadContent("Typography Essentials.html");
});


    // Event listener for the close button
    closeButton.addEventListener("click", function () {
        contentContainer.innerHTML = ""; // Clear the content
        contentContainer.style.display = "none"; // Hide the container
        closeButton.style.display = "none"; // Hide the close button
    });
});
function loadContent(contentUrl) {
    const loadedContentContainer = document.getElementById("loadedContentContainer");
    fetch(contentUrl)
        .then(response => response.text())
        .then(content => {
            // Hide the current loaded content container while loading
            loadedContentContainer.style.display = "none";

            // Set the loaded content and display the loaded container
            loadedContentContainer.innerHTML = content;
            loadedContentContainer.style.display = "block";
            closeButton.style.display = "block"; // Show the close button
        })
        .catch(error => {
            console.error("Error loading content:", error);
        });
}


