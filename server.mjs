import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.mjs';
import handleSignin from './controllers/signin.mjs';
import handleProfile from './controllers/profile.mjs';
import {handleImage, handleImageUrl} from './controllers/image.mjs';
// import dotenv from 'dotenv';

// dotenv.config();

const postgres = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        // ssl: true,
    },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("it's working!"));

app.post('/signin', handleSignin(postgres, bcrypt));

app.post('/register', handleRegister(postgres, bcrypt));

app.get('/profile/:id', handleProfile(postgres));

app.put('/image', handleImage(postgres));

app.post('/imageurl', handleImageUrl);

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});