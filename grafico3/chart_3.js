// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(';',  '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  console.log(data)

var cant_autos = d3.rollup(data, v => v.length, d => d.hora_ingreso)
console.log(cant_autos)
var data2 = Array.from(cant_autos).map(([key, value]) => {
    return {
        'hora_ingreso': key,
        'cantidad': value
    }
})

console.log(data2)


  // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
       x: {
         type: 'time',
         tickFormat: d3.timeFormat('%H'),
       },
        y: {
          grid: true,
          label: 'domicilio_barrio',
      },
      
      marks: [
        Plot.dot(data, {
          y: "domicilio_barrio",
          x: "hora_ingreso",
          //r: "cantidad",
          fill: "prestacion",
          //opacity: 0.5,
          }),
          Plot.rectY(data,
            Plot.binX(
              { x: 'count', title: d => d[0].domicilio_barrio },
              
              {
                // https://github.com/d3/d3-time-format
                x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
                // https://github.com/d3/d3-time#timeHour
                // Agrupamos en intervalo de horas
                thresholds: d3.timeHour,
              },
            ),
          ),
      ],
  
      grid: true,
      line: true,
      nice: true,
      color: {
        legend: true,
      },
    });

 /* Agregamos al DOM la visualización chartMap */
 d3.select('#chart_3').append(() => chart)
});

