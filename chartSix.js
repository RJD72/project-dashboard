(function () {
	// used to keep variables within this scope
	/*
Chart6: The first 10 Loyal Customers’ 4 Ticket Prices
Instructions:
    Stacked bar chart
    Use id for x-axis
    Manually set the domain for the y-axis(means do not need to get min, max, or extent for to get the minimum and maximum value)
    Onload Transition
    Interactive Legend
*/

	// assign sizes
	var svgwidth = 500;
	var svgheight = 500;
	var xpadding = 150;
	var ypadding = 85;

	// define svg
	var svg = d3
		.select("#chart6")
		.append("svg")
		.attr("width", "50%")
		.attr("height", "50%")
		.attr("viewBox", "0 0 " + svgwidth + " " + svgheight)
		.attr("preserveAspectRatio", "xMidYMid meet");

	// define inner width and height
	var inner_width = svgwidth - xpadding;
	var inner_height = svgheight - ypadding;

	// assign graph
	var g = svg
		.append("g")
		.attr("transform", "translate(65, 50)")
		.attr("height", inner_height)
		.attr("width", inner_width)
		.attr("class", "graph");

	// chart title
	svg.append("text")
		.attr("x", svgwidth / 2)
		.attr("y", 20)
		.attr("text-anchor", "middle")
		.attr("class", "chart-title")
		.text("First 10 Loyal Customers’ Ticket Prices");

	// x-axis title
	svg.append("text")
		.attr("x", svgwidth / 2.25)
		.attr("y", svgheight)
		.attr("text-anchor", "middle")
		.attr("font-size", "1rem")
		.style("fill", "rgba(0,0,0,0.58)")
		.text("Customer Id");

	// y-axis title
	svg.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -svgheight / 2.25)
		.attr("y", 20)
		.attr("text-anchor", "middle")
		.attr("font-size", "1rem")
		.style("fill", "rgba(0,0,0,0.58)")
		.text("Ticket Price ($)");

	// Add legend
	var legend = svg.append("g").attr("transform", "translate(" + (inner_width + 20) + "," + 50 + ")");

	var keys = ["1st", "2nd", "3rd", "4th"];
	var colors = ["#fab0ba", "#acfcd7", "#bde0fe", "#fddaa5"];

	var color = d3.scaleOrdinal().domain(keys).range(colors);

	// Create a filter for the shadow
	svg.append("defs")
		.append("filter")
		.attr("id", "drop-shadow")
		.attr("height", "130%")
		.append("feDropShadow")
		.attr("dx", 0)
		.attr("dy", 4)
		.attr("stdDeviation", 4)
		.attr("flood-color", "#555555")
		.attr("flood-opacity", 0.7);

	// legend squares
	var squareSize = 20;
	g.selectAll("rect")
		.data(keys)
		.join("rect")
		.attr("class", "legendRect")
		.attr("x", 380)
		.attr("y", (d, i) => 100 + i * (squareSize + 10))
		.attr("width", squareSize)
		.attr("height", squareSize)
		.style("fill", function (d) {
			return color(d);
		})
		.on("click", function (event, d) {
			var clickedColorClass = color(d).replace("#", "");

			// Set filter back to none for all bar groups
			d3.selectAll(".barGroup").transition().duration(2000).style("filter", "none");

			// Set filter for only the clicked group
			d3.selectAll("." + clickedColorClass)
				.transition()
				.duration(2000)
				.style("filter", "url(#drop-shadow)");
		});

	// legend text
	g.selectAll("text")
		.data(keys)
		.join("text")
		.attr("x", 405)
		.attr("y", (d, i) => 100 + (i * (squareSize + 10) + squareSize / 2))
		.text(function (d) {
			return d;
		})
		.style("alignment-baseline", "middle")
		.attr("font-size", "12px");

	// get data
	d3.csv("./data/customer_satisfaction.csv").then(function (data) {
		// gather all loyal customers
		var loyalCustomers = data.filter((x) => x["Customer Type"] === "Loyal Customer");

		// Get first 10 loyal customers
		var customers = loyalCustomers.slice(0, 10);

		// xscsale, using customers' ids
		var group = customers.map((d) => d.id);

		var xscale = d3.scaleBand().domain(group).range([0, inner_width]).padding([0.2]);

		var xaxis = d3.axisBottom().scale(xscale);

		g.append("g")
			.attr("class", "x-axis")
			.attr("transform", "translate(0," + inner_height + ")")
			.call(xaxis);

		// yscale, manually set as per instructions
		var yscale = d3.scaleLinear().domain([0, 4500]).range([inner_height, 0]);

		var yaxis = d3.axisLeft().scale(yscale);
		g.append("g").attr("class", "y-axis").call(yaxis);

		// stacking and displaying data
		var subgroups = ["1st Ticket Price", "2nd Ticket Price", "3rd Ticket Price", "4th Ticket Price"];

		var stackedData = d3.stack().keys(subgroups)(customers);

		var color = d3.scaleOrdinal().domain(subgroups).range(["#fab0ba", "#acfcd7", "#bde0fe", "#fddaa5"]);

		g.append("g")
			.selectAll("g")
			.data(stackedData)
			.join("g")
			.attr("class", function (d) {
				return color(d.key).replace("#", "") + " barGroup";
			})
			.attr("fill", function (d) {
				return color(d.key);
			})
			.selectAll("rect")
			.data(function (d) {
				return d;
			})
			.join("rect")
			.attr("x", function (d) {
				return xscale(d.data.id);
			})
			.attr("y", function (d) {
				return yscale(d[1]);
			})
			.attr("width", xscale.bandwidth())
			// adding onload transition
			.transition()
			.duration(1000)
			.attr("y", function (d) {
				return yscale(d[1]);
			})
			.attr("height", function (d) {
				return yscale(d[0]) - yscale(d[1]);
			});
	});
})();
