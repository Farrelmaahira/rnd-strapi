module.exports = {
  routes: [
    {
      method: "GET",
      path: "/movie",
      handler: "movie.getAction",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method : 'POST',
      path : '/movie',
      handler  : 'movie.postAction',
      config : {
        auth : false
      }
    },
    {
      method : 'GET',
      path : '/movie/:id',
      handler : 'movie.getByIdAction',
    },
    {
      method : 'PUT',
      path : '/movie/:id',
      handler : 'movie.updateAction'
    },
    {
      method : 'DELETE',
      path : '/movie/:id',
      handler : 'movie.deleteAction'
    },
    {
      method : "POST",
      path : "/movie/import",
      handler : "movie.importData"
    }
  ],
};
