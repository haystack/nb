const {createClass} = require('./services');

const sequelize = require('../models');

describe('Test /api/classes', () =>{
  beforeAll(async () => {
    await sequelize.drop();
  });
  
  test('Creating a class should create a global section as well', async () =>{
    const nb_class = {name: 'test'};
    const response = await createClass(nb_class);
    expect(response.statusCode).toBe(200);
  });
})