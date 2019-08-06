const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signup = require('./controller/signup');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-aerodynamic-96354',
        user: 'marekwu',
        password: '',
        database: 'smart-brain'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('it is working');

})

app.post('/signin', (req, res) => { signin.handleSignin(res, req, db, bcrypt) })

app.post('/signup', (req, res) => { signup.handleSignup(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImageUpload(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiClarifai(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})