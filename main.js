var allData = []

//Draw bar chart
function setUpCanvas(){

    var margin = {"top":20, "right":20, "bottom":30, "left":40};

    var canvas = d3.select("body")
                    .append("svg")
                    .attr("width",1000)
                    .attr("height",500)
                    .attr("margin", margin)
                    .style("border", "1px solid black")
    
    var width = canvas.attr("width") - margin.left - margin.right;
    var height = canvas.attr("height") - margin.top - margin.bottom;

    var xScale = d3.scaleLinear() //esala solo en pantalla
                    .domain([0,allData.length])
                    .range([0,width])

    var max_y = d3.max(allData,function(d) {return +d.cantidad});

    var yScale = d3.scaleLinear() //esala solo en pantalla
                    .domain([0,max_y])
                    .range([height,0]);

    var chartGroup = canvas.append("g") //agrupación de cosas para cambiar las características
                            .attr("transform","translate(" +margin.left + 
                            "," + margin.top + ")");

    var x_axisGroup = chartGroup.append("g")
                                .attr("transform","translate(0," +height+")")
                                .call(d3.axisBottom(xScale).ticks());

    var y_axisGroup = chartGroup.append("g")
                                .call(d3.axisLeft(yScale).ticks());

    var barsPlot = chartGroup.selectAll(".bar")
                            .data(allData)
                            .enter()
                            .append("rect")
                            .attr("class","bar")
                            .attr("x", function(d,i) {return xScale(i)})
                            .attr("y",function(d) {return yScale(d.cantidad)})
                            .attr("width", 40)
                            .attr("height",function(d,i) {return height - yScale(d.cantidad);});
    console.log(allData.length)                                
    console.log(allData)

}

//Convert data
function conversor(d){
    //los datos estan como: d.estacion, d.fruta, d.cantidad
    d.cantidad = +d.cantidad; //Castea el texto a entero
    delete d.estacion; //ejemplo de borrar campo
    d.color = "125"; //ejemplo de creación de campo
    
    return d;
}

// Load data
function loadData(){
    d3.csv("/data/jugo.csv",function(data){
    //console.log(data); //muestra los datos en consola
    allData.push(conversor(data))    //devuelve una linea de los datos
    }).then(function(){
        //para desatar varios eventos
        console.log("Data loaded")
        setUpCanvas();
    }); 

}
// Open data file
$(document).ready(loadData) //referencia a toda la página y verifica si cargó 
