const express = require('express');
const HttpStatus = require('http-status-codes');

const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();

const v1 = express.Router();
app.use('/api/v1', v1);

v1.get('/people/:filters', async (request, response) => {
    const filters = request.params.id;
    try {
        const people = await PeopleService.getPeople(filters);
        people ? response.send(people) : response.sendStatus(404);
    } catch(e) {
        response.sendStatus(400);
    }
});

v1.get('/people',  (request, response) => {
    const filters = request.query;
    console.log(filters);
    try {
        const people = peopleService.getPeople(filters);
         response.send(people);
    } catch (error) {
        response.sendStatus(HttpStatus.NOT_FOUND).end(error);
    }
});

v1.put('/people/:id',  (request, response) => {
    const id = parseInt(request.params.id);
    const people = request.body;
    try {
        const result =  peopleService.updatePeople( id, people);
        if (!result.isModified){
            return response.sendStatus(HttpStatus.NOT_FOUND);
        }else{
            response.sendStatus(HttpStatus.OK);
        } 
    } catch (error) {
        response.sendStatus(HttpStatus.NOT_FOUND).end(error);
    }
});

module.exports = app;
