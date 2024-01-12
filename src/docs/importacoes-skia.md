### Importacoes de svgs junto com skia

Usando a biblioteca skia do react native
encontramos encossistencia, pois estamos usando a biblioteca `react-native-svg-transformers`
a solucao foi fazer um script e pegar todos svgs que estao relativos na pasta
`src/ass/assets/Icons/`
e colocar no arquivo out.js, apartir dai pode importar todos svgs quando estivermos a usar o skia, apartir do out.js
