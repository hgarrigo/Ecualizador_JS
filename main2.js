// Dataviz 2019
// Proyecto Ecualizador
// main2.js

var svgwidth = 1200
var svgheight = 500
var padding = 30;
var allData = [];
var data=[];
var margin = {"top":50,"right":20,"left":50,"bottom":150};

// DATA
/*var dataset = [
            [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [600, 150]
          ];
*/
/*
//Dynamic, random dataset
var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
    var newNumber1 = Math.round(Math.random() * xRange);
    var newNumber2 = Math.round(Math.random() * yRange);
    dataset.push([newNumber1, newNumber2]);
		}

*/
//
function setUpCanvas(){

	
	console.log("Carga los primeros datos")
	data = selectToma(1);
	console.log(data.length);
	console.log(data)
	
	var svg = d3.select("#my_dataviz")
				  .append("svg")
				  .attr("width", svgwidth + margin.left + margin.right)
				  .attr("height", svgheight + margin.top + margin.bottom)
				  .append("g")
				  //.style("border", "2px solid black");	
				  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//var width = svg.attr("width") - margin.left - margin.right;
	//var height = svg.attr("height") - margin.top - margin.bottom;

	var rScale = d3.scaleLinear()
				.domain([0, d3.max(data, function(d) { return d.Value; })])//.domain([0, d3.max(dataset, function(d) { return d[1]; })])
				.range([2, 10]);

	var xScale = d3.scalePoint()
	  			 .padding(0.1)
				 .domain(allData.map( d => { return d.name; })) //.domain([0, d3.max(dataset, function(d) { return d[0]; })])
				 .range([padding, svgwidth - margin.right - padding])//[padding, svgwidth - padding*2]);

	var yScale = d3.scaleLinear()
				 .domain([0, d3.max(data, function(d) { return d.Value; })]) //.domain([0, d3.max(dataset, function(d) { return d[1]; })])
				 .range([svgheight - padding, padding]);

	//Define X axis
	var xAxis = d3.axisBottom()
					  .scale(xScale)
					  .ticks();  //Número aproximado de marcadores

	//Define Y axis
	var yAxis = d3.axisLeft()
					  .scale(yScale)
					  .ticks(25);  //Número aproximado de marcadores

	// Define the div for the tooltip
	var div = d3.select("#my_dataviz")
				.append("div")	
				.attr("class", "tooltip")				
				.style("opacity", 0.8);

	svg.append("g").selectAll("circle")
			  //.data(data)
			  .data(eval(data))
			  .enter()
			  .append("circle")
				.attr("cx", function(d) {return 10 + xScale(d.name);})
				.attr("cy", function(d) {return yScale(d.Value);})
				.attr("r", function(d)  {return rScale(25);})
				.style("stroke", "gray")
				.style("fill", "green")
				.on("mouseover", function(d) {		
					div.transition()		
						.duration(200)		
						.style("opacity", .9);		
					div	.html(d.name + "<br/>" + "Valor:" + d.Value.toFixed(2))	
						.style("left", (d3.event.pageX) + "px")		
						.style("top", (d3.event.pageY - 28) + "px");	
					})					
				.on("mouseout", function(d) {		
					div.transition()		
						.duration(500)		
						.style("opacity", 0);	
				});

	// Create Labels (ver anexo al final)

	//Create X axis			
		svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0 ," + (svgheight - padding) + ")")
				.call(xAxis)
				.selectAll("text")
    			.attr("y", 5)
    			.attr("x", -15)
    			//.attr("dy", ".35em")
    			.attr("transform", "rotate(-90)")
    			.style("text-anchor", "end");
				//.attr("transform", "rotate(-65)" );


	//Create Y axis
			svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + padding + ",0)")
			.call(yAxis);
	// Y axis label:
		svg.append("text")
    		.attr("text-anchor", "end")
    		.attr("transform", "rotate(-90)")
			.attr("y", -margin.left+30)
			.attr("x", -margin.top-120)
			.text("Radiación [cpm]")

		divisiones = svg.selectAll("division")
				.data(data)	
				.enter()
				.append("line")
					.style("stroke-dasharray", "1,1")
					.attr("stroke", "lightgrey")
					.attr("stroke-opacity", 1)
					.attr("y1", yScale.range()[0])
					.attr("y2", yScale.range()[1])
					.attr("x1", function(d) { return 10 + xScale(d.name); })
					.attr("x2", function(d) { return 10 + xScale(d.name); });
		

	function updateChart(toma) {
		// recompute density estimation
		data = selectToma(toma);
		// update the chart
	
		yScale = d3.scaleLinear()
			 	   	.domain([0, d3.max(data, function(d) { return d.Value; })])
					.range([svgheight - padding, padding]);

		yAxis.scale(yScale) 

		svg.select(".y")
				.transition()
				.call(yAxis);
	//----------------------------------------------------
		//xScale = d3.scaleBand()
	  	//		 .padding(0.1)
		//		 .domain(data.map( d => { return d.name; })) 
		//		 .range([padding, svgwidth - margin.right - padding])
		//xScale.domain(data.map( d => { return d.name; }))
		//xAxis.scale(xScale)
		//svg.select(".x")
		//		.transition()
		//		.call(xAxis);

	/*
		d3.selectAll("circle")
			.data(data)
			//.exit()
			//.remove()
			//.enter()
			//.append("circle")
			.transition(500)
			.duration(500)
			//.delay(1000) //function(d, i) { return i * 10; })
			.attr("cx", function(d) {return 10 + xScale(d.name);}) 
			.attr("cy", function(d) { return yScale(d.Value)});
*/
var circulos = svg.select("g").selectAll("circle")
				.data(eval(data))
		console.log("--------->Largo: ", data.length)
		
		circulos.exit().remove();
		circulos.enter().append("circle").attr("r",0);
		circulos.transition(500)
				.duration(500)
				.attr("r",)
				.attr("cx", function(d) {return 10 + xScale(d.name);}) 
				.attr("cy", function(d) { return yScale(d.Value)})
				.attr("r", function(d)  {return rScale(25);})
				.style("stroke", "gray")
				.style("fill", function(d){
					if (d.name.search("Fixed") == -1) {
						return "green"
					}
					else {return "blue"}
				})
				.on("mouseover", function(d) {		
					div.transition()		
						.duration(200)		
						.style("opacity", .9);		
					div	.html(d.name + "<br/>" + "Valor:" + d.Value.toFixed(2))	
						.style("left", (d3.event.pageX) + "px")		
						.style("top", (d3.event.pageY - 28) + "px");	
					})					
				.on("mouseout", function(d) {		
					div.transition()		
						.duration(500)		
						.style("opacity", 0);	
				});

		svg.selectAll(".divide")
			.data(data)
		  	.attr("y1", yScale.range()[0])
		  	.attr("y2", yScale.range()[1])
		  	.attr("x1", function(d) { return 10 +xScale(d.name); })
		  	.attr("x2", function(d) { return 20 +xScale(d.name); });
			
			  console.log(data.length)
		

			}
			
	console.log(allData.length);
	document.getElementById('timestamp').innerHTML = getToma(1);
	 // Listen to the slider?
	d3.select("#mySlider").on("change", function(d){
		selectedValue = this.value;
		console.log("cambio el slider!");
		document.getElementById('timestamp').innerHTML = getToma(selectedValue);
		updateChart(selectedValue);
		});
		updateChart(1)
		
}

