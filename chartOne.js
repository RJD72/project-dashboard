async function draw() {
  // Load data
  const data = await d3.csv("./data/customer_satisfaction.csv");

  // Convert 'Flight Distance' values to numbers
  data.forEach((d) => {
    d["Flight Distance"] = +d["Flight Distance"];
  });

  // Set dimensions for the chart and margins
  const dimensions = {
    width: 500,
    height: 500,
    margin: {
      top: 25,
      right: 25,
      bottom: 50,
      left: 70,
    },
  };

  // Calculate inner width and height for the chart
  dimensions.innerWidth =
    dimensions.width - dimensions.margin.right - dimensions.margin.left;
  dimensions.innerHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // Create an SVG container for the chart
  const svg = d3
    .select("#chart1")
    .append("svg")
    .attr("width", "50%")
    .attr("height", "50%")
    .attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  // Create a group within the SVG for the graph and apply margins
  const graph = svg
    .append("g")
    .attr("class", "graph")
    .attr(
      "transform",
      `translate(${dimensions.margin.left}, ${dimensions.margin.top + 5})`
    )
    .attr("width", dimensions.innerWidth)
    .attr("height", dimensions.innerHeight);

  // chart title
  svg
    .append("text")
    .attr("x", dimensions.width / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .attr("class", "chart-title")
    .text("Distance by Each Customer");

  // Create a tooltip div for displaying information on hover
  const tooltip = d3
    .select("#chart1")
    .append("div")
    .attr("class", "chart-tooltip")
    .style("opacity", 0);

  // Define x and y scales based on the data range
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.id)])
    .range([0, dimensions.innerWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d["Flight Distance"])])
    .range([dimensions.innerHeight, 0])
    .nice();

  // Create a line generator function for the chart
  const lineGenerator = d3
    .line()
    .x((d) => xScale(d.id))
    .y((d) => yScale(d["Flight Distance"]));

  // Append x and y axes to the graph
  const xAxis = graph
    .append("g")
    .attr("transform", `translate(0, ${dimensions.innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(25));

  const yAxis = graph.append("g").call(d3.axisLeft(yScale));

  // Create a clip path to constrain the chart elements within the defined area
  const clip = svg
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", dimensions.innerWidth + 5)
    .attr("height", dimensions.innerHeight)
    .attr("x", 0)
    .attr("y", 0);

  // Create separate groups for the line and circle elements
  const lineGraph = graph.append("g").attr("clip-path", "url(#clip)");
  const circle = graph
    .append("g")
    .attr("class", "circleContainer")
    .attr("clip-path", "url(#clip)");

  // Draw the line based on the data using transitions
  lineGraph
    .append("path")
    .datum(data)
    .transition()
    .duration(2000)
    .attr("d", lineGenerator)
    .attr("fill", "none")
    .attr("stroke", "#b9d840")
    .attr("stroke-width", 1.5);

  // Draw circles for each data point with transitions and tooltip events
  circle
    .selectAll("circle")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "circles")
    .append("circle")
    .transition()
    .duration(3000)
    .attr("cx", (d) => xScale(d.id))
    .attr("cy", (d) => yScale(d["Flight Distance"]))
    .attr("r", 1.5)
    .attr("fill", "rgba(0,0,0,0.58")
    .attr("stroke", "none")
    .on("end", function () {
      // Attach event listeners for tooltip display on hover
      d3.select(this)
        .on("mouseover", function (e, d) {
          // Show tooltip on hover
          tooltip.style("display", "inline-block");
          tooltip.transition().duration(200).style("opacity", 0.9);
          tooltip
            .html(
              `Customer id: ${d.id} <br> Distance Flown: ${d["Flight Distance"]}km`
            )
            .style("left", `${e.pageX - 200}px`)
            .style("top", `${e.pageY - 200}px`);
        })
        .on("mouseout", function () {
          // Hide tooltip on mouseout
          tooltip.style("display", "none");
          tooltip.transition().duration(200).style("opacity", 0);
        });
    });

  // Enable zoom functionality for the chart
  const zoom = d3
    .zoom()
    .extent([
      [0, 0],
      [dimensions.innerWidth, dimensions.innerHeight],
    ])
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

  svg.call(zoom);

  // Function to handle zoom interactions
  function zoomed(e) {
    const newXScale = e.transform.rescaleX(xScale);
    const newYScale = e.transform.rescaleY(yScale);

    xAxis.call(d3.axisBottom(newXScale));
    yAxis.call(d3.axisLeft(newYScale));

    // Update lineGenerator with new scales after zoom
    const updatedLineGenerator = d3
      .line()
      .x((d) => newXScale(d.id))
      .y((d) => newYScale(d["Flight Distance"]));

    lineGraph.select("path").attr("d", updatedLineGenerator);

    circle
      .selectAll("circle")
      .attr("cx", (d) => newXScale(d.id))
      .attr("cy", (d) => newYScale(d["Flight Distance"]));
  }

  // Add x-axis label
  graph
    .append("text")
    .attr("class", "xAxis-text")
    .attr(
      "transform",
      `translate( ${dimensions.innerWidth / 2}, ${dimensions.innerHeight + 40})`
    )
    .style("text-anchor", "middle")
    .style("fill", "rgba(0,0,0,0.58)")
    .text("Customer ID");

  // Add y-axis label
  graph
    .append("text")
    .attr("class", "yAxis-text")
    .attr("transform", "rotate(-90)")
    .attr("y", -dimensions.margin.left)
    .attr("x", -dimensions.innerHeight / 2)
    .attr("dy", "1.5em")
    .style("text-anchor", "middle")
    .style("fill", "rgba(0,0,0,0.58)")
    .text("Distance km");
}

// Call the draw function
draw();
