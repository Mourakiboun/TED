// load the visualization library from Google and set a listener
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);      

var cste = { 
'District_NAME':0,
'NAHDHA':1,
'ARIDHA':2,
'ETTAKATOL':3,
'CPR':4,
'PDP':5,
'Eligible':6,
'Blank':7,
'Cancelled':8,
'Wasted':9,
'Actively_Registered ':10,
'Passively_Registered ':11,
'Actively_Turnout':12,
'Passively_Turnout':13,
'Youth':14,
'Mobile':15,
'Computer':16,
'Internet':17,
'Unemployment ':18,
'Illiteracy':19,
'Higher Education':20,
'Secondary_Education':21,
'Unemployment_Education':22,
'District_ID':23,
'isGovernorate':24,

'lineChart':1,
'barChart':2,

'ord_desc':3,
'ord_asc':2,
'ord_regi':1,

'lvl_gov':1,
'lvl_circ':2

 };


var selected = cste.NAHDHA;
var line = cste.lineChart;
var order = cste.ord_regi;
var lvl= cste.lvl_gov;

var data;
var chart;
var options;

var viewGov;
var viewCirc;

var dataGov;
var dataCirc;


function formatData()
{
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
}


function defaultAppendOptions(arrayData)
{
	// use arrayData to load the select elements with the appropriate options
   $('<optGroup/>').attr('label',"Parties Results").appendTo($("#first_select"));
   for (var i = cste.NAHDHA; i <= cste.PDP; i++) {
      $("#first_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}
      $("#first_select").append("<option value='" + 25 + "'>" + arrayData[0][25] + "</option>");

   $('<optGroup/>').attr('label',"Election Data").appendTo($("#first_select"));
   for (var i = cste.Eligible; i <= cste.Passively_Turnout; i++) {
      $("#first_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}

   $('<optGroup/>').attr('label',"Socio-Economic Data").appendTo($("#first_select"));
   for (var i = cste.Youth; i <= cste.Unemployment_Education; i++) {
      $("#first_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}
   

   // determine default selected items
   for (var i = cste.NAHDHA; i <= cste.PDP; i++) {
      if (i == selected) continue;
      $("#second_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
      }
      $("#second_select").append("<option value='" + 25 + "'>" + arrayData[0][25] + "</option");

     


      $("#second_select").attr("size",$("#second_select option").length);

}

function appendOptions(arrayData)
{
	if (selected < 6)
	{
		for (var i = cste.NAHDHA; i <= cste.PDP; i++) 
		{
			if (i == selected) continue;
			$("#second_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
		}
		 $("#second_select").append("<option value='" + 25 + "'>" + arrayData[0][25] + "</option>");
		$("#second_select").attr("size",$("#second_select option").length);
	}

	 else if (selected == 25) 
	 {
      	for (var i = cste.NAHDHA; i <= cste.PDP; i++) 
      		{$("#second_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");}
      	$("#second_select").attr("size",$("#second_select option").length);
     }


	else if ( selected == cste.Blank || selected == cste.Cancelled || selected ==cste.Wasted) 
	{
		for (var i = cste.Blank; i <= cste.Wasted; i++) 
		{
			if (i == selected) continue;
			$("#second_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
		}

		$("#second_select").attr("size",$("#second_select option").length);
	}

	else if (selected < 12 && selected > 9) 
	{
	for (var i = 10; i < 12; i++) {
	if (i == selected) continue;
	$("#second_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
	} 

	$("#second_select").attr("size",$("#second_select option").length);
	}

	else if (selected == 14 || selected == 6) 
	{

	if (selected == 6) $("#second_select").append("<option value='" + 14 + "'>" + arrayData[0][14] + "</option");
	else $("#second_select").append("<option value='" + 6 + "'>" + arrayData[0][6] + "</option");

	$("#second_select").attr("size",1);
	}


	else if (selected < 18 && selected > 14) 
	{
	for (var i = 15; i < 18; i++) {
	if (i == selected) continue;
	$("#second_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
	}

	$("#second_select").attr("size",$("#second_select option").length);
	}

	else if (selected < 22 && selected > 17) 
	{
	for (var i = 18; i < 22; i++) {
	if (i == selected) continue;
	$("#second_select").append("<option value='" + i + "'>" + arrayData[0][i] + "</option");
	}

	$("#second_select").attr("size",$("#second_select option").length);
	}

	else  document.getElementById('second_select').style.display = 'none';
}

function changeChartType()
{
	if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	else chart = new google.visualization.LineChart(document.getElementById('chart'));
	
	if (lvl == 1) chart.draw(viewGov, options);
	else chart.draw(viewCirc, options);
}

function updateChart(NewColumns)
{
		
	// update the views
	viewGov.setColumns(NewColumns);
	viewCirc.setColumns(NewColumns);

	options.title = "" + data.getColumnLabel(selected);
	for (var i = 2; i < NewColumns.length; i++) 
		options.title += " Versus " + data.getColumnLabel(NewColumns[i]);

	//get the right order
	if (order == 2)
	{
	viewGov.setRows(dataGov.getSortedRows({column: selected, desc: false}));
	viewCirc.setRows(dataCirc.getSortedRows({column: selected, desc: false}));
	}
	
	else if (order == 3)
	{	
	viewGov.setRows(dataGov.getSortedRows({column: selected, desc: true}));	
	viewCirc.setRows(dataCirc.getSortedRows({column: selected, desc: true}));
	}
	else{ //use the district_id column (23) to sort the data as the ISIE did it
	viewGov.setRows(dataGov.getSortedRows({column: 23}));
	viewCirc.setRows(dataCirc.getSortedRows({column: 23}));
	}

	if (line == 2) chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	else chart = new google.visualization.LineChart(document.getElementById('chart'));

	if (lvl == 1) chart.draw(viewGov, options);
	else chart.draw(viewCirc, options);
}


function drawChart() {
   

   // grab the CSV
   $.get("final.csv", function(csvString) {
   
   // transform the CSV string into a 2-dimensional array
   var arrayData = $.csv.toArrays(csvString, {onParseValue: $.csv.hooks.castToScalar});
   
   // this new DataTable object holds all the data
   data = new google.visualization.arrayToDataTable(arrayData);

   //format the Data to human-readable percentages :)
   formatData();
   
   //append the default options to the selects menus
   defaultAppendOptions(arrayData);

   // set the default view
   var view = new google.visualization.DataView(data);
   
   view.setRows(data.getFilteredRows([{column: 24, minValue: 1}]));
   dataGov = view.toDataTable();

   view.setRows(data.getFilteredRows([{column: 24, maxValue: 1}]));
   dataCirc = view.toDataTable();

   viewGov = new google.visualization.DataView(dataGov);
   viewCirc = new google.visualization.DataView(dataCirc);
     

   var NewColumns = [0,1];
   viewGov.setColumns(NewColumns);
   

   //set the Charts options
   options = {'title': data.getColumnLabel(1),
                  'width':'100%',
                  'height':'300',
                  'curveType': 'function',
                  'pointSize' : 5,
                  'vAxis':{gridlines:{count:-1},
                           baseline:0,
                           format:'#,###%'
                           }          
                  };

   //Create the chart
	updateChart(NewColumns);

   


   //listener on select change
   $("#first_select").change(function()
   {
      // determine selected item and show an empty multiple select 
      selected = +$("#first_select option:selected").val();
      document.getElementById('level').style.display = 'inline';
      if (selected == cste.Eligible || selected >= cste.Youth && selected != 25)
      {
      	if (lvl == cste.lvl_circ)
      		alert("You cannot display these data on a circonscription level, you will be redirected to the governorate level");
      	lvl = cste.lvl_gov;
      	//document.getElementById('level').selectedIndex = lvl;
      	document.getElementById('level').selectedIndex = 1;
		document.getElementById('level').value = 1;
      	document.getElementById('level').style.display = 'none';

      	
      	
      }
      document.getElementById('second_select').style.display = 'inline';
      $("#second_select").empty();
   
      //append the needed options
      appendOptions(arrayData);

      //update the chart
      NewColumns = [0,selected];
      updateChart(NewColumns);
      
   });

 


   // set listener for the "multiple select" changes
   $("#second_select").change(function(){

      NewColumns = [0,selected];

      var Choices = document.getElementById("second_select");
      
      for(i=0;i<Choices.options.length;i++)
      { 
         if (Choices.options[i].selected)
         { 
            NewColumns.push(parseInt(Choices.options[i].value));
         }
      }
		updateChart(NewColumns);
      });

   

	$("#chart_type").change(function()
	{
		line = +$("#chart_type option:selected").val();
		changeChartType();
	});


	$("#sort").change(function()
	{
		order = +$("#sort option:selected").val();
		updateChart(NewColumns);
	});


	$("#level").change(function()
	{
		lvl = +$("#level option:selected").val();
		updateChart(NewColumns);
	});

   
  });
}