//Show data in console *Equivalente a FilterTs(toma)
function selectToma(toma) {
	var arrayToma = allData.filter(allData => allData.id_reading == toma);
	return arrayToma;
	}

function getToma(toma) {
		var out = allData.filter(allData => allData.id_reading == toma)[0].ts;
		console.log(out)
		return out;
	  }

function showData(d){
	//Campos: idSensor,idToma,inicioToma,duracionIntervalo,Maximo,Minimo,Promedio,cantidad,x,y,EsFijo
    //los datos estan como: d.estacion, d.fruta, d.cantidad
    d.idToma = +d.idToma; //Castea el texto a entero
    //delete d.estacion; //ejemplo de borrar campo
    //d.color = "125"; //ejemplo de creación de campo
    
    return d;
}
//Convertir a INT
function formatter(c) {
    c.Value=parseFloat(c.Value);
//    c.ts = Date(c.ts);
    delete c.Lat;
    delete c.Long;
    delete c.Value_disc;
    delete c.Value_disc_order;
    return c;
}

// Load CSV data
function loadData(){
    d3.csv("/data/Sensores_FDM.csv",function(data){
    //console.log(data); //muestra los datos en consola
    allData.push(formatter(data))    //devuelve una linea de los datos
    }).then(function(){
        //para desatar varios eventos
		console.log("Data Sensores loaded")
		//console.log(allData);
        setUpCanvas();
    }); 
}

// Open data file
console.log("Inicio del js.");
$(document).ready(loadData) //referencia a toda la página y verifica si cargó



	// Create Labels
	/*
	textos = svg.selectAll("text")
				.data(dataset)
				.enter()
				.append("text")
				.text(function(d) { 
					return d[0] + "," + d[1];
				})
				.attr("x", function(d) {
					return xScale(d[0]);
				})
			.attr("y", function(d) {
					return yScale(d[1]);
					})
				.attr("font-family", "sans-serif")
				.attr("font-size", "11px")
				.attr("fill", "red");
				*/