


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
// .center - first number is basic up = left, down, = right, second number is up is down, down is up. 
    .center([1.2, 38.7])
    // lat long - geogrpahic center of missouri - 
    .rotate([91.5, .3, .75])
    .parallels([29.5, 25])
    .scale(5500)
    .translate([width / 2, height / 2]);

    
var path = d3.geo.path()
    .projection(projection);

var currView = "audit";
            

var join = {}; 
var test = {};
var mosenate = {};
var mohouse = {};
var ushouse = {};
var ca2 = {};
var ca3 = {};
var ca6 = {};
var ca10 = {};
var audit = {};


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
      loading();
      makeData.init();   
      setNav();    
    }); 

    function loading() {

    var lw = $(".loading").width();
    var lh = $(".loading").height();

    $(".loading").css({
        "left" : (mapWidth/2) - (lw/2)+"px",
        "top" : (mapHeight/2) - (lh/2)+"px",
        "display" : "block"
    });
}

//
// BUILD MAP FUNCTIONS
//

var makeData = {

      init: function (){
      queue()
          // .defer(d3.json, "data/data_2.json")
          .defer(d3.json, "data/election_data.json")
          .await(setData);
          // .await(lastupdate);
    }
  }//close makeData









// set up variable for the info box that will appear on rollover
infoBoxUpdates = {

  audit: function(d){

    // calls to div with ID  of infobox via jquery
    var infoBox = $('#infobox'),
    // deleted "fips" from the ID of the map
           fips = this.id.replace(/^fips/,''),
           // pulls the data from the currview dataset
           data = mapData[currView];
           


           if (currView === "audit"){
           // drills into the object that holds the results
        var results = data.county_results[fips];
        var percent = data.county_results[fips].reporting_precincts /  data.county_results[fips].reporting_precincts;

      var votecount = 0;
      var statewide = [];
      var bulletgroup = []
      for (var candidateId in data.candidates){
      var candidate = data.candidates[candidateId];
         votecount += results.candidates[candidateId].yes_votes;
         statewide.push(candidate.yes_votes);}
         console.log(statewide)
      
      //    for (var candidateId in data.candidates){
      // var candidate = data.candidates[candidateId];
      //    votecount += results.candidates[candidateId].yes_votes;}
    // console.log(votecount)

        // preps the message:  sets the county text to a headline (and starts an unordered list)
        message = "<h4 class = 'ibhed'>County :</h4>"+ "<br/><h3 class = 'cty'>" + results.county + "</h3><ul>";

// LOOP IN VAR MESSAGE
// loops through the candID in the data.candidates
for (var candidateId in data.candidates){
  // sets the results of the loop to "candidate" i.e. the values in the object (which is the IDs)
     var candidate = data.candidates[candidateId];

         var bullet = '<i class="fa fa-square ' + candidate.party + '"></i>';
         bulletgroup.push(bullet);

          // message is a list item (set in the unordered list) and displays the candidate name plus":""
          message += "<li>" + bullet + " " + candidate.candidate_name +'<br/>'+ '( '+ candidate.party + ' ) ' +'<br/>'+ " Votes : " + 
          // and the results from the "yes" votes and then closes the list item.
          results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b></li>";
          

}//CLOSE LOOP IN VAR MESSAGE
// bulletgroup.push(bullet);
// uses entirety of var message from line 112-124 and adds an unordered list closing tag after the loops goes through all the data and breaks.


  message += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul><h3 class ='lowhead'><br>Statewide Totals:</h3><br> <ul id = 'audittotal'><li>" + bulletgroup[0] + " " +statewide[0] + "  " + "<b>("+(~~(statewide[0]/(statewide[0]+statewide[1]+statewide[2])*100).toFixed(2))+"%)</b>"+ "</li><li>" + bulletgroup[1] + " " + statewide[1] + "  " + "<b>("+(~~(statewide[0]/(statewide[0]+statewide[1]+statewide[2])*100).toFixed(2))+"%)</b>"+ "</li><li>" + bulletgroup[2] + " " +statewide[2]+ "  " + "<b>("+(~~(statewide[0]/(statewide[0]+statewide[1]+statewide[2])*100).toFixed(2))+"%)</b>"+"</li></ul>";


// '<i class="fa fa-square Constitution' '<i class='fa fa-square Libertarian'" '<i class="fa fa-square Republican'

//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"
  infoBox.html(message);

   //close function: audit

} else  if (currView === "ca2"){ 

        var results = data.county_results[fips];
        var percent = data.county_results[fips].reporting_precincts /  data.county_results[fips].total_precincts;

              for (var candidateId in data.candidates){
      var candidate = data.candidates[candidateId]}
         var votecount = results.candidates[candidateId].yes_votes + results.candidates[candidateId].no_votes ;

        message2 = "<h4 class = 'ibhed'>County :</h4>"+ "<br/><h3 class = 'cty'>" + results.county + "</h3><ul>";
          for (var candidateId in data.candidates){
            var candidate = data.candidates[candidateId];
            var bullet = '<i class="fa fa-square yes"></i>';
            // var bullet = '<i class="fa fa-square ' + results.candidates[candidateId][key] + '"></i>';
            message2 += "<li>" + candidate.candidate_name + '<br/>'+ '(Criminal Trials) ' + '<br/>'+ '<i class="fa fa-square yesvote"></i>' + " " + "Yes votes : "  + results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b>" + '<br/>'+ '<i class="fa fa-square novote"></i>' + " " +  "No votes : " + results.candidates[candidateId].no_votes + "  <b>(" +(~~(results.candidates[candidateId].no_votes/votecount*100).toFixed(2)) +"%)</b></li>"
        }//CLOSE LOOP IN VAR MESSAGE
bulletgroup =['<i class="fa fa-square yesvote"></i>','<i class="fa fa-square novote"></i>'];
  message2 += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul><br><br><p class='amend2'><b>Amendment 2:</b> A “yes” vote would amend the Missouri Constitution to allow evidence of prior criminal acts to be considered by courts in prosecutions of sexual crimes that involve a minor.</p><br><h3 class ='c2lowhead'><br>Statewide Totals:</h3><br> <ul id = 'ca2yntotal'><li>"+ bulletgroup[0] + " (Y) " + data.candidates[750006198].yes_votes +"  "+ "<b>("+(~~(data.candidates[750006198].yes_votes/data.total_votes*100).toFixed(2)) +"%)</b></li><li>" + bulletgroup[1] + " (N) " +data.candidates[750006198].no_votes+"  "+ "<b>("+(~~(data.candidates[750006198].no_votes/data.total_votes*100).toFixed(2)) +"%)</b></li></ul>";

//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"
  infoBox.html(message2);

  }  else  if (currView === "ca3"){ 

        var results = data.county_results[fips];
        var percent = data.county_results[fips].reporting_precincts /  data.county_results[fips].total_precincts;

              for (var candidateId in data.candidates){
      var candidate = data.candidates[candidateId]}
         var votecount = results.candidates[candidateId].yes_votes + results.candidates[candidateId].no_votes ;

        message2 = "<h4 class = 'ibhed'>County :</h4>"+ "<br/><h3 class = 'cty'>" + results.county + "</h3><ul>";
          for (var candidateId in data.candidates){
            var candidate = data.candidates[candidateId];
            var bullet = '<i class="fa fa-square yes"></i>';
            // var bullet = '<i class="fa fa-square ' + results.candidates[candidateId][key] + '"></i>';
            message2 += "<li>" + candidate.candidate_name + '<br/>'+ '(Teacher Evaluation) ' + '<br/>'+ '<i class="fa fa-square yesvote"></i>' + " " + "Yes votes : "  + results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b>" + '<br/>'+ '<i class="fa fa-square novote"></i>' + " " +  "No votes : " + results.candidates[candidateId].no_votes + "  <b>(" +(~~(results.candidates[candidateId].no_votes/votecount*100).toFixed(2)) +"%)</b></li>"
        }//CLOSE LOOP IN VAR MESSAGE
bulletgroup =['<i class="fa fa-square yesvote"></i>','<i class="fa fa-square novote"></i>'];
  message2 += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul><br><p class = 'amend3'><b>Amendment 3:</b> A “yes” vote would amend the Missouri Constitution to require teachers to be evaluated by a standards-based performance evaluation system.</p><br><h3 class ='c3lowhead'><br>Statewide Totals:</h3><br> <ul id = 'ca3yntotal'><li>"+ bulletgroup[0] + " (Y) " + data.candidates[750006199].yes_votes +"  "+ "<b>("+(~~(data.candidates[750006199].yes_votes/data.total_votes*100).toFixed(2)) +"%)</b></li><li>" + bulletgroup[1] + " (N) " +data.candidates[750006199].no_votes+"  "+ "<b>("+(~~(data.candidates[750006199].no_votes/data.total_votes*100).toFixed(2)) +"%)</b></li></ul>";

//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"
  infoBox.html(message2);

  } else  if (currView === "ca6"){ 

        var results = data.county_results[fips];
        var percent = data.county_results[fips].reporting_precincts /  data.county_results[fips].total_precincts;

              for (var candidateId in data.candidates){
      var candidate = data.candidates[candidateId]}
         var votecount = results.candidates[candidateId].yes_votes + results.candidates[candidateId].no_votes ;

        message2 = "<h4 class = 'ibhed'>County :</h4>"+ "<br/><h3 class = 'cty'>" + results.county + "</h3><ul>";
          for (var candidateId in data.candidates){
            var candidate = data.candidates[candidateId];
            var bullet = '<i class="fa fa-square yes"></i>';
            // var bullet = '<i class="fa fa-square ' + results.candidates[candidateId][key] + '"></i>';
            message2 += "<li>" + candidate.candidate_name + '<br/>'+ '(Voting) ' + '<br/>'+ '<i class="fa fa-square yesvote"></i>' + " " + "Yes votes : "  + results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b>" + '<br/>'+ '<i class="fa fa-square novote"></i>' + " " +  "No votes : " + results.candidates[candidateId].no_votes + "  <b>(" +(~~(results.candidates[candidateId].no_votes/votecount*100).toFixed(2)) +"%)</b></li>"
        }//CLOSE LOOP IN VAR MESSAGE
bulletgroup =['<i class="fa fa-square yesvote"></i>','<i class="fa fa-square novote"></i>'];
  message2 += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul><br><br><p class='amend6'><b>Amendment 6:</b> A “yes” vote would amend the Missouri Constitution to allow a voting window of six business days prior to a general election to cast a ballot.</p><br><h3 class ='c6lowhead'><br>Statewide Totals:</h3><br> <ul id = 'ca6yntotal'><li>"+ bulletgroup[0] + " (Y) " + data.candidates[750006200].yes_votes +"  "+ "<b>("+(~~(data.candidates[750006200].yes_votes/data.total_votes*100).toFixed(2)) +"%)</b></li><li>" + bulletgroup[1] + " (N) " +data.candidates[750006200].no_votes+"  "+ "<b>("+(~~(data.candidates[750006200].no_votes/data.total_votes*100).toFixed(2)) +"%)</b></li></ul>";

//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"
  infoBox.html(message2);

  } else  if (currView === "ca10"){ 

        var results = data.county_results[fips];
        var percent = data.county_results[fips].reporting_precincts /  data.county_results[fips].total_precincts;

              for (var candidateId in data.candidates){
      var candidate = data.candidates[candidateId]}
         var votecount = results.candidates[candidateId].yes_votes + results.candidates[candidateId].no_votes ;


        message2 = "<h4 class = 'ibhed'>County :</h4>"+ "<br/><h3 class = 'cty'>" + results.county + "</h3><ul>";
          for (var candidateId in data.candidates){
            var candidate = data.candidates[candidateId];
            var bullet = '<i class="fa fa-square yes"></i>';
            // var bullet = '<i class="fa fa-square ' + results.candidates[candidateId][key] + '"></i>';
            message2 += "<li>" + candidate.candidate_name + '<br/>'+ '(Government Finances) ' + '<br/>'+ '<i class="fa fa-square yesvote"></i>' + " " + "Yes votes : "  + results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b>" + '<br/>'+ '<i class="fa fa-square novote"></i>' + " " +  "No votes : " + results.candidates[candidateId].no_votes + "  <b>(" +(~~(results.candidates[candidateId].no_votes/votecount*100).toFixed(2)) +"%)</b></li>"
        }//CLOSE LOOP IN VAR MESSAGE
bulletgroup =['<i class="fa fa-square yesvote"></i>','<i class="fa fa-square novote"></i>'];
  message2 += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul><br><br><p class='amend10'><b>Amendment 10:</b> A “yes” vote would amend the Missouri Constitution to curb the power of the govenor in terms of his/her ability to amend the state budget after it is passed by the legislature.</p><br><h3 class ='c10lowhead'><br>Statewide Totals:</h3><br> <ul id = 'ca10yntotal'><li>"+ bulletgroup[0] + " (Y) " + data.candidates[750006201].yes_votes +"  "+ "<b>("+(~~(data.candidates[750006201].yes_votes/data.total_votes*100).toFixed(2)) +"%)</b></li><li>" + bulletgroup[1] + " (N) " +data.candidates[750006201].no_votes+"  "+ "<b>("+(~~(data.candidates[750006201].no_votes/data.total_votes*100).toFixed(2)) +"%)</b></li></ul>";

//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"
  infoBox.html(message2);

  } else  if (currView === "mohouse"){ 

        var fips_replace = this.id.replace(/MH/,''),
                    fips = fips_replace.replace(/_/,' ');
                    // console.log(fips)
             var results = data[fips];
             var percent = results.reporting_precincts /  results.reporting_precincts;

                 var votecount = 0;
      for (var candidateId in results.candidates){
      var candidate = results.candidates[candidateId];
         votecount += results.candidates[candidateId].yes_votes ;}
         // console.log(votecount);


             // console.log(results)
        message2 = "<h3 class = 'ibhed'>" + [fips] + "</h3><ul>";
          for (var candidateId in results.candidates){
            var candidate = results.candidates[candidateId];
            var bullet = '<i class="fa fa-square ' + candidate.party + '"></i>';
            message2 += "<li>" + bullet + " " + candidate.candidate_name + '<br/>'+ '( ' + candidate.party + ') ' + '<br/>'+ "Votes : " + results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b>" +'<br/>'+"</li>"
        }//CLOSE LOOP IN VAR MESSAGE

  message2 += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul>";

//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"
  infoBox.html(message2);

  }else  if (currView === "mosenate"){ 

        var fips_replace = this.id.replace(/MS/,''),
                    fips = fips_replace.replace(/_/,' ');
                    // console.log(fips)
             var results = data[fips];
           var votecount = 0;
          var messagenon = "<h3 class = 'ibhed'>" + [fips] + "</h3><ul>" + "<li>" + '<i class="fa fa-square norace"></i>' + " (Indicates no race in 2014)";

     if (typeof results == "undefined") {infoBox.html(messagenon);} else {
            var percent = results.reporting_precincts /  results.reporting_precincts;
          for (var candidateId in results.candidates){
          var candidate = results.candidates[candidateId];
             votecount += results.candidates[candidateId].yes_votes ;}

        message2 = "<h3 class = 'ibhed'>" + [fips] + "</h3><ul>" + "<li>";
          for (var candidateId in results.candidates){
            var candidate = results.candidates[candidateId];
            var bullet = '<i class="fa fa-square ' + candidate.party + '"></i>';
            message2 += "<li>" + bullet + " " + candidate.candidate_name + '<br/>'+ '( ' + candidate.party + ') ' + '<br/>'+ "Votes : " + results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b>" +'<br/>'+"</li>"
        }//CLOSE LOOP IN VAR MESSAGE


  message2 += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul>";

// polyfill:
// if (!Object.keys) Object.keys = function(o) {
//   if (o !== Object(o))
//     throw new TypeError('Object.keys called on a non-object');
//   var k=[],p;
//   for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
//   return k;
// }
  // Object.keys(mapData[currView]['District 44'].candidates).length


//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"

  infoBox.html(message2);}

  }else  if (currView === "ushouse"){ 

        var fips_replace = this.id.replace(/US/,''),
                    fips = fips_replace.replace(/_/,' ');
             var results = data[fips];
             var percent = results.reporting_precincts /  results.reporting_precincts;

                 var votecount = 0;
      for (var candidateId in results.candidates){
      var candidate = results.candidates[candidateId];
         votecount += results.candidates[candidateId].yes_votes ;}


        message2 = "<h3 class = 'ibhed'>" + [fips] + "</h3><ul>";
          for (var candidateId in results.candidates){
            var candidate = results.candidates[candidateId];
            var bullet = '<i class="fa fa-square ' + candidate.party + '"></i>';
            message2 += "<li>" + bullet + " " + candidate.candidate_name + '<br/>'+ '( ' + candidate.party + ') ' + '<br/>'+ "Votes : " + results.candidates[candidateId].yes_votes + "  <b>(" +(~~(results.candidates[candidateId].yes_votes/votecount*100).toFixed(2)) +"%)</b>" +'<br/>'+"</li>"
        }//CLOSE LOOP IN VAR MESSAGE

  message2 += "<br><b>(Precincts reporting: " +(~~percent) +"%)</b></ul>";

//  this line simply applies the "message" to go in the infobox - jquery is "x.html(varname)"
  infoBox.html(message2);

  }


},//close function :audit

     clear: function(d){
    var infoBox = $('#infobox');
    var clearmessage = " ";
    infoBox.html(clearmessage);
  },



};  //close updateinfobox






