// config. fecha español
d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
  d3.timeFormatDefaultLocale(locale)
})


d3.dsv(';',  '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

  let dataPalermo = data.filter(d => d.domicilio_barrio == "PALERMO");
  let dataCaballito = data.filter(d => d.domicilio_barrio == "CABALLITO");
  let dataVilla = data.filter(d => d.domicilio_barrio == "VILLA URQUIZA");
  
  let cant_autos_palermo = d3.rollup(dataPalermo, v => v.length, d => d.hora_ingreso.split(':')[0] + ':00:00');
  let dataPalermo2 = Array.from(cant_autos_palermo).map(([key, value]) => {
      return {
          'hora_ingreso': key,
          'cantidad': value,
          'domicilio_barrio': 'PALERMO'
      }
  });

  let cant_autos_caballito = d3.rollup(dataCaballito, v => v.length, d => d.hora_ingreso.split(':')[0] + ':00:00');
  let dataCaballito2 = Array.from(cant_autos_caballito).map(([key, value]) => {
      return {
          'hora_ingreso': key,
          'cantidad': value,
          'domicilio_barrio': 'CABALLITO'
      }
  });

  let cant_autos_villa= d3.rollup(dataVilla, v => v.length, d => d.hora_ingreso.split(':')[0] + ':00:00');
  let dataVilla2 = Array.from(cant_autos_villa).map(([key, value]) => {
      return {
          'hora_ingreso': key,
          'cantidad': value,
          'domicilio_barrio': 'VILLA URQUIZA'
      }
  });

  let data2 = dataPalermo2.concat(dataCaballito2).concat(dataVilla2);
  // Definimos la escala de color en función de la cantidad de autos
  
    // let getColor = d => {
    //   let scale = d3.scaleSequential()
    //     .interpolator(d3.interpolateViridis)
    //     .domain([0, d3.max(data2, d => d.cantidad)]);
    //   return scale(d.cantidad);
    // };

  // Guardamos el svg generado en la variable chart
    let chart = Plot.plot({
      marks: [
        Plot.dot(data2, {
          x: 'hora_ingreso',
          y: 'cantidad',
          fill: d => d.cantidad > 30 ? "rgb(8,69,148)" : "rgb(158,202,225)"
        }),
      ],

      x: {
        label: 'Horas',
      },      

      y: { 
        grid: true,
        label: 'Cantidad ',
      },
      facet:{
        data: data2,
        x: 'domicilio_barrio',
        label:'',
      },
      
      grid: true,
      line: true,
      width: 900,
      nice: true,
      
    });

 /* Agregamos al DOM la visualización chartMap */
 d3.select('#chart_3').append(() => chart)
    
});


