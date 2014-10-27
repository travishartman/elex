
/*#########################################
\                                         \
\              Variables                  \
\                                         \
\                                         \
#########################################*/
var mapWidth = $(".my-map").width(),
    mapHeight = $(".my-map").height();

var width = 960,
    height = 500;


// var svg = d3.select(".my-map")
//             .append("svg")
//             .attr("width", width)
//     		    .attr("height", height);



// albers projection
var projection = d3.geo.albers()

    .center([-0.6, 38.7])
    // lat long - geogrpahic center of missouri - 
    .rotate([91.5, .3, .75])
    .parallels([29.5, 25])
    .scale(6000)
    .translate([width / 2, height / 2]);

//     // var projection = d3.geo.mercator()
//     // .center([0,0])
//     // // lat long - geogrpahic center of missouri - rotate the GLOBE
//     // .rotate([92.379, -38.297])
//     // // .parallels([50, 60])
//     // .scale(6000)
//     // .translate([width / 2, height / 2]);

    
var path = d3.geo.path()
    .projection(projection);

var currView = "mo_counties";
            

//empty object will hold the results later
var join = {}; 

var mapSvg = d3.select(".my-map").append("svg")
    .attr("class", "mapSvg")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

mapSvg.append("rect")
    .attr("class", "background")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

var mapGroup = mapSvg.append("g");



/*#########################################
\                                         \
\              FUNCTIONS                  \
\                                         \
\                                         \
#########################################*/






(function($){

    $(document).ready(function() {
      makeData.init();   
      setNav();    
    }); // close of document ready

//
// BUILD MAP FUNCTIONS
//

var makeData = {

      init: function (){
      queue()
// listed as "data" in the ready function
          .defer(d3.csv, "data/sample_feed_data.csv")
          .await(setData);
    }
  }//close makeData


function setData (error, elex_data) {
    
$.each(elex_data, function (k,v){
        join[v.fips] = v
      });

console.log(elex_data);

theMap.init();
};


// below info transferred to map info repo



var theMap = {

  init: function () {

    queue ()
        // listed as "county" in the ready funciton
          .defer(d3.json, "data/mo_topo_county.json")
// listed as "house" in the ready funciton
          .defer(d3.json, "data/mo_topo_house.json")
// listed as "congress" in the ready funciton
          .defer(d3.json, "data/mo_topo_uscongress.json")
// listed as "senate" in the ready funciton
          .defer(d3.json, "data/mo_topo_senate.json")
.await(theMap.drawMap);

}, //close theMap.init

drawMap: function (error, mo_county, mo_house, us_congress, mo_senate) {

console.log(mo_county);
console.log(mo_house);
console.log(mo_senate);
console.log(us_congress);



// STATEWIDE

var mapCounty =  mapGroup.append("g")
    .attr("class", "group county");


var counties = topojson.feature(mo_county, mo_county.objects.mo_county_slice);


mapCounty.append("path")
    .datum(counties)
    .attr("d", path);

mapCounty.selectAll(".county")
    .data(topojson.feature(mo_county, mo_county.objects.mo_county_slice).features)
  .enter().append("path")
    .attr('id', function(d){return "29" + d.properties.COUNTYFP})
    .attr("class", function(d) { return "county " + join[d.properties.COUNTYFP].party; })
    // .attr("class", function(d) { return "county " + d.properties.COUNTYFP + join[d.]; })
    .attr("d", path);

mapCounty.append("path")
    .datum(topojson.mesh(mo_county, mo_county.objects.mo_county_slice, function(a, b) { return a !== b}))
    .attr("d", path)
    .attr("class", "county-edges");





// HOUSE DISTRICTS

var mapHouse =  mapGroup.append("g")
    .attr("class", "group mohouse");

var house = topojson.feature(mo_house, mo_house.objects.mo_house);

mapHouse.append("path")
    .datum(house)
    .attr("d", path);

mapHouse.selectAll(".mohouse")
    .data(topojson.feature(mo_house, mo_house.objects.mo_house).features)

    // .data(topojson.feature(mo_house, mo_house.objects.mo_house).features)
    .enter().append("path")
    .attr("class", function(d) { return "mohouse " + d.properties.DISTRICT; })
    .attr("d", path);

mapHouse.append("path")
    .datum(topojson.mesh(mo_house, mo_house.objects.mo_house, function(a, b) { return a !== b; }))
    .attr("d", path)
    .attr("class", "mohouse-edges");



//MO SENATE

var mapSenate =  mapGroup.append("g")
    .attr("class", "group mosenate");

var senate = topojson.feature(mo_senate, mo_senate.objects.mo_senate);


mapSenate.append("path")
    .datum(senate)
    .attr("d", path);

mapSenate.selectAll(".mosenate")
    .data(topojson.feature(mo_senate, mo_senate.objects.mo_senate).features)
    .enter().append("path")
    .attr("class", function(d) { return "mosenate " + d.properties.SLDUST; })
    .attr("d", path);

mapSenate.append("path")
    .datum(topojson.mesh(mo_senate, mo_senate.objects.mo_senate, function(a, b) { return a !== b; }))
    .attr("d", path)
    .attr("class", "mosenate-edges");

//US CONGRESS
var mapCongress =  mapGroup.append("g")
    .attr("class", "group ushouse");


var uscongress = topojson.feature(us_congress, us_congress.objects.mo_congress);


mapCongress.append("path")
    .datum(uscongress)
    .attr("d", path);

mapCongress.selectAll(".ushouse")
    .data(topojson.feature(us_congress, us_congress.objects.mo_congress).features)
    .enter().append("path")
    .attr("class", function(d) { return "ushouse " + d.properties.CD113FP; })
    .attr("d", path);

mapCongress.append("path")
    .datum(topojson.mesh(us_congress, us_congress.objects.mo_congress, function(a, b) { return a !== b; }))
    .attr("d", path)
    .attr("class", "ushouse-edges");

} //close theMap.drawMap

// updateStatewide: function() {


// }

} //close theMap
})(jQuery);


// Buttons! change view-state to active on click
function setNav () {


    $(".btn.view-state").on("click", function() {
        currView = $(this).attr("val");



    $(".btn.view-state").removeClass("active");
    $(this).addClass("active");


    if (currView === "mo_counties") {
    // theMap.updateStates();
    d3.selectAll(".mohouse, .mosenate, .ushouse").style("visibility", "hidden");
    d3.selectAll(".county").style("visibility", "visible");
    } else if (currView === "mo_house") {
    // TheMap.updateDistricts();
    d3.selectAll(".ushouse, .mosenate, .county").style("visibility", "hidden");
    d3.selectAll(".mohouse").style("visibility", "visible");
    } else if (currView === "mo_senate") {
    // TheMap.updateDistricts();
    d3.selectAll(".mohouse, .ushouse, .county").style("visibility", "hidden");
    d3.selectAll(".mosenate").style("visibility", "visible");
    } else if (currView === "us_house") {
    // TheMap.updateDistricts();
    d3.selectAll(".mohouse, .mosenate, .county").style("visibility", "hidden");
    d3.selectAll(".ushouse").style("visibility", "visible");
}
});

};

// district senate county housedist

// mo_counties senate house us_house
