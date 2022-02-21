const { Router } = require('express');
const router = Router();
const Movie = require('../models/db_movies')
const _ = require('underscore');


router.get('/', async(req, res) => {
    try {
        const movies = await Movie.find()
        res.json(movies);
    } catch (error) {
        res.json(error)
    }
})

router.get('/:id', async(req, res) => {
    try {
        const movies = await Movie.findById(req.params.id);
        res.json(movies);
    } catch (error) {
        res.json(error)
    }
})

router.post('/', async(req, res) => {
    try {
        const { title, director, year, rating } = req.body;
        if (title && director && year && rating) {
            const newMovie = new Movie({ title, director, year, rating })

            await newMovie.save()

            res.json(newMovie);
        } else {
            res.status(500).json({ error: 'There was an error.' });
        }
    } catch (error) {
        res.json(error)
    }
});

router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (id && data) {
            await Movie.findByIdAndUpdate(id, data)
            res.json("Datos actualizados");
        } else {
            res.status(500).json({ error: 'There was an error.' });
        }

    } catch (error) {
        res.json(error)
    }

});

router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Movie.findByIdAndDelete(id)
        res.json("Eliminado");
    } catch (error) {
        res.json(error)
    }
});

module.exports = router;