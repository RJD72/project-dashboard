(function () {
	// used to keep variables within this scope
	/*
Chart8: Total number of flight distance
(Single Value)
*/

	// Set the svg sizes
	var svgheight = 30;
	var svgwidth = 100;

	// create svg and chart
	var svg = d3
		.select("#chart8")
		.append("svg")
		.attr("width", "50%")
		.attr("height", "50%")
		.attr("viewBox", "0 0 " + svgwidth + " " + svgheight)
		.attr("preserveAspectRatio", "xMidYMid meet");

	var singleVal = svg.append("g").attr("transform", "translate(" + svgwidth / 2 + "," + svgheight / 2 + ")");

	// add flight distance value
	singleVal.append("text").attr("id", "flightDistance").style("fill", "#b9d840").style("text-anchor", "middle");

	// add the unit
	singleVal
		.append("text")
		.attr("id", "flightDistanceUnit")
		.attr("dx", "5em")
		.style("font-size", ".4rem")
		.style("font-weight", "bold")
		.style("fill", "#fab0ba")
		.style("text-anchor", "middle")
		.text("KM");

	// add the value label
	singleVal
		.append("text")
		.style("font-size", ".3rem")
		.attr("dy", "1.7em")
		.style("text-anchor", "middle")
		.text("Total Flight Distance");

	d3.csv("./data/customer_satisfaction.csv").then(function (data) {
		// get the total flight distance
		var total = 0;

		data.forEach((x) => (total += parseInt(x["Flight Distance"])));

		// append to chart
		singleVal.select("#flightDistance").text(total);
	});
})();
