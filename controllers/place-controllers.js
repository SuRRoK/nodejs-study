const uuid = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    })
    if (!places || places.length === 0) {
        return next(new HttpError('Not found places by creator for ID ' + userId, 404));
    }
    res.json({places});
};

const createPlace = (req, res, next) => {
    const  { title, description, coordinates, address, creator } = req.body;

    const createdPlace =  {
        id: uuid.v4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace)

    res.status(201).json({'place': createdPlace})
}

const updatePlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };

    if (!updatedPlace) {
        throw new HttpError('Not found place by for ID ' + placeId, 404)
    }

    const  { title, description } = req.body;
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.json({updatedPlace});
};

const deletePlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p =>  p.id !== placeId);

    res.json({message: "OK"});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;