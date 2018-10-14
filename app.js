// @TODO: YOUR CODE HERE!
// read the data from the csv file 

var dataset = []; 

d3.csv(".\/assets\/data\/data.csv").then(function(e, csvData){
    
        if (e){
            console.log(e); 
        }
        dataset = csvData;
});

console.log("data", dataset); 





// parse data
dataset.forEach(function(data){
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
});

Create the svg canvas height and width 

var svgHeight = 400;
var svgWidth = 900; 

// margins to move your svg to the down and to the right 

var margins = {
    top: 50, 
    right: 50,
    bottom: 50, 
    left: 50
};

// Adjust your svg position 
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// svg wrapper
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";

// function used for updating x-scale var upon click on axis label
function xScale(dataset, chosenXAxis) {
  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(dataset, d => d[chosenXAxis]),
      d3.max(dataset, d => d[chosenXAxis])
    ])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }

// function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

    if (chosenXAxis === "poverty") {
      var label = "Poverty";
    }
    else {
      var label = "Age (Median)";
    }
  
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}`);
      });
      circlesGroup.call(toolTip);

      circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
        toolTip.hide(data);
        });
      
        return circlesGroup;
}

  // xLinearScale function above csv import
  var xLinearScale = xScale(dataset, chosenXAxis);

// Create y scale function
var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.healthcare)])
    .range([height, 0]);

// Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

// append x axis
var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // append y axis
  chartGroup.append("g")
    .call(leftAxis);
  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".5");

// Create group for  2 x- axis labels
var labelsGroup = chartGroup.append("g")
.attr("transform", `translate(${width / 2}, ${height + 20})`);

var PovertyLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("value", "poverty") // value to grab for event listener
.classed("active", true)
.text("Poverty");

var AgeLabel = labelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.attr("value", "age") // value to grab for event listener
.classed("inactive", true)
.text("Age");

 // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Level of Healthcare");

// updateToolTip function above csv import
var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

// x axis labels event listener
labelsGroup.selectAll("text")
   .on("click", function() { 
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
            // replaces chosenXAxis with value
            chosenXAxis = value;  
            
            // functions here found above csv import
            // updates x scale for new data
            xLinearScale = xScale(hairData, chosenXAxis);

            // updates x axis with transition
            xAxis = renderAxes(xLinearScale, xAxis);

            // updates circles with new x values
            circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

            // updates tooltips with new info
            circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
             // changes classes to change bold text
                if (chosenXAxis === "age") {
                 AgeLabel
              .classed("active", true)
              .classed("inactive", false);
                PovertyLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            AgeLabel
              .classed("active", false)
              .classed("inactive", true);
            PovertyLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
  
