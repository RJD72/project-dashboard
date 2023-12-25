(function () {
	//Relationship of Total Delay minutes and Departure/arrival time satisfactory

	const height = 500;
	const width = 500;
	const margin = { top: 30, right: 20, bottom: 90, left: 50 };

	//create svg container
	const svg = d3
		.select("#chart4")
		.append("svg")
		.attr("width", "50%")
		.attr("height", "50%")
		.attr("viewBox", "0 0 " + width + " " + height)
		.attr("preserveAspectRatio", "xMidYMid meet");

	//create group for chart data
	const plot = svg
		.append("g")
		.attr("id", "chart4_scatter")
		.attr("transform", "translate(0 , " + margin.top + ")")
		.attr("width", width - margin.left - margin.right)
		.attr("height", height - margin.top - margin.bottom);

	//Chart Title
	svg.append("text")
		.attr("x", width / 2)
		.attr("y", 20)
		.attr("text-anchor", "middle")
		.attr("class", "chart-title")
		.text("Total Delay Minutes by Time Satisfaction");

	//Data import
	d3.csv("./data/customer_satisfaction.csv").then(function (data) {
		//Group the required data for easier, then sort it for transition
		const groupedData = Array.from(
			d3
				.group(
					data,
					(d) =>
						`${parseInt(d["Departure/Arrival time convenient"])}-${parseInt(
							d["Total Departure and Arrival Delay in Minutes"]
						)}`
				)
				.entries(),
			([key, values]) => ({
				group: key.split("-").map(Number),
				count: values.length,
			})
		);

		groupedData.sort((a, b) => a.group[1] - b.group[1]);

		// Define scales for x, y, and bubble size
		const yScale = d3
			.scaleLinear()
			.domain([0, d3.max(groupedData, (d) => d.group[0])])
			.range([height - margin.bottom, margin.top]);

		const xScale = d3
			.scaleSqrt()
			.domain([-1, d3.max(groupedData, (d) => d.group[1])])
			.range([margin.left, width - margin.right]);

		const sizeScale = d3
			.scaleLinear()
			.domain([0, d3.max(groupedData, (d) => d.count)])
			.range([5, 20]);

		// Create a group for the brush
		const brushGroup = svg.append("g").attr("class", "brush");

		// Add bubbles to represent data points
		const circle = plot
			.selectAll("circle")
			.data(groupedData)
			.enter()
			.append("circle")
			.attr("cx", (d) => xScale(d.group[1]))
			.attr("cy", 0)
			.attr("r", (d) => sizeScale(d.count))
			.attr("fill", "#fab0ba")
			.attr("stroke", "rgba(0, 0, 0, 0.58)")
			.transition()
			.duration(800)
			.attr("cy", (d) => yScale(d.group[0]))
			.delay((d, i) => i * 20);

		// Add brushing functionality
		brushGroup.call(
			d3
				.brush()
				.extent([
					[margin.left / 2, margin.top / 2],
					[width, height - margin.top],
				])
				.on("start brush", brushed)
		);

		function brushed(event) {
			if (event.selection) {
				const [[x0, y0], [x1, y1]] = event.selection;

				// Classify circles as brushed or not brushed
				plot.selectAll("circle").attr("class", function (d) {
					const cx = xScale(d.group[1]);
					const cy = yScale(d.group[0]) + margin.top;
					const brushed = x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
					return brushed ? "brushed" : null;
				});
			} else {
				// If there is no selection, reset the class
				circle.attr("class", null);
			}
		}

		// Add x-axis
		const xAxis = plot
			.append("g")
			.attr("transform", `translate(0, ${height - margin.bottom})`)
			.call(d3.axisBottom(xScale))
			.selectAll("text")
			.style("text-anchor", "end")
			.style("transform", "rotate(-40deg)")
			.style("font-size", "0.6rem");

		// Add y-axis
		const yAxis = plot
			.append("g")
			.attr("transform", `translate(${margin.left}, 0)`)
			.call(d3.axisLeft(yScale).ticks(6))
			.selectAll("text")
			.style("font-size", "1rem");

		// Add axis labels
		//x axis
		plot.append("text")
			.style("z-index", "-9")
			.attr("transform", `translate(${width / 2}, ${height - margin.bottom / 2})`)
			.style("text-anchor", "middle")
			.style("font-size", "1.2rem")
			.style("fill", "rgba(0,0,0,0.58)")
			.text("Total Delay Minutes");

		//y axis
		plot.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", margin.left / 2.7)
			.attr("x", 0 - height / 2.4)
			.style("text-anchor", "middle")
			.style("font-size", "1.2rem")
			.style("fill", "rgba(0,0,0,0.58)")
			.text("Departure/Arrival Time Satisfaction");
	});
})();
