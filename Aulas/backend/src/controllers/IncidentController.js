const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const count = await connection('incidents').count();
        // Retorna o primeiro resultado 
        count[0]

        const incidents = await connection('incidents').select('*')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id')
        // Limita a busca em 5 registros/resultados
        .limit(5)
        .offset((page -1) * 5)
        .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        /* No Insomnia retorna 'X-Total-Count de GET de casos indefinidos,
        pois o windows recomhece os parenteses dentro de count
        */
        response.header('X-Total-Count', count['count (*)']);

        return response.json(incidents);
    },
    
    async create(request, response) {
        // Não passaremos o 'ong_id', por ser um dado sensível. Ele será passado pelos headers
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        // O primeiro valor desse areay será armazenado em uma variável chamada id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        /*
        Coloca-se chaves para vir com o nome da informação junto, 
        E também para o front-end saber que é id
        */
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operation not permited' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};