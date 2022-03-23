const { body, validationResult } = require('express-validator');
const Hobby = require('../models/hobby');
function getHobbies(req, res) {
    Hobby.find((err, hobbies_list) => {
        if (err) {
            res.json(err);
        } else {
            res.json(hobbies_list);
        }
    });
}
const addHobby = (req, res) => {
    console.log(req.body);
    let { name, description, doc } = req.body;
    let hobbyObj = new Hobby({ name, description, doc });
    hobbyObj.save((error) => {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            res.json({ status: 'adding hobby complete' });
        }
    });
};

function deleteHobby(req, res) {
    Hobby.findByIdAndDelete(req.params._id, function (err) {
        if (err) {
            res.json(err);
        } else {
            res.json(`hobby with id : ${req.params._id} is deleted`);
        }
    });
}

module.exports = { getHobbies, addHobby, deleteHobby };
