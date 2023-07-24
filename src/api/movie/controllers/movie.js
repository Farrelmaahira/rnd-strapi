"use strict";

/**
 * A set of functions called "actions" for `movie`
 */

const xlsx = require("xlsx");
module.exports = {
  getAction: async (ctx, next) => {
    const data = await strapi.entityService.findMany("api::movie.movie");
    return ctx.send(
      {
        data: data,
      },
      200
    );
  },

  postAction: async (ctx, next) => {
    const data = ctx.request.body;
    console.log(data.data.title);
    const entry = await strapi.entityService.create("api::movie.movie", {
      data: {
        title: data.data.title,
      },
    });
    return (ctx.response.body = {
      data: entry,
    });
  },

  getByIdAction: async (ctx, next) => {
    const { id } = ctx.request.params;
    let data = await strapi.entityService.findOne("api::movie.movie", id);
    return ctx.send({
      data: data,
    });
  },

  updateAction: async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data.data.title);
    const { id } = ctx.request.params;
    let entry = await strapi.entityService.update("api::movie.movie", id, {
      data: {
        title: data.data.title,
      },
    });
    return ctx.send(
      {
        data: entry,
      },
      200
    );
  },

  deleteAction: async (ctx, next) => {
    let { id } = ctx.request.params;
    const entry = await strapi.entityService.delete("api::movie.movie", id);
    return ctx.send(
      {
        data: entry,
      },
      200
    );
  },

  importData: async (ctx, next) => {
    let importFile = ctx.request.files.file.path;

    const workbook = xlsx.readFile(importFile);

    const workbookSheet = workbook.SheetNames;

    const workbookResponse = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbookSheet[0]]
    );

    console.log(workbookResponse[0]);
    let data = workbookResponse[0];

    let response = await strapi.query('api::movie.movie').create({
      data : {
        ...data,
        category : {
          connect : data.category_id
        }
      }
    });
    ctx.body = {response};
  },
};
