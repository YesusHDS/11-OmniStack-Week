const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.use(routes)


// Rota é o url completo
// Recurso, é o parâmetro do URL q define oq será apresentado
// Exemplo: o '/' colocado no get, define o recurso que apresentará a função dele

app.listen(3333)