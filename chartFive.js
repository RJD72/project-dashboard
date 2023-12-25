async function draw() {
	// Load data from a CSV file asynchronously
	const data = await d3.csv("./data/customer_satisfaction.csv");

	// Filter data based on type of travel: business and personal
	const businessData = data.filter((d) => d["Type of Travel"] === "Business travel");
	const personalData = data.filter((d) => d["Type of Travel"] === "Personal Travel");

	// Calculate average satisfaction for business and personal travel
	const averageBusinessSatisfaction = d3.mean(
		businessData,
		(d) => +d["Average Satisfaction"] // Convert satisfaction values to numbers
	);
	const averagePersonalSatisfaction = d3.mean(personalData, (d) => +d["Average Satisfaction"]);

	// Create a new dataset containing average satisfaction for each travel type
	const newData = [
		{
			"Type of Travel": "Business travel",
			"Average Satisfaction": averageBusinessSatisfaction,
		},
		{
			"Type of Travel": "Personal Travel",
			"Average Satisfaction": averagePersonalSatisfaction,
		},
	];

	// Set dimensions for the SVG container and margins
	const dimensions = {
		width: 300,
		height: 300,
		margin: {
			top: 25,
			right: 25,
			bottom: 40,
			left: 50,
		},
	};

	// Calculate inner dimensions considering margins
	dimensions.innerWidth = dimensions.width - dimensions.margin.right - dimensions.margin.left;
	dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

	// Create an SVG element within ".chart2" div with defined dimensions
	const svg = d3
		.select("#chart5")
		.append("svg")
		.attr("width", "50%")
		.attr("height", "50%")
		.attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
		.attr("preserveAspectRatio", "xMidYMid meet");

	//Chart title
	svg.append("text")
		.attr("x", dimensions.width / 2)
		.attr("y", 10)
		.attr("text-anchor", "middle")
		.attr("font-size", "0.85rem")
		.text("Average Satisfaction rate by Type of travel");

	// Create a group element for the chart within SVG and apply margins
	const graph = svg
		.append("g")
		.attr("transform", `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)
		.attr("width", dimensions.innerWidth)
		.attr("height", dimensions.innerHeight);

	// Create x and y scales for the chart
	const xScale = d3
		.scaleBand()
		.domain(newData.map((d) => d["Type of Travel"]))
		.range([0, dimensions.innerWidth])
		.padding(0.2);

	const yScale = d3.scaleLinear().domain([0, 5]).range([dimensions.innerHeight, 0]);

	// Create a color scale for differentiating between travel types
	const colorScale = d3
		.scaleOrdinal()
		.domain(newData.map((d) => d["Type of Travel"]))
		.range(["#b9d840", "#fab0ba"]);

	// Draw bars for each travel type
	graph
		.selectAll("rect")
		.data(newData)
		.join("rect")
		.attr("class", "bar")
		.transition()
		.duration(3000)
		.attr("x", (d) => xScale(d["Type of Travel"]))
		.attr("y", (d) => yScale(+d["Average Satisfaction"]))
		.attr("width", xScale.bandwidth())
		.attr("height", (d) => dimensions.innerHeight - yScale(d["Average Satisfaction"]))
		.attr("fill", (d) => colorScale(d["Type of Travel"]));

	// Add labels on top of each bar with satisfaction values
	graph
		.selectAll(".bar-label")
		.data(newData)
		.join("text")
		.transition()
		.duration(3000)
		.attr("class", "bar-label")
		.attr("x", (d) => xScale(d["Type of Travel"]) + xScale.bandwidth() / 2)
		.attr("y", (d) => yScale(d["Average Satisfaction"]) - 5)
		.attr("text-anchor", "middle")
		.style("font-size", "10px")
		.text((d) => d["Average Satisfaction"].toFixed(2));

	// Create x and y axis and append them to the chart
	const xAxis = graph
		.append("g")
		.attr("class", "xAxis")
		.attr("transform", `translate(0, ${dimensions.innerHeight})`)
		.call(d3.axisBottom(xScale).tickSize(5))
		.selectAll("text")
		.attr("font-size", "0.5rem");

	const yAxis = graph
		.append("g")
		.attr("class", "yAxis")
		.call(d3.axisLeft(yScale).tickSize(3))
		.selectAll("text")
		.attr("font-size", "0.5rem");

	// Add labels for x and y axes
	graph
		.append("text")
		.attr("class", "xAxis-text")
		.attr("transform", `translate( ${dimensions.innerWidth / 2}, ${dimensions.innerHeight + 35})`)
		.style("fill", "rgba(0,0,0,0.58)")
		.style("text-anchor", "middle")
		.style("font-size", "10px")
		.text("Travel Type");

	graph
		.append("text")
		.attr("class", "yAxis-text")
		.attr("transform", "rotate(-90)")
		.attr("y", -dimensions.margin.left + 8)
		.attr("x", -dimensions.innerHeight / 2)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-size", "10px")
		.style("fill", "rgba(0,0,0,0.58)")
		.text("Satisfaction Rating");
}

// Call the draw function to initiate the visualization
draw();
