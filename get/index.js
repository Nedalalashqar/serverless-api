const People = require('./schema')


exports.handler = async (event) => {
    try {
        const id = event.pathParameters ? event.pathParameters.id : null;
        let item;
        if (id) {
            item = await People.query('id').eq(id).exec();
            item = item[0];

        } else {
            item = await People.scan().exec();
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
