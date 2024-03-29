require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
        },
  age: Number,
  favoriteFoods : [String]
  });

let Person = mongoose.model('Person',
 personSchema);

newPerson = { 
  "name": "Scott", 
  "age": 43, 
  "favoriteFoods": ["Pizza","Beer"]
}


const createAndSavePerson = (done) => {
  console.log(newPerson);
  personDoc = new Person({
    name: newPerson.name,
    age: newPerson.age,
    favoriteFoods: newPerson.favoriteFoods
  });
  console.log(personDoc);
  personDoc.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};


arrayOfPeople = [{name: 'Zoe', age: 10, favoriteFoods: ['gummies','dumplings']},
{name: 'Georrgia', age: 12, favoriteFoods: ['chips','mr. noodle']},
{name: 'Jo', age: 43, favoriteFoods: ['chocolate','chips']}]


const createManyPeople = (arrayOfPeople, done) => {
   
    Person.create(arrayOfPeople, function(err,people){
      if (err) console.error(err);
      done(null , people);
    }
      );
};

const findPeopleByName = (personName, done) => {

  Person.find({name: personName}).exec(function(err,results){ 
    if (err) console.error(err);
    done(null , results);
  }
  ); 
};

const findOneByFood = (food, done) => {
  console.log("Search term: " + food);
  Person.findOne({favoriteFoods: food}).exec(function(err,results){ 
    if (err) console.error(err);
    done(null , results);
    
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,person){
    if (err) console.error(err);
  
  done(null , person);
});
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err,person){
    if (err) console.error(err);
    console.log(person.favoriteFoods);
    person.favoriteFoods.push(foodToAdd);
    console.log(person.favoriteFoods);
    person.save(function(err, person) {
      if (err) return console.error(err);
      done(null, person);
    });
  /*done(null , person);*/
});

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
   // Find a person with the provided name and update their age
   Person.findOneAndUpdate(
    { name: personName }, // Find the person with the provided name
    { age: ageToSet }, // Update their age to the provided value
    { new: true }, // Return the updated document
    (err, updatedPerson) => {
        if (err) {
            console.error('Error updating person:', err);
        } else if (!updatedPerson) {
            console.log('Person not found.');
        } else {
            console.log('Updated Person:', updatedPerson);
        }
        done(null, updatedPerson);
        
    }
);



  

};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
