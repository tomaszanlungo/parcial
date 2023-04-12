// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(';',  '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  console.log(data)
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    x: {
      type: 'Hora del dia',
      tickFormat: d3.timeFormat('%H'),
    },
    y: {
      grid: true,
      label: ' Barrios',
    },
    marks: [
      Plot.rectY(
        data,
        Plot.binX(
          { y: 'count', title: d => d[0].hora_ingreso },
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
  })

 /* Agregamos al DOM la visualización chartMap */
 d3.select('#chart_3').append(() => chartMap)
})


