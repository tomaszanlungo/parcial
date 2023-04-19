d3.dsv(';', '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

  const datosPorBarrio = Array.from(d3.group(data, d => d.domicilio_barrio));

  const charts = datosPorBarrio.map(([barrio, datos]) => {
    return Plot.plot({
      title: barrio,
      x: {
        type: 'time',
        tickFormat: d3.timeFormat('%H'),
      },
      y: { 
        grid: true,
        label: 'cantidad ',
      },
      marks: [
        Plot.dot(datos, 
          Plot.binX(
            { y: 'count', title: d => d[0].hora_ingreso},
            {
              x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
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
  });

  const grid = Plot.grid(charts, { columns: 2 });
  d3.select('#chart_3').append(() => grid);
});


