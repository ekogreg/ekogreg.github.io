/* 
  GETTING DATA USING GOOGLE SHEETS API V4
    
  *API Key
  AIzaSyDYmEIzm5sd4eLssm6GOzB5LTmh7A8XGdw
  Created here
  https://console.cloud.google.com/apis/credentials
 
  *Have to activate the API Project
  https://console.cloud.google.com/apis/api/sheets.googleapis.com/overview?project=leaderboard-app&folder=&organizationId=
  
  var url = 'https://sheets.googleapis.com/v4/spreadsheets/'+worksheet_id+'/values/'+tab_name+'?alt=json&key='+key-value;
  
*/
$(document).ready(function() {
  
  
  getSpreadsheetData();
  
  setInterval(function() {
    getSpreadsheetData();
  }, 20000);

  
  function getSpreadsheetData() {

    // Spreadsheet URL: https://docs.google.com/spreadsheets/d/18BqLsBCJ38B3rNQG93gIyShhaSXyuI1Vobbel-tZzj0

    /* sheetID: Pull this from Google Sheet */
    var sheetID = "18BqLsBCJ38B3rNQG93gIyShhaSXyuI1Vobbel-tZzj0";
    var tab_name = "Sheet1";
    var apiKey = "AIzaSyDYmEIzm5sd4eLssm6GOzB5LTmh7A8XGdw";
    var sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/"+ sheetID +"/values/"+tab_name+"?alt=json&key=" + apiKey;  
    var entry;
    console.log(sheetUrl);
    $.getJSON(sheetUrl, function(data) {
      console.log(data);
      entry = data.values;

      var names = "";
      names += `<ul class="leaderboard-table">`;
      names += ``;
      $(entry).each(function(index) {
        if(index > 0){
          names += `<li class="person" data-position="${this[2]}">
          <div class="rank"></div>
          <div class="name">${this[0]}</div>
          <div class="score">${this[2]}</div>
          </li>`; 
        }
      });
      names += `</ul>`;
      console.log("Loading the data");
            
      setTimeout(function () {  

        /* Reorders list based on score */
        $(".leaderboard-table").each(function(){
          $(this).html($(this).children('li').sort(function(a, b){
            return ($(b).data('position')) > ($(a).data('position')) ? 1 : -1;
          }));
        });
        
        document.querySelectorAll("#leaderboard .rank").forEach(
          (el, i) => el.innerHTML = (i + 1)
        )  
        
        /* Breaks list into multiple sections */
        var UL = $('#leaderboard ul'),
          topThree = UL.find('li:gt(2)'),
          topFifty = $('<div>').attr('id', 'top-3');
        UL.before(topFifty);
        if (topThree.length) {
          topFifty.after($('<div>').attr('id', 'top-50').append($('<ul>').append(topThree)));
        }
        topFifty.append(UL);      

        /* Adds medals to Top 3 */
        $("#top-3 li:nth-of-type(1) .rank").html('🥇');
        $("#top-3 li:nth-of-type(2) .rank").html('🥈');
        $("#top-3 li:nth-of-type(3) .rank").html('🥉');
          
        console.log("Sorting the data");
      }, 0);      
      
      $("#leaderboard").html(names);
      console.log("Displaying the data");
      
    });

  }
  

});