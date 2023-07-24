'use strict';

/**
 * comic controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const xlsx = require('xlsx');

module.exports = createCoreController('api::comic.comic', ({ strapi }) => ({
async importData(ctx) {
// console.log(ctx.request.files.file);
let importFile = ctx.request.files.file.path;
let workbook = xlsx.readFile(importFile);
const workSheet = workbook.SheetNames;
const workbookRes = xlsx.utils.sheet_to_json(workbook.Sheets[workSheet[0]]);
console.log(workbookRes[0]);

let data = await strapi.entityService.create('api::comic.comic', {
  data : workbookRes[0]
});

ctx.body = {data};

}


}));
