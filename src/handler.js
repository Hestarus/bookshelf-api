const {response} = require('@hapi/hapi/lib/validation');
const {nanoid} = require('nanoid');
const books = require('./book');

const addBookHandler = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } else {
    const response = response.h({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    });
  }

  response.code(500);
};

const showAllBooksHandler = (req, h) => {
  const filteredBooks = books;

  if (books === undefined) {
    const response = h.response({
      status: 'success',
      data: {
        books: {
        },
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (req, h) => {
  const {id} = req.params;

  const book = books.filter((n) => n.id === id)[0];
  if (book === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  } else {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  };
};

module.exports = {
  addBookHandler,
  showAllBooksHandler,
  showAllBooksHandler,
  getBookByIdHandler,
};
