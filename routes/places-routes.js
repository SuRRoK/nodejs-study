const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'ESB',
        description: 'Description here',
        location: {
            lat: 40.7456345,
            lng: -73.9835124
        },
        address: 'USA, NY',
        creator: 'u1'
    }
]

router.get('/:pid', ((req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })

    if (!place) {
        const error = new Error('Not found place by for ID ' + placeId)
        error.code = 404;

        throw error;
    }
    res.json({place})
}));

router.get('/user/:uid', ((req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    })
    if (!place) {
        const error = new Error('Not found place by creator for ID ' + userId);
        error.code = 404;

        return next(error);
    }
    res.json({place})
}));


module.exports = router;