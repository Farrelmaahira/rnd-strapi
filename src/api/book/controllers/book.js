'use strict';

/**
 * book controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const xlsx = require('xlsx');

module.exports = createCoreController('api::book.book', ({ strapi }) => ({
async find(ctx) {

  let data = await strapi.entityService.findMany('api::book.book', {
    populate : ['categories', 'users_permissions_user']
  });
  const queryParams = ctx.request.query.category;
  if(queryParams) {
    data = await strapi.entityService.findMany('api::book.book', {
      filters : {
        categories : queryParams
      },
      populate : ['categories', 'users_permissions_user']
    });
  }

  ctx.body = {data};
},

async importData(ctx) {

let importFile = ctx.request.files.file.path;

let workbook = xlsx.readFile(importFile);

const workSheet = workbook.SheetNames;

const workBookRes = xlsx.utils.sheet_to_json(workbook.Sheets[workSheet[0]]);

let data = workBookRes[0];

let response = await strapi.query('api::book.book').create({
  data : {
    ...data,
    categories : {
      connect : data.category_id
    }
  }
});

ctx.body = {response};


}
}));
