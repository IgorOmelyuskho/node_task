var express = require('express');
var router = express.Router();

// get user products / get product by id
router.get('/', function (req, res, next) {
  if (req.query.email) {
    const productsArr = getProductsByEmail(req.query.email);
    res.send(productsArr);
  } else if (req.query.id) {
    const product = getProductsById(req.query.id);
    res.send(product);
  }
});

// update products array
router.put('/', function (req, res, next) {
  const resultArr = updateProductsArr(req);
  res.send(resultArr);
});

// update product by id
router.put('/*', function (req, res, next) {
  updateProduct(req);
  res.send({});
});

// create new product
router.post('/', function (req, res, next) {
  createProduct(req);
  res.send({});
});

function updateProductsArr(req) {
  const email = req.body.email;
  const newProductsArr = req.body.newProductsArr;
  for (let i = 0; i < global.usersArr.length; i++) {
    if (global.usersArr[i].email === email) {
      global.usersArr[i].productsArr = newProductsArr;
      return newProductsArr;
    }
  }
}

function createProduct(req) {
  const email = req.body.email;
  const product = req.body.product;
  for (let i = 0; i < global.usersArr.length; i++) {
    if (global.usersArr[i].email === email) {
      global.usersArr[i].productsArr.push(product);
      return;
    }
  }
}

function getProductsById(id) {
  for (let i = 0; i < global.usersArr.length; i++) {
    for (let j = 0; j < global.usersArr[i].productsArr.length; j++) {
      if (global.usersArr[i].productsArr[j].id === id) {
        return global.usersArr[i].productsArr[j];
      }
    }
  }
}

function getProductsByEmail(email) {
  for (let i = 0; i < global.usersArr.length; i++) {
    if (global.usersArr[i].email === email) {
      return global.usersArr[i].productsArr;
    }
  }
}

function updateProduct(req) {
  const id = req.params[0];
  const updatedProduct = req.body;
  for (let i = 0; i < global.usersArr.length; i++) {
    for (let j = 0; j < global.usersArr[i].productsArr.length; j++) {
      if (global.usersArr[i].productsArr[j].id === id) {
        global.usersArr[i].productsArr[j] = {
          ...global.usersArr[i].productsArr[j],
          name: updatedProduct.name,
          price: updatedProduct.price,
          description: updatedProduct.description
        };
      }
    }
  }
}


module.exports = router;