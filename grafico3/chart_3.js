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
    
let xTicks = d3.ticks(
  d3.timeParse('%H:%M:%S')('00:00:00'), 
  d3.timeParse('%H:%M:%S')('23:59:59'), 
  d3.timeHour.every(2) // Intervalo de 2 horas
);

let chart = Plot.plot({
  marks: [
    Plot.dot(data2, {
      x: 'hora_ingreso',
      y: 'cantidad',
      x: d => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
      fill: d => d.cantidad > 30 ? "rgb(8,69,148)" : "rgb(158,202,225)"
    }),
  ],

  x: {
    label: 'Horas',
    tickValues: xTicks,
    tickFormat: d3.timeFormat('%H'),
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

  style: {
    fontSize: 13,
  },

   grid: true,
   line: true,
   width: 900,
   nice: true,
});



 /* Agregamos al DOM la visualización chartMap */
 d3.select('#chart_3').append(() => chart)
    
});


