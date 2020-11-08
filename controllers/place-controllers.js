const HttpError = require('../models/http-error');

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

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })

    if (!place) {
        throw new HttpError('Not found place by for ID ' + placeId, 404)
    }
    res.json({place});
};

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    })
    if (!place) {
        return next(new HttpError('Not found place by creator for ID ' + userId, 404));
    }
    res.json({place});
};

const createPlace = (req, res, next) => {
    const  { title, description, coordinates, address, creator } = req.body;

    const createdPlace =  {
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace)

    res.status(201).json({'place': req.body})
}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;