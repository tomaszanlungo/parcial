d3.dsv(';', '../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

    const cant_canal = d3.rollup(data, v => v.length, d => d.canal);
    const data2 = Array.from(cant_canal, ([canal, cantidad]) => ({ canal, cantidad }));
    const total = d3.sum(data2, d => d.cantidad);
    const porcentajes = data2.map(d => ({ canal: d.canal, porcentaje: d.cantidad / total }));
  
    let chart = Plot.plot(porcentajes,{
      width: 600,
      height: 400,
      color: "Blues",
      marks: [
        {
          type: "arc",
          data: porcentajes,
          x: { signal: "width / 2" },
          y: { signal: "height / 2" },
          outerRadius: { signal: "height / 4" },
          fill: { field: "canal", scale: "color" },
          stroke: "white",
          strokeWidth: 2,
          tooltip: true,
          encode: {
            enter: {
              angle: { field: "porcentaje", signal: "2 * PI * datum.porcentaje" },
              startAngle: { signal: "0" },
              endAngle: { field: "porcentaje", signal: "2 * PI * datum.porcentaje" },
              tooltip: { signal: "datum.canal + ': ' + (datum.porcentaje * 100).toFixed(2) + '%'" },
            },
          },
        },
      ],
      signals: [{ name: "PI", value: Math.PI }],
    });
    d3.select('#chart_2').append(() => chart)
});
  



