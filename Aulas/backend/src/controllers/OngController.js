const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const ongs = await connection('ongs').select('*');
        
        return response.json(ongs);
    },

        async create(request,response) {
        // acessa todos os parâmetros de query
        // Da seguinte forma eu garanto que usuario mandará o dado certo
        const { name, email, whatsapp, city, uf } = request.body;
        
        // Gera 4 bytes de caracteres aleatório e depois converte em string do tipo hexadecimal
        const id = generateUniqueId();

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })

        // Retorna objeto dentro das chaves
        return response.json({ id });
    }
};