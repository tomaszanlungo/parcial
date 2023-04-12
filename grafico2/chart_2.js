
//calculamos para cada canal (hora_cierre_contacto - hora_ingreso)

//https://observablehq.com/@observablehq/plot-box?collection=@observablehq/plot









Plot.plot({
  x: {
    grid: true,
    inset: 6
  },
  marks: [
    Plot.boxX(morley, {x: "Speed", y: "Expt"})
  ]
})