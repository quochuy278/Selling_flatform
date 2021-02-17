const fs = require('fs');
const path = require('path');

const structure = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = data => {
  fs.readFile(structure, (err, fileContent) => {
    if (err) {
      return data([]);
    }
    data(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(structure, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(data) {
    getProductsFromFile(data);
  }
};
