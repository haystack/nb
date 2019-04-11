const app = require('../app');
const request = require('supertest-session');
const requestApp = request(app);

async function createClass(fields){ 
    return requestApp
        .post('/api/classes/create')
        .send(fields);
}

module.exports = {createClass};