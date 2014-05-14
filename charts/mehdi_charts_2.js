// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);      

var file = "final.csv";
var notice = "You cannot display these data on the electoral level, you will be redirected to the administrative level";
var append_results = "Parties Results";
var append_electoral = "Electoral Data";
var append_socio = "Socio-Economic Data";



function drawChart() {
   var line = 1;
   var lvl = 1;
   var order = 1;
   var selectt = 1;

   

   if(document.URL.indexOf("charts_fr") > -1) {
      file ="final_fr.csv";
      notice = "Ces donnees ne peuvent pas etre affichees au niveau electoral, vous allez etre rediriges vers le niveau administratif";
      append_results = "Resultats des partis";
      append_electoral = "Donnees Electorales";
      append_socio = "Donnees Socio-economiques";
   }
   else if(document.URL.indexOf("charts_ar") > -1) {
      file ="final_ar.csv";
      notice = "Ces donnees ne peuvent pas etre affichees au niveau electoral, vous allez etre rediriges vers le niveau administratif";
      append_results = "نتائج الأحزاب";
      append_electoral = "معطيات إنتخابية";
      append_socio = "معطيات إجتماعية و إقتصادية";
   }

   // grab the CSV
   $.get(file, function(csvString) {
   
   // transform the CSV string into a 2-dimensional array
   var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
   
   // this new DataTable object holds all the data
   var data = new google.visualization.arrayToDataTable(arrayData);


   //format data as percentages
   var formatter = new google.visualization.NumberFormat({pattern:'#.00%'});
   formatter.format(data, 1);
   formatter.format(data, 2);
   formatter.format(data, 3);
   formatter.format(data, 4);
   formatter.format(data, 5);
   formatter.format(data, 6);
   formatter.format(data, 7);
   formatter.format(data, 8);
   formatter.format(data, 9);
   formatter.format(data, 10);
   formatter.format(data, 11);
   formatter.format(data, 12);
   formatter.format(data, 13);
   formatter.format(data, 14);
   formatter.format(data, 15);
   formatter.format(data, 16);
   formatter.format(data, 17);
   formatter.format(data, 18);
   formatter.format(data, 19);
   formatter.format(data, 20);
   formatter.format(data, 21);
   formatter.format(data, 22);
   formatter.format(data, 25);

   // set the default view
   var view = new google.visualization.DataView(data);
   
   view.setRows(data.getFilteredRows([{column: 24, minValue: 1}]));
   var dataGov = view.toDataTable();

   view.setRows(data.getFilteredRows([{column: 24, maxValue: 1}]));
   var dataCirc = view.toDataTable();

   var viewGov = new google.visualization.DataView(dataGov);
   var viewCirc = new google.visualization.DataView(dataCirc);

   var NewData = [0,1];

 
   // use arrayData to load the select elements with the appropriate options
   $('<optGroup/>').attr('label',append_results).appendTo($("#simple2"));
   for (var i = 1; i < 6; i++) {
      $("#simple2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}
      $("#simple2").append("<option value='" + 25 + "'>" + arrayData[0][25] + "</option");

   $('<optGroup/>').attr('label',append_electoral).appendTo($("#simple2"));
   for (var i = 6; i < 14; i++) {
      $("#simple2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}

   $('<optGroup/>').attr('label',append_socio).appendTo($("#simple2"));
   for (var i = 14; i < 23; i++) {
      $("#simple2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}
   

   // determine default selected items
   var selectt = 1;
   for (var i = 1; i < 6; i++) {
      if (i == selectt) continue;
      $("#jeux2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
      } 
      $("#jeux2").append("<option value='" + 25 + "'>" + arrayData[0][25] + "</option>");

      $("#jeux2").attr("size",$("#jeux2 option").length);



   viewGov.setColumns(NewData);
   viewCirc.setColumns(NewData);

   //set the Charts options
   var options = {'title': data.getColumnLabel(1),
                  'width':'100%',
                  'height':'300',
                  'curveType': 'function',
                  'pointSize' : 5,
                  'vAxis':{gridlines:{count:-1},
                           baseline:0,
                           format:'#,###%'
                           }            
                  };

   //update the chart
   var chart ;
   chart = new google.visualization.LineChart(document.getElementById('chart2'));
   chart.draw(viewGov, options);

   /*if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart'));
   else chart = new google.visualization.LineChart(document.getElementById('chart'));
   //draw the chart
   chart.draw(viewGov, options);*/

   //listener on select change
   $("#simple2").change(function(){

      // determine selected item and show the multiple select
      selectt = +$("#simple2 option:selected").val();

      document.getElementById('level2').style.display = 'inline';
      if (selectt == cste.Eligible || selectt >= cste.Youth && selectt != 25)
      {
         if (lvl == cste.lvl_circ)
            alert(notice);
         lvl = cste.lvl_gov;
         document.getElementById('level2').selectedIndex = 1;
         document.getElementById('level2').value = 1;
         document.getElementById('level2').style.display = 'none';
      }


      document.getElementById('jeux2').style.display = 'inline';
      

      NewData = [0,selectt];
      $("#jeux2").empty();
      

      if (selectt < 6)
      {
         for (var i = 1; i < 6; i++) {
            if (i == selectt) continue;
            $("#jeux2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
            } 
            $("#jeux2").append("<option value='" + 25 + "'>" + arrayData[0][25] + "</option");
            $("#jeux2").attr("size",$("#jeux2 option").length);
      }

      else if (selectt == 25)
         {
         for (var i = 1; i < 6; i++) {
            
            $("#jeux2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
            } 
            
            $("#jeux2").attr("size",$("#jeux2 option").length);
      }

      else if (selectt < 10 && selectt > 6) 
      {
         for (var i = 7; i < 10; i++) {
         if (i == selectt) continue;
         $("#jeux2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
         } 
         $("#jeux2").attr("size",$("#jeux2 option").length);
      }

      else if (selectt < 12 && selectt > 9) 
      {
         for (var i = 10; i < 12; i++) {
         if (i == selectt) continue;
         $("#jeux2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
         } 
         $("#jeux2").attr("size",$("#jeux2 option").length);
      }

      else if (selectt == 14 || selectt == 6) 
      {
         
         if (selectt == 6) $("#jeux2").append("<option value='" + 14 + "'>" + arrayData[0][14] + "</option");
         else $("#jeux2").append("<option value='" + 6 + "'>" + arrayData[0][6] + "</option");
         
         $("#jeux2").attr("size",1);
      }


      else if (selectt < 18 && selectt > 14) 
      {
         for (var i = 15; i < 18; i++) {
         if (i == selectt) continue;
         $("#jeux2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
         } 
         $("#jeux2").attr("size",$("#jeux2 option").length);
      }

      else if (selectt < 22 && selectt > 17) 
      {
         for (var i = 18; i < 22; i++) {
         if (i == selectt) continue;
         $("#jeux2").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
         } 
         $("#jeux2").attr("size",$("#jeux2 option").length);
      }

      else  document.getElementById('jeux2').style.display = 'none';



      // update the view
      viewGov.setColumns(NewData);
      viewCirc.setColumns(NewData);
      var tit = "" + data.getColumnLabel(selectt);
      for (var i = 2; i < NewData.length; i++) 
      {
         tit += " / " + data.getColumnLabel(NewData[i]);
      }
      options.title = tit;
      
      // update the chart
      if (line == 2) 
         chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
      else 
         chart = new google.visualization.LineChart(document.getElementById('chart2'));
      

      //get the right order
   if (order == 2)
   {
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: false}));
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: false}));
   }
   
   else if (order == 3)
   {  
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: true})); 
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: true}));
   }
   else{ //use the district_id column (23) to sort the data as the ISIE did it
   viewGov.setRows(dataGov.getSortedRows({column: 23}));
   viewCirc.setRows(dataCirc.getSortedRows({column: 23}));
   }


      //draw the chart
      if (lvl == 1)
      chart.draw(viewGov, options);
      else chart.draw(viewCirc, options);
      
   });

 


   // set listener for the "multiple select" changes
   $("#jeux2").change(function(){

      var Choices = document.getElementById("jeux2");
      NewData = [0,selectt];

      for(i=0;i<Choices.options.length;i++)
      { 
         if (Choices.options[i].selected)
         {NewData.push(parseInt(Choices.options[i].value));}
      }
         
      // update the view and the title
      viewGov.setColumns(NewData);
      viewCirc.setColumns(NewData);
      tit = "" + data.getColumnLabel(selectt);
      for (var i = 2; i < NewData.length; i++) 
      {tit += " / " + data.getColumnLabel(NewData[i]);}
      options.title = tit;
      
      // update the chart
      if (line == 2) 
         chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
      else 
         chart = new google.visualization.LineChart(document.getElementById('chart2'));
      
      //get the right order
   if (order == 2)
   {
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: false}));
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: false}));
   }
   
   else if (order == 3)
   {  
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: true})); 
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: true}));
   }
   else{ //use the district_id column (23) to sort the data as the ISIE did it
   viewGov.setRows(dataGov.getSortedRows({column: 23}));
   viewCirc.setRows(dataCirc.getSortedRows({column: 23}));
   }

      //draw the chart
      if (lvl == 1)
      chart.draw(viewGov, options);
      else chart.draw(viewCirc, options);
   });

   

   //switcher line to bar
   $("#switch2").change(function(){
   
      line = +$("#switch2 option:selected").val();
      
      // update the chart
      if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
      else chart = new google.visualization.LineChart(document.getElementById('chart2'));
      

      //get the right order
   if (order == 2)
   {
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: false}));
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: false}));
   }
   
   else if (order == 3)
   {  
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: true})); 
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: true}));
   }
   else{ //use the district_id column (23) to sort the data as the ISIE did it
   viewGov.setRows(dataGov.getSortedRows({column: 23}));
   viewCirc.setRows(dataCirc.getSortedRows({column: 23}));
   }

      //draw the chart
      if (lvl == 1)
      chart.draw(viewGov, options);
      else chart.draw(viewCirc, options);
      
   });

   $("#sort2").change(function()
   {
      order = +$("#sort2 option:selected").val();

       if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
      else chart = new google.visualization.LineChart(document.getElementById('chart2'));
      

      //get the right order
   if (order == 2)
   {
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: false}));
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: false}));
   }
   
   else if (order == 3)
   {  
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: true})); 
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: true}));
   }
   else{ //use the district_id column (23) to sort the data as the ISIE did it
   viewGov.setRows(dataGov.getSortedRows({column: 23}));
   viewCirc.setRows(dataCirc.getSortedRows({column: 23}));
   }

      //draw the chart
      if (lvl == 1)
      chart.draw(viewGov, options);
      else chart.draw(viewCirc, options);
   });


   $("#level2").change(function()
   {
      lvl = +$("#level2 option:selected").val();
       if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart2'));
      else chart = new google.visualization.LineChart(document.getElementById('chart2'));
      

      //get the right order
   if (order == 2)
   {
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: false}));
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: false}));
   }
   
   else if (order == 3)
   {  
   viewGov.setRows(dataGov.getSortedRows({column: selectt, desc: true})); 
   viewCirc.setRows(dataCirc.getSortedRows({column: selectt, desc: true}));
   }
   else{ //use the district_id column (23) to sort the data as the ISIE did it
   viewGov.setRows(dataGov.getSortedRows({column: 23}));
   viewCirc.setRows(dataCirc.getSortedRows({column: 23}));
   }

      //draw the chart
      if (lvl == 1)
      chart.draw(viewGov, options);
      else chart.draw(viewCirc, options);

      
   });

   });
}