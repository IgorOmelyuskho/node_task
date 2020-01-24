var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');
var loremIpsum = require('lorem-ipsum').LoremIpsum;
const lorem = new loremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

// authorization
router.post('/', function (req, res, next) {
  const newUser = addNewUser(req.body);
  res.send(newUser);
});

// update user profile
router.put('/update_profile', function (req, res, next) {
  const updatedUser = updateUserProfile(req);
  res.send(updatedUser);
});

// update user profile
router.put('/update_password', function (req, res, next) {
  const updatedUser = updateUserProfile(req);
  res.send(updatedUser);
});

// get user
router.get('/', function (req, res, next) {
  const user = getUserByEmail(req.query.email);
  res.send(user);
});

function updateUserProfile(req) {
  const oldEmail = req.body.oldEmail;
  const user = req.body.user;

  for (let i = 0; i < global.usersArr.length; i++) {
    if (global.usersArr[i].email === oldEmail) {
      global.usersArr[i] = {
        ...global.usersArr[i],
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      };
      return global.usersArr[i];
    }
  }
}

function createDefaultProductsArr() {
  let res = [];
  for (let i = 0; i < 90; i++) {
    const newProduct = {
      id: uuidv4(),
      name: lorem.generateWords(2),
      price: (Math.random() * 100).toFixed(2),
      description: lorem.generateWords(50)
    }
    res.push(newProduct);
  }
  return res;
}

function getUserByEmail(email) {
  for (let i = 0; i < global.usersArr.length; i++) {
    if (global.usersArr[i].email === email) {
      return global.usersArr[i];
    }
  }
}

function addNewUser(user) {
  for (let i = 0; i < global.usersArr.length; i++) {
    if (global.usersArr[i].email === user.email) {
      return global.usersArr[i];
    }
  }

  const newUser = {
    email: user.email,
    password: user.password,
    name: '',
    lastName: '',
    phone: '',
    productsArr: createDefaultProductsArr()
  }

  global.usersArr.push(newUser);
  return newUser;
}

module.exports = router;