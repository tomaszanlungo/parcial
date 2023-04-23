d3.dsv(';', '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  const cant_canal = d3.rollup(data, v => v.length, d => d.canal);
  const data2 = Array.from(cant_canal, ([canal, cantidad]) => ({ canal, cantidad }));

  // Sumar las cantidades de los últimos tres canales y crear un nuevo objeto para "otros"
  const otros = data2.slice(-3).reduce((acc, curr) => acc + curr.cantidad, 0);

  // Crear un objeto con la propiedad "canal" y la suma de las cantidades de los tres canales
  const otrosObj = { canal: "Otros", cantidad: otros };

  // Reemplazar los últimos tres objetos en data2 con el objeto para "otros"
  data2.splice(-3, 3, otrosObj);

  var chart = Plot.plot({
      color: {
          domain: ["Pocos", "Muchos"],
          range: ["rgb(198,219,239)", "rgb(8,69,148)"],
          legend: true,
      },
      marks: [
          Plot.barX(data2, { y: 'canal', x: 'cantidad', fill: d => d.cantidad > 4000 ? "rgb(8,69,148)" : "rgb(198,219,239)" }),
          Plot.text(data2, { x: "cantidad", y: "canal", text: d => (d.cantidad), dx: +20, fontSize: 12 }),
      ],
      y: {
          domain: d3.sort(data2, (a, b) => d3.descending(a.cantidad, b.cantidad)).map(d => d.canal),
          label: "",
          //titleFont: 14,
      },

      x: {
          label: "",
          axis: null,
      },
      height: 300,
      marginLeft: 100,
      marginRight: 50,

  })

  d3.select('#chart_2').append(() => chart)
});
