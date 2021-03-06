import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
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