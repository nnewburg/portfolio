"use strict";
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/resourceWall", (req, res) => {
    knex('resouceWall_resources')
      .leftJoin('resouceWall_user_likes', 'resouceWall_resources.id', 'resouceWall_user_likes.resource_id')
      .join('resouceWall_users', 'resouceWall_resources.user_id', 'resouceWall_users.id')
      .leftJoin('resouceWall_resource_ratings', 'resouceWall_resources.id', 'resouceWall_resource_ratings.resource_id')
      .leftJoin('resouceWall_comments', 'resouceWall_resources.id', 'resouceWall_comments.resource_id')
      .leftJoin('resouceWall_resource_keywords', 'resouceWall_resources.id', 'resouceWall_resource_keywords.resource_id')
      .leftJoin('resouceWall_keywords', 'resouceWall_resource_keywords.keyword_id', 'resouceWall_keywords.id')
      //.leftJoin('users as user_comments', 'comments.user_id', 'user_comments.id')
      .select(['resouceWall_resources.title as title', 'resouceWall_resources.url as url', 'resouceWall_users.name as name', 'resouceWall_resources.id as id', 'resouceWall_resources.description as description', 'resouceWall_resources.image as image', knex.raw('array_agg(distinct comments.content) as allComments'), knex.raw('array_agg(distinct keywords.name) as tags')])
      .countDistinct('resouceWall_user_likes.id as likes')
      .avg('resouceWall_resource_ratings.rating as ratings')
      .groupBy('resouceWall_resources.id', 'users.name')
      .orderBy('resouceWall_resources.id', 'DESC')
      .then((results) => {
        res.json(results);
    });
  });

  console.log("Route fires")

  return router;
}
//////////// query used to join all the tables:

// select distinct resources.id, title, users.name, array_agg(distinct user_likes.id) as likes, array_agg(resource_ratings.rating) as ratings, array_agg(distinct keywords.name) as tags, array_agg(distinct comments.content) as allComments
// from resources
// join users on resources.user_id = users.id
// left join user_likes on resources.id = user_likes.resource_id
// left join resource_ratings on resource_ratings.resource_id = resources.id
// left join resource_keywords on resources.id = resource_keywords.resource_id
// left join keywords on resource_keywords.keyword_id = keywords.id
// left join comments on resources.id = comments.resource_id
// left join users as user_comments on comments.user_id = user_comments.id
// group By resources.id, users.name, user_comments.name, content
// order by resources.id asc;

//////////////
