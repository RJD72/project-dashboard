//adjusts queries label to inactive or active based on size of it's container
//only executes function when DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
	//grabs initial width of container
	let width = document.getElementById("element").offsetWidth;

	function queryUpdate() {
		//grabs current width
		let elementWidth = document.getElementById("element").offsetWidth;
		let previousWidth = width;

		var queryBox = [];

		//loops through query classes and adds a display of either flex or none
		let queryHelper = (sm, md, lg, xl, xxl, display) => {
			let elementArray = [sm, md, lg, xl, xxl];

			for (let i = 0; i < elementArray.length; i++) {
				queryBox = document.getElementsByClassName(elementArray[i]);
				for (let j = 0; j < queryBox.length; j++) {
					queryBox[j].style.display = display;
				}
			}
		};

		//using queryHelper function, adjusts the active or inactive tabs based on it's container size
		if (previousWidth !== elementWidth) {
			if (elementWidth <= 375) {
				queryHelper("sm-active", "md-active", "lg-active", "xl-active", "xxl-active", "none");
				queryHelper("sm-inactive", "md-inactive", "lg-inactive", "xl-inactive", "xxl-inactive", "flex");
			} else if (elementWidth > 376 && elementWidth < 576) {
				queryHelper("sm-inactive", "md-active", "lg-active", "xl-active", "xxl-active", "none");
				queryHelper("sm-active", "md-inactive", "lg-inactive", "xl-inactive", "xxl-inactive", "flex");
			} else if (elementWidth > 577 && elementWidth < 768) {
				queryHelper("sm-inactive", "md-inactive", "lg-active", "xl-active", "xxl-active", "none");
				queryHelper("sm-active", "md-active", "lg-inactive", "xl-inactive", "xxl-inactive", "flex");
			} else if (elementWidth > 769 && elementWidth < 992) {
				queryHelper("sm-inactive", "md-inactive", "lg-inactive", "xl-active", "xxl-active", "none");
				queryHelper("sm-active", "md-active", "lg-active", "xl-inactive", "xxl-inactive", "flex");
			} else if (elementWidth > 993 && elementWidth < 1200) {
				queryHelper("sm-inactive", "md-inactive", "lg-inactive", "xl-inactive", "xxl-active", "none");
				queryHelper("sm-active", "md-active", "lg-active", "xl-active", "xxl-inactive", "flex");
			} else if (elementWidth >= 1201) {
				queryHelper("sm-inactive", "md-inactive", "lg-inactive", "xl-inactive", "xxl-inactive", "none");
				queryHelper("sm-active", "md-active", "lg-active", "xl-active", "xxl-active", "flex");
			}

			//resets width to current width size
			width = elementWidth;
		} else if (previousWidth > 1201 && elementWidth > 1201) {
			queryHelper("sm-inactive", "md-inactive", "lg-inactive", "xl-inactive", "xxl-inactive", "none");
			queryHelper("sm-active", "md-active", "lg-active", "xl-active", "xxl-active", "flex");
		}
	}

	//test and execute update function every 500ms
	setInterval(queryUpdate, 500);
});

function liveCode(evt, layoutId) {
	//grabs element displaying code (liveText) and element to display (element)
	var liveText = document.getElementById("live-text");
	var element = document.getElementById("element");

	//tests if argument exists
	if (layoutId) {
		//grabs specified code div and notes div
		var code = document.getElementById(`${layoutId}-code`);
		var notes = document.getElementById(`${layoutId}-notes`);
		var notesElement = document.getElementById("layout-notes");

		//updates innerHTML and value of elements
		notesElement.innerHTML = notes.innerHTML;

		liveText.value = code.innerHTML;

		element.innerHTML = liveText.value;

		//removes '.active' class from all tabs
		var tablinks = document.getElementsByClassName("layout-tab-link");
		for (let i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		//adds '.actice' class to current target tab
		evt.currentTarget.className += " active";

		//if 'Queries' tab is open, make the layout adjustable
		if (layoutId === "queries") {
			element.style.resize = "horizontal";
		} else {
			element.style.resize = "none";
			element.style.width = "1292px";
		}
	} else {
		element.innerHTML = liveText.value;
	}
}

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
