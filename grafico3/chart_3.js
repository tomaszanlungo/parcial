// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})

d3.dsv(';',  '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

  let dataPalermo = data.filter(d => d.domicilio_barrio == "PALERMO");
  let dataCaballito = data.filter(d => d.domicilio_barrio == "CABALLITO");
  
  let cant_autos_palermo = d3.rollup(dataPalermo, v => v.length, d => d.hora_ingreso);
  let dataPalermo2 = Array.from(cant_autos_palermo).map(([key, value]) => {
      return {
          'hora_ingreso': key,
          'cantidad': value,
          'domicilio_barrio': 'PALERMO'
      }
  });

  let cant_autos_caballito = d3.rollup(dataCaballito, v => v.length, d => d.hora_ingreso);
  let dataCaballito2 = Array.from(cant_autos_caballito).map(([key, value]) => {
      return {
          'hora_ingreso': key,
          'cantidad': value,
          'domicilio_barrio': 'CABALLITO'
      }
  });

  let data2 = dataPalermo2.concat(dataCaballito2);


  // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
       x: {
         type: 'time',
         tickFormat: d3.timeFormat('%H'),
       },
        y: { 
          grid: true,
          label: 'cantidad ',
      },
      
      marks: [
        Plot.dot(data2, 
          Plot.binX(
            { y: 'count', title: d => d[0].hora_ingreso},
            {
              //fill: "domilicio_barrio", 
              //r: "cantidad", title: d => d.cantidad,
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
      facet:{
        data: data2,
        x: 'domicilio_barrio',
      },

    });

 /* Agregamos al DOM la visualización chartMap */
 d3.select('#chart_3').append(() => chart)
    
});


