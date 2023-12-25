(function () {
	// used to keep variables within this scope
	/*
Chart9: Number of customers who did not experience any departure or arrival delays
(Single Value)
*/

	// Set the svg sizes
	var svgheight = 30;
	var svgwidth = 100;

	// create svg and chart
	var svg = d3
		.select("#chart9")
		.append("svg")
		.attr("width", "50%")
		.attr("height", "50%")
		.attr("viewBox", "0 0 " + svgwidth + " " + svgheight)
		.attr("preserveAspectRatio", "xMidYMid meet");

	var value = svg.append("g").attr("transform", "translate(" + svgwidth / 2 + "," + svgheight / 2 + ")");

	// add customer value
	value.append("text").attr("id", "noDelayCust").style("fill", "#b9d840").style("text-anchor", "middle");

	// add the value label
	value
		.append("text")
		.style("font-size", ".3rem")
		.attr("dy", "2.1em")
		.style("text-anchor", "middle")
		.text("Customers Without Delays");

	d3.csv("./data/customer_satisfaction.csv").then(function (data) {
		// get the total customers without delays
		var total = 0;

		data.forEach((d) => {
			var delayMinutes = parseInt(d["Total Departure and Arrival Delay in Minutes"]);
			if (delayMinutes === 0) {
				total++;
			}
		});

		// append to chart
		value.select("#noDelayCust").text(total);
	});
})();
