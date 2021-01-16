const express = require('express');
const mongoose = require('mongoose');
const Person = require('./models/User')
require('dotenv/config');

const app = express();

mongoose.connect(process.env.dbCollection, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err){
        console.error(err)
    } else {
        console.log('connected to db')
    }
})

app.use(express.json());


//GET request
app.get('/', async(req, res) => {
    try {
        const persons = await Person.find({});
        res.send(persons);
        console.log('persons', persons)
    } catch (error) {
        console.error(error)
    }
});


//POST request
app.post('/', async(req, res) =>{
    const user = new Person({
        name : req.body.name,
        email : req.body.email,
        age : req.body.age
    })
    try {
        userSaved = await user.save();
        res.json(userSaved);
    } catch (error) {
        res.json({message : error})
    }
})


//PUT request
app.put("/:id", async(req, res) => {
    try {
        const modifiedUser = await Person.findOneAndUpdate({_id : req.params.id},
            {$set :{
                name : req.body.name,
                email: req.body.email,
                age: req.body.age
            }},
            {new : true})
            res.json(modifiedUser)
    } catch (error) {
        res.json({message : error})
    }
})


//DELETE request
app.delete("/:id", async(req, res) => {
    try {
        await Person.deleteOne({_id : req.params.id});
        res.send({message : 'user deleted successfully'})
    } catch (error) {
        res.json({message : error})
    }
})

const Port = process.env.Port || 3000;
app.listen(Port, () => console.log(`server ${Port} is running`));