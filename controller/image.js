const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '80e32500fb4540ba85b986ccda700641'
});

const handleApiClarifai = (req, res) => {
    app.models
        .predict(
            Clarifai.FACE_DETECT_MODEL,
            req.body.input //url of pics
        )
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to call api'))
}

const handleImageUpload = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImageUpload: handleImageUpload,
    handleApiClarifai: handleApiClarifai
}