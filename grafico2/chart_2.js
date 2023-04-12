
//calculamos para cada canal (hora_cierre_contacto - hora_ingreso)

//https://observablehq.com/@observablehq/plot-box?collection=@observablehq/plot

const mapaFetch = d3.json('../data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', '../data/147_vehiculos_mal_estacionados.csv', d3.autoType)