// collection of functions to color districts - lookup for the set of data per data set
update = {


   audit: function (data){
      for (var fips in data.county_results) {
        var fipsInfo = data.county_results[fips],
                  el = d3.select('path#fips'+fips);

                      var max = {candidate: "", votes: 0};
                       for (candidateId in fipsInfo.candidates){
                            if (fipsInfo.candidates[candidateId].yes_votes > max.votes) {
                              max = {candidate: candidateId, votes: fipsInfo.candidates[candidateId].yes_votes };
                            }    
                        } //close inner nested for/if loop

  el.attr('class', 'county _' + max.candidate);

      } //close outer for loop


  }, // close audit function

  ca2: function (data){

    for (var fips in data.county_results) {
        var fipsInfo = data.county_results[fips],
                  el = d3.select('path#fips'+fips);

        var max = {yes_no: "", votes: 0};
          for (candidateId in fipsInfo.candidates){
            if (fipsInfo.candidates[candidateId].yes_votes === fipsInfo.candidates[candidateId].no_votes) {
              max = {yes_no: ''} 
            } else if 
            (fipsInfo.candidates[candidateId].yes_votes > fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'yes', votes: fipsInfo.candidates[candidateId].no_votes} }
            else if 
            (fipsInfo.candidates[candidateId].yes_votes < fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'no', votes: fipsInfo.candidates[candidateId].no_votes}

          };

        } //end nested if statement     
      
        el.attr('class', 'county _' + max.yes_no);

      } //end for loop

    }, //end ca2 function



    ca3: function (data){

    for (var fips in data.county_results) {
        var fipsInfo = data.county_results[fips],
                  el = d3.select('path#fips'+fips);

         var max = {yes_no: "", votes: 0};
          for (candidateId in fipsInfo.candidates){
            if (fipsInfo.candidates[candidateId].yes_votes === fipsInfo.candidates[candidateId].no_votes) {
              max = {yes_no: ''} 
            } else if 
            (fipsInfo.candidates[candidateId].yes_votes > fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'yes', votes: fipsInfo.candidates[candidateId].no_votes} }
            else if 
            (fipsInfo.candidates[candidateId].yes_votes < fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'no', votes: fipsInfo.candidates[candidateId].no_votes}

          };

        } //end nested if statement     
      
        el.attr('class', 'county _' + max.yes_no);

      } //end for loop

    }, //end ca3 function

    ca6: function (data){

    for (var fips in data.county_results) {
        var fipsInfo = data.county_results[fips],
                  el = d3.select('path#fips'+fips);

          var max = {yes_no: "", votes: 0};
          for (candidateId in fipsInfo.candidates){
            if (fipsInfo.candidates[candidateId].yes_votes === fipsInfo.candidates[candidateId].no_votes) {
              max = {yes_no: ''} 
            } else if 
            (fipsInfo.candidates[candidateId].yes_votes > fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'yes', votes: fipsInfo.candidates[candidateId].no_votes} }
            else if 
            (fipsInfo.candidates[candidateId].yes_votes < fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'no', votes: fipsInfo.candidates[candidateId].no_votes}

          };

        } //end nested if statement    
      
        el.attr('class', 'county _' + max.yes_no);

      } //end for loop

    }, //end ca6 function   

