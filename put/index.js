const People = require('./schema')


exports.handler = async (event) => {
    try {
        const id = event.pathParameters ? event.pathParameters.id : null;
        const { name } = JSON.parse(event.body);
        let item;
        if (id) {
            await People.update({
                'id': id
            },
                {
                    'name': name
                })
            item = await People.query('id').eq(id).exec();
            item = item[0];
        } else {
            return 'no id was entered';
        }
        return {
            statusCode: 200,
            body: JSON.stringify(item)
        }
    } catch (err) {
        return {
            statusCode: 500,
            err: err.message
        }
    }
}