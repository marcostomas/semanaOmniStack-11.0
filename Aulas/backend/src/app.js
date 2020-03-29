// Importa as funcionalidades do express
const express = require('express')
/* 
Se faz necessário o uso do './', pois o programa entenderia routes como um pacote, 
como o express é, mas não como uma arquivo, o que ele é de verdade
*/
//'./' indica que está na mesma pasta do arquivo index.js
const routes = require('./routes')
const cors = require('cors')
const { errors } = require('celebrate')

// Inicia a aplicação
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())
module.exports = app