d3.dsv(';', '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

    const cant_canal = d3.rollup(data, v => v.length, d => d.canal);
    const data2 = Array.from(cant_canal, ([canal, cantidad]) => ({ canal, cantidad }));

    console.log(data2)

    //const total = d3.sum(data2, d => d.cantidad);
    //const porcentajes = data2.map(d => ({ canal: d.canal, porcentaje: d.cantidad / total }));

    var chart = Plot.plot({
      color: {
        domain: ["Pocos", "Muchos"],
        range: ["rgb(8,69,148)", "rgb(255,0,0)"],
        legend: true
      },
      marks: [
      Plot.barX(data2, {y: 'canal',x: 'cantidad', fill: d => d.cantidad > 4000 ? "rgb(255,0,0)" : "rgb(8,69,148)"}),
      Plot.text(data2, {x: "cantidad", y: "canal", text: d => (d.cantidad), dx:+15,fontSize:12}),
      ],
      y: {
          domain: d3.sort(data2, (a, b) => d3.descending(a.cantidad, b.cantidad)).map(d => d.canal),
          label: "",
          },

      x: {
          label:"",
          axis: null,
      },
      height: 300,
      marginLeft: 100,
      marginRight: 50,
      
      
  
     })

    d3.select('#chart_2').append(() => chart)
});
  