ca10: function (data){

    for (var fips in data.county_results) {
        var fipsInfo = data.county_results[fips],
                  el = d3.select('path#fips'+fips);

        var max = {yes_no: "", votes: 0};
          for (candidateId in fipsInfo.candidates){
            if (fipsInfo.candidates[candidateId].yes_votes === fipsInfo.candidates[candidateId].no_votes) {
              max = {yes_no: ''} 
            } else if 
            (fipsInfo.candidates[candidateId].yes_votes > fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'yes', votes: fipsInfo.candidates[candidateId].no_votes} }
            else if 
            (fipsInfo.candidates[candidateId].yes_votes < fipsInfo.candidates[candidateId].no_votes)
            { max = { yes_no: 'no', votes: fipsInfo.candidates[candidateId].no_votes}

          };

        } //end nested if statement     
      
        el.attr('class', 'county _' + max.yes_no);

      } //end for loop

    }, //end ca10 function 

 mohouse: function (data){
 
      for (var dist in data) {
        // strip out the space and replace with an underscore so it's a valid css selector
        var dist_replace = dist.replace(/ /,'_');
        var distInfo = data[dist],
 

                  el = d3.select('path#'+'MH'+dist_replace);
                  

                      var max = {candidate: "", votes: 0, party: ""};
                       for (candidateId in distInfo.candidates){
                            if (distInfo.candidates[candidateId].yes_votes > max.votes) {
                              max = {candidate: candidateId, votes: distInfo.candidates[candidateId].yes_votes, party: distInfo.candidates[candidateId].party  };
                            }    
                        } //close inner nested for/if loop

  el.attr('class', 'mohouse ' + max.party);

      } //close outer for loop


  }, // close mohouse function

