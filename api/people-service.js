const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    updatePeople(id, people) {
        //console.log("mon peoplee:"+people)
        //console.log("mon id:"+id)
        const indexpeple = this.peoples.findIndex(
            people => people.id === id
        );
        this.peoples[indexpeple] = people;

        if(indexpeple < 0){
            return Promise.reject('bug id');
        }
        return {isModified: true};     
    }
    
    getPeople(filters) {
       let allPeople = []
       console.log("filtersssssss"+filters)
       console.log("Objeceeeeet:"+Object.keys(filters))
       if(Object.keys(filters).length === 0){
           return this.peoples;
       }else{
           const iPeople = this.peoples.filter(
               people => people[Object.keys(filters)[0]]===filters[Object.keys(filters)[0]]
           );
           console.log("i people"+iPeople)
           return iPeople;
       }   
    }
}
