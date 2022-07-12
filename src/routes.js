const {
  addBookHandler,
  showAllBooksHandler,
  getBookByIdHandler,
} = require('./handler');

const route = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: showAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
];

module.exports = route;
