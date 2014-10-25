
var width = 960,
    height = 500;


var svg = d3.select(".chart")
            .append("svg")
            .attr("width", width)
    		    .attr("height", height);
            


//empty object will hold the results later
var elex = {};

$(document).ready(function() {
    getDataHouse();
   // getDataCounties();
   // getDataCongress();
   
});

function getDataHouse() {
  // missouri house districts
d3.json("data/mo_topo_house.json", function(error, theMoHoData) {
    if (error) return console.error(error);
    console.log(theMoHoData);

    var house = topojson.feature(theMoHoData, theMoHoData.objects.mo_house);

// albers projection
var projection = d3.geo.albers()

    .center([-0.6, 38.7])
    // lat long - geogrpahic center of missouri - 
    .rotate([91.5, .3, .75])
    .parallels([29.5, 25])
    .scale(6000)
    .translate([width / 2, height / 2]);

    // var projection = d3.geo.mercator()
    // .center([0,0])
    // // lat long - geogrpahic center of missouri - rotate the GLOBE
    // .rotate([92.379, -38.297])
    // // .parallels([50, 60])
    // .scale(6000)
    // .translate([width / 2, height / 2]);

    
var path = d3.geo.path()
    .projection(projection);

    svg.append("path")
    .datum(house)
    .attr("d", path);

svg.selectAll(".housedist")
    .data(topojson.feature(theMoHoData, theMoHoData.objects.mo_house).features)
  .enter().append("path")
    .attr("class", function(d) { return "housedist " + d.properties.DISTRICT; })
    .attr("d", path);

svg.append("path")
    .datum(topojson.mesh(theMoHoData, theMoHoData.objects.mo_house, function(a, b) { return a !== b && a.id !== "IRL"; }))
    .attr("d", path)
    .attr("class", "house-edges");



});

 


}

function getDataCounties() {

       $.each(data, function (k,v){
        elex[v.FIPS] = v
      });

       
  // missouri counties
d3.json("data/mo_topo_county.json", function(error, theMoMapData) {
    if (error) return console.error(error);
    console.log(theMoMapData);

var subunits = topojson.feature(theMoMapData, theMoMapData.objects.mo_county_slice);

// albers projection
var projection = d3.geo.albers()

    .center([-0.6, 38.7])
    // lat long - geogrpahic center of missouri - 
    .rotate([91.5, .3, .75])
    .parallels([29.5, 25])
    .scale(6000)
    .translate([width / 2, height / 2]);

    // var projection = d3.geo.mercator()
    // .center([0,0])
    // // lat long - geogrpahic center of missouri - rotate the GLOBE
    // .rotate([92.379, -38.297])
    // // .parallels([50, 60])
    // .scale(6000)
    // .translate([width / 2, height / 2]);

    
var path = d3.geo.path()
    .projection(projection);

    svg.append("path")
    .datum(subunits)
    .attr("d", path);

svg.selectAll(".county")
    .data(topojson.feature(theMoMapData, theMoMapData.objects.mo_county_slice).features)
  .enter().append("path")
    .attr("class", function(d) { return "county " + d.properties.COUNTYFP; })
    .attr("d", path);

svg.append("path")
    .datum(topojson.mesh(theMoMapData, theMoMapData.objects.mo_county_slice, function(a, b) { return a !== b && a.id !== "IRL"; }))
    .attr("d", path)
    .attr("class", "county-edges");

});

 


}

function getDataCongress() {

  // missouri congress
d3.json("data/mo_topo_congress.json", function(error, theMoCoData) {
    if (error) return console.error(error);
    console.log(theMoCoData);
	
var districts = topojson.feature(theMoCoData, theMoCoData.objects.mo_congress);

// albers projection
var projection = d3.geo.albers()

    .center([-0.6, 38.7])
    // lat long - geogrpahic center of missouri - 
    .rotate([91.5, .3, .75])
    .parallels([29.5, 25])
    .scale(6000)
    .translate([width / 2, height / 2]);

    // var projection = d3.geo.mercator()
//     .center([0,0])
//     // lat long - geogrpahic center of missouri - rotate the GLOBE
//     .rotate([92.379, -38.297])
//     // .parallels([50, 60])
//     .scale(6000)
//     .translate([width / 2, height / 2]);

    
var path = d3.geo.path()
    .projection(projection);

    svg.append("path")
    .datum(districts)
    .attr("d", path);

svg.selectAll(".district")
    .data(topojson.feature(theMoCoData, theMoCoData.objects.mo_congress).features)
  .enter().append("path")
    .attr("class", function(d) { return "district " + d.properties.CD113FP; })
    .attr("d", path);

svg.append("path")
    .datum(topojson.mesh(theMoCoData, theMoCoData.objects.mo_congress, function(a, b) { return a !== b && a.id !== "IRL"; }))
    .attr("d", path)
    .attr("class", "district-edges");




//   // missouri counties
// d3.json("data/mo_map_topo.json", function(error, theMoMapData) {
//   	if (error) return console.error(error);
//   	console.log(theMoMapData);

// var subunits = topojson.feature(theMoMapData, theMoMapData.objects.test_mo_geo);

// // albers projection
// var projection = d3.geo.albers()

//     .center([-0.6, 38.7])
//     // lat long - geogrpahic center of missouri - 
//     .rotate([91.5, .3, .75])
//     .parallels([29.5, 25])
//     .scale(6000)
//     .translate([width / 2, height / 2]);

//     // var projection = d3.geo.mercator()
// //     .center([0,0])
// //     // lat long - geogrpahic center of missouri - rotate the GLOBE
// //     .rotate([92.379, -38.297])
// //     // .parallels([50, 60])
// //     .scale(6000)
// //     .translate([width / 2, height / 2]);

    
// var path = d3.geo.path()
//     .projection(projection);

//     svg.append("path")
//     .datum(subunits)
//     .attr("d", path);

// svg.selectAll(".county")
//     .data(topojson.feature(theMoMapData, theMoMapData.objects.test_mo_geo).features)
//   .enter().append("path")
//     .attr("class", function(d) { return "county " + d.properties.COUNTYFP; })
//     .attr("d", path);

// svg.append("path")
//     .datum(topojson.mesh(theMoMapData, theMoMapData.objects.test_mo_geo, function(a, b) { return a !== b && a.id !== "IRL"; }))
//     .attr("d", path)
//     .attr("class", "county-edges");

// });
});

}

