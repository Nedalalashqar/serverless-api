const uuid = require('uuid').v4;

const People = require('./schema')


exports.handler = async (event) => {
    try {
        const id = uuid();
        const { name } = JSON.parse(event.body);
        let recorded = new People({ id, name });
        let newRecorded = await recorded.save();
        return {
            statusCode: 201,
            body: JSON.stringify(newRecorded)
        }
    } catch (err) {
        return {
            statusCode: 500,
            err: err.message
        }
    }
}