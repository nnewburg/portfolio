exports.seed = function(knex) {
  return knex('resourceWall_resources').del()
    .then(function () {
      return Promise.all([
        knex('resourceWall_resources').insert({title: 'Weird Animal Facts', url:'https://www.thedodo.com/16-amazing-animal-facts-1094218100.html', image:'https://assets3.thrillist.com/v1/image/2498964/size/tmg-article_tall.jpg', description:'Australians cannot blame their flatulance on Kangaroos!', user_id: 3}),
        knex('resourceWall_resources').insert({title: 'Facebook', url:'https://www.facebook.com/', image:'https://images-na.ssl-images-amazon.com/images/I/9149om0gRsL.jpg', description:'An in-depth exploration of Earths weirdest species', user_id: 2}),
        knex('resourceWall_resources').insert({title: 'Slide of Hand', url:'https://www.youtube.com/watch?v=jzjhcfVvWRA', image:'https://i.kinja-img.com/gawker-media/image/upload/s--I3zUSxo9--/c_scale,dpr_2.0,f_auto,fl_progressive,q_80,w_800/17uk3i3sjmn9tjpg.jpg', description:'Coin trick', user_id: 1}),
        knex('resourceWall_resources').insert({title: 'My birthday wish', url:'http://www.toysrus.ca/product/index.jsp?productId=49679736', image:'https://img.buzzfeed.com/buzzfeed-static/static/2015-10/29/11/enhanced/webdr06/enhanced-2099-1446132874-22.jpg?downsize=800:*&output-format=auto&output-quality=auto', description:'Fort Kit', user_id: 1}),
        knex('resourceWall_resources').insert({title: 'New Orlean Map', url:'https://www.bigeasy.com/onthetown/maps', image:'https://civilrightstrail.com/app/uploads/2017/10/Destination_NewOrleans_page.jpg', description:'New Orleans for a quick reference', user_id: 1}),
        knex('resourceWall_resources').insert({title: 'Fauna and Flora', url:'https://www.fauna-flora.org/', image:'https://www.parconazionaledelvesuvio.it/wp-content/uploads/2018/03/la_fauna-ente_parco_nazionale_del_vesuvio-01.jpg', description:'A guide to Earth things', user_id: 2})
      ]);
    });
};