mosenate: function (data){
 
      for (var dist in data) {
        // strip out the space and replace with an underscore so it's a valid css selector
        var dist_replace = dist.replace(/ /,'_');
        var distInfo = data[dist];


                  var el = d3.select('path#'+'MS'+dist_replace);

                      var max = {candidate: "", votes: 0, party: ""};
                       for (candidateId in distInfo.candidates){
                            if (distInfo.candidates[candidateId].yes_votes > max.votes) {
                              max = {candidate: candidateId, votes: distInfo.candidates[candidateId].yes_votes, party: distInfo.candidates[candidateId].party  };
                            }    
                        } //close inner nested for/if loop

  el.attr('class', 'mosenate ' + max.party);

      } //close outer for loop


  }, // close mosenate function


  ushouse: function (data){
 
      for (var dist in data) {
        // strip out the space and replace with an underscore so it's a valid css selector
        var dist_replace = dist.replace(/ /,'_');
        var distInfo = data[dist];


                  var el = d3.select('path#'+'US'+dist_replace);

                      var max = {candidate: "", votes: 0, party: ""};
                       for (candidateId in distInfo.candidates){
                            if (distInfo.candidates[candidateId].yes_votes > max.votes) {
                              max = {candidate: candidateId, votes: distInfo.candidates[candidateId].yes_votes, party: distInfo.candidates[candidateId].party  };
                            }    
                        } //close inner nested for/if loop

  el.attr('class', 'ushouse ' + max.party);

      } //close outer for loop


  } // close ushouse function

  }; // end update


