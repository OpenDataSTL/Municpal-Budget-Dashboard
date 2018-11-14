/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.7 - Loading external data
*/

// CSV needs to be http/https (not file://) to load
var tempUrl = "https://raw.githubusercontent.com/OpenDataSTL/municipalityBudgetsSTL/master/data/budget.csv"

d3.csv(tempUrl).then(function(rows){
    rows.forEach(function(row){
        row["POPULATION"] = parseInt(row["POPULATION"]);
        row["TOTAL REVENUE"] = parseInt(row["TOTAL REVENUE"]);
        row["TOTAL EXPENDITURES"] = parseInt(row["TOTAL EXPENDITURES"]);
        row["POLICE"] = parseInt(row["POLICE"]);
        row["BUDGET YEAR"] = parseInt(row["BUDGET YEAR"]);
    });

    var filtered_rows = rows.filter(function(row){
        if (isNaN(row["BUDGET YEAR"])){ return false; }
        if (isNaN(row["TOTAL REVENUE"])){ return false; }
        if (isNaN(row["TOTAL EXPENDITURES"])){ return false; }
        return true;
    });

    var totalRevenueSum = 0;
    filtered_rows.forEach(function(row){
      totalRevenueSum += row["TOTAL REVENUE"];
    });
    var totalRevenueAverage = totalRevenueSum / filtered_rows.length;

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 1400)
        .attr("height", 1400);

    var circles = svg.selectAll("circle")
        .data(filtered_rows);

    circles.enter()
        .append("circle")
            .attr("cx", function(d, i){
                console.log(d);
                return (i * 50) + 25;
            })
            .attr("cy", 25)
            .attr("r", function(d){
                return d["TOTAL REVENUE"]/totalRevenueAverage * 25;
            })

}).catch(function(error){
    console.log(error);
})
