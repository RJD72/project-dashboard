(function () {
	var dropdown = d3.select("#category-select");

	var svgwidth = 500;
	var svgheight = 500;
	var padding = 100;

	var chartContainer = d3.select("#chart3");

	var svg = chartContainer
		.append("svg")
		.attr("width", "50%")
		.attr("height", "50%")
		.attr("viewBox", "0 0 " + svgwidth + " " + svgheight);
	var inner_width = svgwidth - padding;
	var inner_height = svgheight - padding;

	var g = svg.append("g").attr("transform", "translate(50, 30)").attr("class", "graph");

	var title = svg
		.append("text")
		.attr("x", svgwidth / 2)
		.attr("y", 30)
		.attr("text-anchor", "middle")
		.attr("class", "chart-title")
		.text("Bar Chart Title");

	d3.csv("./data/customer_satisfaction.csv").then(function (data) {
		createChart();

		d3.select(window).on("load", createChart);
		dropdown.on("change", createChart);
		// d3.select(window).on("resize", updateChartDimensions);

		function createChart() {
			var userInput = dropdown.property("value");

			title.text(userInput);

			g.selectAll("*").remove();

			var groupedData = d3.group(data, (d) => d[userInput]);

			var nestedData = Array.from(groupedData, ([level, count]) => ({ level, count: count.length }));

			var xScale = d3
				.scaleBand()
				.domain(
					data
						.map(function (d) {
							return d[userInput];
						})
						.sort(function (a, b) {
							return a - b;
						})
				)
				.range([0, inner_width])
				.padding(0.1);

			var yScale = d3.scaleLinear().domain([0, 100]).range([inner_height, 0]);

			var xAxis = g
				.append("g")
				.attr("transform", "translate(0," + inner_height + ")")
				.call(d3.axisBottom(xScale));

			g.append("g").call(d3.axisLeft(yScale));

			g.append("text")
				.attr("x", inner_width / 2)
				.attr("y", inner_height + 40)
				.attr("text-anchor", "middle")
				.style("font-size", "14px")
				.text("Satisfactory Levels")
				.each(function () {
					var bbox = this.getBBox();
				});

			g.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", -50)
				.attr("x", 0 - inner_height / 2)
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Percentage of Customers (%)");

			g.selectAll("rect")
				.data(nestedData)
				.enter()
				.append("rect")
				.attr("x", function (d) {
					return xScale(d.level);
				})
				.attr("width", xScale.bandwidth())
				.attr("y", inner_height)
				.attr("height", 0)
				.attr("fill", "#B9D840")
				.transition()
				.duration(1000)
				.attr("y", function (d) {
					return yScale((d.count / 99) * 100);
				})
				.attr("height", function (d) {
					return inner_height - yScale((d.count / 99) * 100);
				});
		}

		function updateChartDimensions() {
			svgwidth = chartContainer.node().getBoundingClientRect().width;
			svgheight = Math.min(500, window.innerHeight - 100);

			svg.attr("width", svgwidth).attr("height", svgheight);

			inner_width = svgwidth - padding;
			inner_height = svgheight - padding;

			xScale.range([0, inner_width]);
			yScale.range([inner_height, 0]);

			xAxis.attr("transform", "translate(0," + inner_height + ")");

			createChart();
		}
	});
})();