// var for 
mapData = {};
function setData (error, feed_data) {
theMap.init();
  

test = feed_data;

 var timeBox = $('#time');
var lu = " <i>Last Updated: " + test.last_updated + "</i>";
// console.log(lu)
timeBox.html(lu);
  // time.html(lu)

mapData = {
  mosenate: test.races['State Senate'],
  mohouse: test.races['State House'],
  ushouse: test.races['US Representative'],
  ca2: test.races['Ballot Issues']['Constitutional Amendment 2'],
  ca3: test.races['Ballot Issues']['Constitutional Amendment 3'],
  ca6: test.races['Ballot Issues']['Constitutional Amendment 6'],
  ca10: test.races['Ballot Issues']['Constitutional Amendment 10'],
  audit: test.races['State of Missouri']['State Auditor'],
};

}; //close setData




var theMap = {

  init: function () {

    queue ()

          .defer(d3.json, "data/mo_topo_county.json")
          .defer(d3.json, "data/mo_topo_house.json")
          .defer(d3.json, "data/mo_topo_uscongress.json")
          .defer(d3.json, "data/mo_topo_senate.json")
.await(theMap.drawMap);

}, //close theMap.init

drawMap: function (error, mo_county, mo_house, us_congress, mo_senate) {

console.log(mo_county);
// console.log(mo_house);
// console.log(mo_senate);
// console.log(us_congress);



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
    .attr('id', function(d){return 'fips' + d.properties.COUNTYFP})
    .attr("class", function(d) { return "county "; })
    .attr("d", path)
    .on("mouseover",infoBoxUpdates[currView])
    .on("mouseout",infoBoxUpdates.clear);



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
    .enter().append("path")
    .attr('id', function(d){return 'MHDistrict_' + d.properties.DISTRICT})
    .attr("class", function(d) { return "mohouse" })
    .attr("d", path)
    .on("mouseover",infoBoxUpdates[currView])
    .on("mouseout",infoBoxUpdates.clear);

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
    // strips out the "state senate" from the ID to match the data feed
    .attr('id', function(d){var x = d.properties.NAMELSAD; var x = x.replace('State Senate ', ''); return 'MS'+x.replace(/ /,'_');})
    .attr("class", function(d) { return "mosenate"})
    .attr("d", path)
    .on("mouseover",infoBoxUpdates[currView])
    .on("mouseout",infoBoxUpdates.clear);

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
    .attr('id', function(d){ var x = d.properties.CD113FP; return 'USDistrict_' + x.replace(/0/,'');})
    .attr("class", function(d) { return "ushouse"; })
    .attr("d", path)
    .on("mouseover",infoBoxUpdates[currView])
    .on("mouseout",infoBoxUpdates.clear);

mapCongress.append("path")
    .datum(topojson.mesh(us_congress, us_congress.objects.mo_congress, function(a, b) { return a !== b; }))
    .attr("d", path)
    .attr("class", "ushouse-edges");


 $(".loading").hide();
  $(".my-map svg").fadeIn();
update[currView](mapData[currView]);
    infoBoxUpdates[currView];

} //close theMap.drawMap









} //close theMap

})(jQuery);


