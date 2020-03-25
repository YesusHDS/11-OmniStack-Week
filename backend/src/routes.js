const express = require('express')
const routes = express.Router()
const ongController = require('./controllers/ongController.js')
const incidentController = require('./controllers/incidentController.js')
const profileController = require('./controllers/profileController.js')
const sessionController = require('./controllers/sessionController')

// routes.post('/ongs', (request, response) => {
//     // const id = request.params
//     // const params = request.query
//     // console.log(id)
//     // console.log(params)
//     const body = request.body
//     console.log(body)

//     //return response.send('<h1>OLÁ MUNDO!</h1>')
//     return response.json({
//         evento: 'Semana Omnistack 11.0',
//         nome: 'YesusHDS',
//         idade: 16
//     })
// })

routes.post('/sessions', sessionController.create) // utiliza post, pois a intenção é criar uma sessão

routes.get('/ongs', ongController.index)
routes.post('/ongs', ongController.create)

routes.get('/profile', profileController.index)

routes.get('/incidents', incidentController.index)
// routes.get('/incidents/test', incidentController.listIncidents)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', incidentController.delete)


module.exports = routes