function updatePieChart() {
	d3.csv("./data/customer_satisfaction.csv").then(function (data) {
		const typeCounts = d3.rollup(
			data,
			(v) => v.length,
			(d) => d["Type of Travel"]
		);

		const pieData = Array.from(typeCounts, ([type, count]) => ({ type, count }));

		const containerWidth = document.getElementById("chart2").clientWidth;
		const maxWidth = 450;
		const width = containerWidth > maxWidth ? maxWidth : containerWidth;
		const height = width * 1.2;
		const radius = (Math.min(width, height) / 2.1) * 0.9;

		d3.select("#chart2-svg").remove();

		const svg = d3
			.select("#chart2")
			.append("svg")
			.attr("id", "chart2-svg")
			.attr("width", "50%")
			.attr("height", "50%")
			.attr("viewBox", "0 0 " + width + " " + height)
			.append("g")
			.attr("transform", `translate(${width / 2},${height / 1.8})`);

		const title = svg
			.append("text")
			.attr("x", 0)
			.attr("y", -height / 2 + 30)
			.attr("text-anchor", "middle")
			.style("font-weight", "medium")
			.text("Proportion of Type of Travel");

		const titleFontSize = Math.min(16, width / 30);
		title.style("font-size", `${titleFontSize}px`);

		const pie = d3.pie().value((d) => d.count);

		const arc = d3.arc().innerRadius(0).outerRadius(radius);

		const colors = ["#B9D840", "#FAB0BA"];

		const arcs = svg.selectAll("arc").data(pie(pieData)).enter().append("g").attr("class", "arc");

		arcs.append("path")
			.attr("d", arc)
			.attr("fill", (d, i) => colors[i % colors.length])
			.transition()
			.duration(1000)
			.attrTween("d", function (d) {
				const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
				return function (t) {
					return arc(interpolate(t));
				};
			});

		arcs.append("text")
			.attr("transform", (d) => `translate(${arc.centroid(d)})`)
			.attr("text-anchor", "middle")
			.text((d) => d.data.type)
			.style("opacity", 0)
			.transition()
			.duration(1000)
			.style("opacity", 1);

		arcs.append("text")
			.attr("transform", (d) => {
				const centroid = arc.centroid(d);
				const x = centroid[0];
				const y = centroid[1];
				return `translate(${x},${y})`;
			})
			.attr("dy", "1.5em")
			.attr("text-anchor", "middle")
			.text((d) => {
				const percentage = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
				return percentage.toFixed(2) + "%";
			})
			.style("font-size", "12px")
			.style("fill", "black");
	});
}

function handleResize() {
	updatePieChart();
}

window.addEventListener("resize", handleResize);

updatePieChart();
