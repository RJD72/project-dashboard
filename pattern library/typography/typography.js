// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
	// Get the div element with the class "larger-scrolling-text-box"
	var scrollBox = document.querySelector(".larger-scrolling-text-box");

	// Create a new textarea element
	var textarea = document.createElement("textarea");

	// Set the content of the textarea to match the existing content
	textarea.value = scrollBox.querySelector("code").textContent;

	// Apply the CSS styles to the textarea
	textarea.className = "larger-scrolling-text-box"; // Apply the container's class
	textarea.style.width = "30%"; // Adjusted width to 80% of the parent container
	textarea.style.height = "400px"; // Adjusted height to 400 pixels

	textarea.style.overflow = "auto";

	// Position the textarea to the right side of the .larger-scrolling-text-box
	textarea.style.position = "absolute"; // Absolute positioning within the .larger-scrolling-text-box
	textarea.style.top = "900px"; // Adjusted top value to move it down
	textarea.style.right = "50px"; // Move the scroll box 50 pixels to the left

	textarea.style.padding = "10px";
	textarea.style.border = "1px solid #ccc";
	textarea.style.borderRadius = "5px";
	textarea.style.backgroundColor = "var(--colourTextBlack)";
	textarea.style.fontFamily = "Courier New, Courier, monospace";

	// Apply text color
	textarea.style.color = "var(--colourRedPastel)"; // Set the text color

	// Apply scrollbar styles
	textarea.style.scrollbarWidth = "thin"; // For Firefox
	textarea.style.scrollbarColor = "var(--colourGreenStarWing) transparent"; // Set the scrollbar color

	// Replace the code element with the textarea
	scrollBox.parentNode.replaceChild(textarea, scrollBox);
	function loadTypographyContent() {
		// Your code for loading content here
	}
});
