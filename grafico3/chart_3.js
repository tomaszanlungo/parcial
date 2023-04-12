
const data = d3.dsv(';', '../data/147_vehiculos_mal_estacionados.csv', d3.autoType)

  
/* Agrupamos reclamos x barrio */
const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
console.log('reclamosPorBarrio', reclamosPorBarrio)

console.log(reclamosPorBarrio)

// Configuración del gráfico
var margin = { top: 50, right: 50, bottom: 50, left: 50 };
var width = 500 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var radius = 5;
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Crear el elemento SVG
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Obtener los valores únicos de los barrios y las horas
var barrios = d3.set(data.map(function(d) { return d.domicilio_barrio; })).values();
var horas = d3.set(data.map(function(d) { return d.hora_ingreso; })).values();

// Configurar las escalas para los ejes x e y
var x = d3.scalePoint()
  .domain(horas)
  .range([0, width]);

var y = d3.scalePoint()
  .domain(barrios)
  .range([0, height]);

  // Configurar la escala para el tamaño de los círculos
  var size = d3.scaleLinear()
  .domain([0, d3.max(reclamosPorBarrio, function(d) { return d[1]; })])
  .range([0, 2 * radius]);

// Dibujar los círculos
svg.selectAll("circle")
.data(data)
.enter().append("circle")
.attr("cx", function(d) { return x(d.hora); })
.attr("cy", function(d) { return y(d.barrio); })
.attr("r", function(d) { return size(reclamosPorBarrio); })
.style("fill", "blue");


 /* Agregamos al DOM la visualización chartMap */
 d3.select('#chart_3').append(() => chartMap)