// Buttons! change view-state to active on click 
//########################################
// ##### also triggers the UPDATE ######
//########################################

function setNav () {


    $(".btn.view-state").on("click", function() {
        currView = $(this).attr("val");
    infoBoxUpdates[currView];

    $(".btn.view-state").removeClass("active");
    $(this).addClass("active");


    if (currView === "audit" || currView === "ca2" || currView === "ca3" || currView === "ca6"|| currView === "ca10") {
    update[currView](mapData[currView]);
    d3.selectAll(".mohouse, .mosenate, .ushouse")
    .style("visibility", "hidden");
    d3.selectAll(".county").style("visibility", "visible");
    } else if (currView === "mohouse") {
    update[currView](mapData[currView]);
    d3.selectAll(".ushouse, .mosenate, .county")
    .style("visibility", "hidden");
    d3.selectAll(".mohouse").style("visibility", "visible");
    } else if (currView === "mosenate") {
    update[currView](mapData[currView]);
    d3.selectAll(".mohouse, .ushouse, .county")
    .style("visibility", "hidden");
    d3.selectAll(".mosenate").style("visibility", "visible");
    } else if (currView === "ushouse") {
    update[currView](mapData[currView]);
    d3.selectAll(".mohouse, .mosenate, .county")
    .style("visibility", "hidden");
    d3.selectAll(".ushouse").style("visibility", "visible");

}
});

};

