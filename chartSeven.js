(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const root = d3.select('#chart7');

        // Color variables
        const colorOrangePastel = "#fddaa5";
        const colorYellowPastel = "#fdfcb8";
        const colorBluePastel = "#bde0fe";
        const colorPurplePastel = "#e5c9f8";
        const colorGreenPastel = "#acfcd7"; 
        
         // Define hover and selected colors
        const colorHover = "#acfcd7"; 
        const colorSelected = "#acfcd7"; 
        let selectedTab = 'totalLoyal'; 

        // Div Donut chart
        const mainNumber = root.append('div')
            .attr('class', 'number')
            .attr('id', 'mainNumber');

        var svgWidth = 200,
            svgHeight = 250,
            margin = { top: 30, bottom: 10, left: 10, right: 10 }; 

        // Append the SVG for the donut chart within the mainNumber div
        var svg = mainNumber.append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .attr('id', 'donutChart')
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        // Chart title 
        svg.append("text")
            .attr("x", svgWidth / 2)
            .attr("y", "-8") 
            .attr("text-anchor", "middle")
            .attr("class", "chart-title")
            .style("fill", "black") 
            .text("Loyal Customers");

        const tabContainer = root.append('div')
            .attr('class', 'tab-container');

        // Buttons for each tab 
        const tabColors = [colorBluePastel, colorBluePastel, colorBluePastel, colorBluePastel];
        const tabs = ['totalLoyal', 'demographics', 'experience', 'loyalty'];
        const tabNames = ['Total Loyal Customers', 'Demographics & Preferences', 'Flight & Service Experience', 'Loyalty & Satisfaction'];

       // Modify the tab button creation to include event listeners
       tabs.forEach((tab, index) => {
        const button = tabContainer.append('button')
            .attr('class', 'tab-button')
            .attr('onclick', `showTab('${tab}')`)
            .style('background-color', tabColors[index]) 
            .text(tabNames[index]);

        // Mouseover event
        button.on('mouseover', function() {
            d3.select(this).style('background-color', colorHover);
        });

        // Mouseout event
        button.on('mouseout', function() {
            d3.select(this).style('background-color', selectedTab === tab ? colorSelected : tabColors[index]);
        });

        // Click event
        button.on('click', function() {
            if (selectedTab) {
                d3.select(`button[onclick="showTab('${selectedTab}')"]`)
                    .style('background-color', tabColors[tabs.indexOf(selectedTab)]);
            }
            selectedTab = tab;
            d3.select(this).style('background-color', colorSelected);
        });
    });
        // Content for each tab
        const tabContents = [
            { id: 'demographics', content: '<p><strong>Gender Breakdown:</strong> Female customers.</p>' },
            { id: 'experience', content: '<p><strong>In-flight Services:</strong> Ratings and preferences for in-flight services such as wifi, food and drink, and entertainment.</p>' },
            { id: 'loyalty', content: '<p><strong>Satisfaction Levels:</strong> The overall satisfaction of our loyal customers with the services provided.</p>' }
        ];

		tabContents.forEach(tab => {
            root.append('div')
                .attr('id', tab.id)
                .attr('class', 'tab-content')
                .style('display', 'none')
                .style('background-color', colorGreenPastel) 
                .html(tab.content);
        });


        const colorGreen = colorGreenPastel; 

        // Static data for the chart
        var staticData = {
            totalLoyal: { data: 40, centerText: "40%" },
            demographics: { data: 65, centerText: "65%" },
            experience: { data: 2.675, centerText: "2.7%" },
            loyalty: { data: 46.46, centerText: "46%" }
        };

        var svgWidth = 200,
            svgHeight = 200;
        var svg = d3
            .select("#donutChart")
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        // Calculate radius and thickness based on SVG dimensions
        function calculateDimensions() {
            var width = parseInt(svg.style("width"));
            var height = parseInt(svg.style("height"));
            var radius = Math.min(width, height) / 2;
            var thickness = 15;
            return { radius, thickness };
        }

        // Function to update the donut chart
        function updateDonutChart(data, centerTextContent) {
            var { radius, thickness } = calculateDimensions();

            var g = svg.selectAll("g").data([0]);
            g.enter()
                .append("g")
                .merge(g)
                .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

            // Background arc for the non-displayed part of the donut
            var backgroundArc = d3
                .arc()
                .innerRadius(radius - thickness)
                .outerRadius(radius)
                .startAngle(0)
                .endAngle(2 * Math.PI);

            // The arc function for the dynamic segment of the donut chart
            var arc = d3
                .arc()
                .innerRadius(radius - thickness)
                .outerRadius(radius);

            // Background arc
            var bg = g.selectAll(".background-arc").data([0]);
            bg.enter()
                .append("path")
                .attr("class", "background-arc")
                .merge(bg)
                .attr("d", backgroundArc)
                .attr("fill", colorBluePastel); 

            // Bind the data to the arc
            var arcData = [{ value: data, startAngle: 0, endAngle: (data / 100) * 2 * Math.PI }];
            var path = g.selectAll(".donut-segment").data(arcData);
            path.enter().append("path").attr("class", "donut-segment").merge(path).attr("d", arc).attr("fill", colorGreen); 
            path.exit().remove();

            // Append enter text
            var centerTextUpdate = g.selectAll(".center-text").data([0]);
            centerTextUpdate
                .enter()
                .append("text")
                .attr("class", "center-text")
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .merge(centerTextUpdate)
                .text(centerTextContent);
        }

        // Function to retrieve the data for the selected tab
        function getDataForTab(tabName) {
            return staticData[tabName] || { data: 0, centerText: "" };
        }

        // Global variable to keep track of the current tab
        var currentTab = "totalLoyal";

        window.showTab = function (tabName) {
            // Hide all tab contents
            var tabContents = document.getElementsByClassName("tab-content");
            for (var i = 0; i < tabContents.length; i++) {
                tabContents[i].style.display = "none";
            }

            // Show the selected tab content
            var selectedTabContent = document.getElementById(tabName);
            if (selectedTabContent) {
                selectedTabContent.style.display = "block";
            }

            // Update the donut chart with the data for the selected tab
            var data = getDataForTab(tabName);
            updateDonutChart(data.data, data.centerText);

            // Set the mainNumber div to be visible only if there's data for the chart
            mainNumber.style('display', data.data ? 'block' : 'none');

            // Update the current tab
            currentTab = tabName;
        };

        // Load CSV data and update the chart if new data is available
        d3.csv("./data/customer_satisfaction.csv").then(function (csvData) {
            csvData.forEach(function (d) {
                if (staticData[d.tabName]) {
                    staticData[d.tabName].data = parseFloat(d.data);
                    staticData[d.tabName].centerText = d.centerText;
                }
            });

            // If the CSV contains data for the 'totalLoyal' tab, update the chart
            if (staticData['totalLoyal']) {
                var initialData = staticData['totalLoyal'];
                updateDonutChart(initialData.data, initialData.centerText);
            }
        });

        // Update the chart on window resize
        window.addEventListener("resize", function () {
            if (currentTab && staticData[currentTab]) {
                var resizedData = staticData[currentTab];
                updateDonutChart(resizedData.data, resizedData.centerText);
            }
        });

        // Initially show the 'Total Loyal Customers' tab
        showTab('totalLoyal');
    });
})();
