function toggleMobileMenu() {
	var mobileMenu = document.querySelector(".nav-links-mobile");
	mobileMenu.classList.toggle("show");

	var mobileMenuIcon = document.getElementById("mobile-menu-icon");

	mobileMenuIcon.classList.toggle("hidden");
}

function closeMobileMenu() {
	var mobileMenu = document.querySelector(".nav-links-mobile");
	mobileMenu.classList.remove("show");

	var mobileMenuIcon = document.getElementById("mobile-menu-icon");
	mobileMenuIcon.classList.remove("hidden");
}

//helper function that grabs and updates elements
function liveCode(elementId, areaId) {
	//grabs textarea value
	var code = document.getElementById(areaId);
	//grabs element to display code from textarea
	var element = document.getElementById(elementId);

	element.innerHTML = code.value;
}

window.addEventListener("load", function () {
	liveCode("nav-1", "live-text-nav-1");
	liveCode("nav-2", "live-text-nav-2");
	liveCode("nav-3", "live-text-nav-3");
	liveCode("nav-4", "live-text-nav-4");
	liveCode("nav-5", "live-text-nav-5");
});
