// setting up chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// adding and appending svg
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  //import data
  d3.csv("assets/data/data.csv").then(function(stateData) {
      console.log(stateData);

      stateData.forEach(function(data) {
          data.poverty = +data.poverty;
          data.healthcare = +data.healthcare;
      });
    //Scales for chart
    var xScale = d3.scaleLinear()
    .domain(d3.extent(stateData, data => data.poverty))
    .range([0, width]);

    var yScale =d3.scaleLinear()
    .domain(d3.extent(stateData, data => data.healthcare))
    .range([height,0]);
    
    //axes
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);

    //circles
    var circles = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", "15")
    .classed("stateCircle", true);

    var circleText = chartGroup.selectAll()
    .data(stateData)
    .enter()
    .append("text")
    .text(data => data.abbr)
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare))
    .attr("font-size", "10px")
    .classed("stateText", true);
  });
  //axis titles
  svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 40) + ")")
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .text("In Poverty (%)");
   
   svg.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 50 - margin.left)
   .attr("x",0 - (height / 2))
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .style("font-weight", "bold")
   .text("Lacks Healthcare (%)"); 