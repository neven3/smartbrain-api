import Clarifai from 'clarifai';
import dotenv from 'dotenv';

dotenv.config();

// require('dotenv').config();

const app = new Clarifai.App({
    apiKey: '6e58104673d1490e8d67f9da0f283cd3'
});

const handleImageUrl = (req, res) => {
    app.models
        .predict(
            'c0c0ac362b03416da06ab3fa36fb58e3',
            req.body.input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json('Unable to work with API'));
};

const handleImage = postgres => (req, res) => {
    const { id } = req.body;

    postgres('users')
        .where({ id })
        .increment('entries', 1)
        .returning('entries')
        .then(response => {
            if (response.length) res.json(response[0]);
            else res.status(400).json('Something went wrong');
        })
        .catch(err => res.status(400).json('Something went wrong with the count'));
};

export {
    handleImageUrl,
    handleImage
};