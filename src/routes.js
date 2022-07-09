const {addBookHandler} = require('./handler');

const route = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: () => {},
  },
  {

  },
];

module.exports = route;
