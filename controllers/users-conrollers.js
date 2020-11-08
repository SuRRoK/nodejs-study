const uuid = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Serg',
        email: 's@m.ru',
        password: 'secret',
    }
]

const getUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS})
};

const signup = (req, res, next) => {
    const { name, email, password } = req.body;

    if (DUMMY_USERS.find( u => u.email === email)) {
        throw new HttpError('User already exists!', 422)
    }
    const createdUser = {
        id: uuid.v4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser})
};

const login = (req, res, next) => {
    const { email, password } = req.body;
    const user = DUMMY_USERS.find( u => u.email === email);
    if (!user) {
        throw new HttpError('User not found by email  ' + email, 401);
    }
    if (user.password !== password) {
        throw new HttpError('Wrong password for email  ' + email, 401);
    }
    res.json({message: "Login in!"})
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;