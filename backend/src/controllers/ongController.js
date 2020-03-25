const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
    async index(request,response) {
        const ongs = await connection('ongs').select('*')
    
        return response.json(ongs)
    },

    async create(request,response){
        const {name, email, whatsapp, city, uf} = request.body
        const id = crypto.randomBytes(4).toString('HEX')
    
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        }) // essa função de rota foi transformada em assincrona (async) e foi colocado um await antes do insert, para só dar resposta depois que o insert terminar
    
        return response.json({id})      
    }
}
