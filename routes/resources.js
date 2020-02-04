"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex('resourcewall_resources')
      .leftJoin('resourcewall_user_likes', 'resourcewall_resources.id', 'resourcewall_user_likes.resource_id')
      .join('resourcewall_users', 'resourcewall_resources.user_id', 'resourcewall_users.id')
      .leftJoin('resourcewall_resource_ratings', 'resourcewall_resources.id', 'resourcewall_resource_ratings.resource_id')
      .leftJoin('resourcewall_comments', 'resourcewall_resources.id', 'resourcewall_comments.resource_id')
      .leftJoin('resourcewall_resource_keywords', 'resourcewall_resources.id', 'resourcewall_resource_keywords.resource_id')
      .leftJoin('resourcewall_keywords', 'resourcewall_resource_keywords.keyword_id', 'resourcewall_keywords.id')
      //.leftJoin('users as user_comments', 'comments.user_id', 'user_comments.id')
      .select(['resourcewall_resources.title as title', 'resourcewall_resources.url as url', 'resourcewall_users.name as name', 'resourcewall_resources.id as id', 'resourcewall_resources.description as description', 'resourcewall_resources.image as image', knex.raw('array_agg(distinct resourcewall_comments.content) as allComments'), knex.raw('array_agg(distinct resourcewall_keywords.name) as tags')])
      .countDistinct('resourcewall_user_likes.id as likes')
      .avg('resourcewall_resource_ratings.rating as ratings')
      .groupBy('resourcewall_resources.id', 'resourcewall_users.name')
      .orderBy('resourcewall_resources.id', 'DESC')
      .then((results) => {

        res.json(results);
    });
  });



  return router;
}
