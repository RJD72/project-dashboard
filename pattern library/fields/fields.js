function liveCode(evt, elementId) {
	//grabs element displaying code (liveText) and element to display (element)
	var liveText = document.getElementById("live-text");
	var element = document.getElementById("element");

	//tests if argument exists
	if (elementId) {
		//grabs specified code div and notes div
		var code = document.getElementById(`${elementId}-code`);
		var notes = document.getElementById(`${elementId}-notes`);
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
	} else {
		element.innerHTML = liveText.value;
	}
}
