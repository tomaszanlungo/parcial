const mapaFetch = d3.json('../data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', '../data/147_vehiculos_mal_estacionados.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  /* Agrupamos reclamos x barrio */
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio) // crea un Map
  console.log('reclamosPorBarrio', reclamosPorBarrio)

  
  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(d => {
    let nombreBarrio = d.properties.BARRIO
    let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
    d.properties.DENUNCIAS = cantReclamos

    console.log(nombreBarrio + ': ' + cantReclamos)
  })


  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 7,
      scheme: 'Blues',
      label: 'Cantidad de denuncias',
      legend: true,
      width: 350,
      height: 62,
    
    },
    width: 500,
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.DENUNCIAS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "black",
          stroke: "white",
          fontSize: 11,
          dx: -3,
          filter: (d) => d.properties.DENUNCIAS > 400 //solo muestro el nombre de los barrios con denuncias mayores a 80
        }),{
          style: {
            "font-size": "24px", // Establecer el tamaño de fuente en 24px
            "font-weight": "bold" // Hacer el texto más grueso
          }
        }
      )
    ],
    
  })

  /* Agregamos al DOM la visualización chartMap */
  d3.select('#chart_1').append(() => chartMap)
})
