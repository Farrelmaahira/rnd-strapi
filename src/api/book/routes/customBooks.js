module.exports = {
  routes: [{
    method : "POST",
    path : '/books/import',
    handler : 'book.importData',
  }],
};
