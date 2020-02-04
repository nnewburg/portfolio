 $(function( $ ){

  $.ajax({
    method: "GET",
    url: "/api/resources"
  }).done((resources) => {

    for(resource of resources) {
      renderPosts(createPost(resource))
    }
  });

  function createPost(resource){
    let avgRating = Math.round(resource.ratings)
    let $head = ($('<head>')
      .append($('<h5>').addClass('title').text(resource.title))
      .append($('<h6>').addClass('username').text(resource.name))
    );
    let $body = ($('<div>').addClass('post-body')
      .append(($('<a>')).attr('href', resource.url)
      .append($('<img>').addClass('post-image').attr('src', resource.image)))
      .append($('<p>').text(resource.description))
    );

    let $rating = $('<div>').addClass('stars').attr('data-rating', "3")
    if(avgRating >= 1){
      var $star1 = $('<span data-star-value="1">').addClass('star rated').html('&nbsp;')
    } else {
      var $star1 = $('<span data-star-value="1">').addClass('star').html('&nbsp;')
    }
    if(avgRating >= 2){
      var $star2 = $('<span data-star-value="2">').addClass('star rated').html('&nbsp;')
    } else {
      var $star2 = $('<span data-star-value="2">').addClass('star').html('&nbsp;')
    }
    if(avgRating >= 3){
      var $star3 = $('<span data-star-value="3">').addClass('star rated').html('&nbsp;')
    } else {
      var $star3 = $('<span data-star-value="3">').addClass('star').html('&nbsp;')
    }
    if(avgRating >= 4){
      var $star4 = $('<span data-star-value="4">').addClass('star rated').html('&nbsp;')
    } else {
      var $star4 = $('<span data-star-value="4">').addClass('star').html('&nbsp;')
    }
    if(avgRating >= 5){
      var $star5 = $('<span data-star-value="5">').addClass('star rated').html('&nbsp;')
    } else {
      var $star5 = $('<span data-star-value="5">').addClass('star').html('&nbsp;')
    }
    $rating.append($star1).append($star2).append($star3).append($star4).append($star5)

    let $footer = ($('<div>').addClass('footer').attr('data-id', resource.id)
      .append($('<div>').addClass('likes').text('❤'))
      .append($('<div>').addClass('nOfLikes').text(resource.likes))
      .append($rating)
      .append($('<input>').addClass('comments').attr('placeholder', 'Add Comment'))
      .append($('<div>').addClass('showComments').text('💬'))
      .append($('<div>').addClass('keyword').text(`Keywords: ${resource.tags}`).attr('keyword','1'))
      )


     let $article = ($('<article>').addClass('shared-content')
      .append($head)
      .append($body)
      .append($footer))

       let $commentsContainer = $('<div>').addClass('commentsContainer')


        let uniqueComment = ''

        resource.allcomments.forEach(function(comments){
        uniqueComment = ($('<div>').text(comments))
        $commentsContainer.append(uniqueComment);
      })



      $article.append($commentsContainer);

      return $article;
  }

      // let commentsContainer = ($('<div>').addClass('commentsContainer'))
      //   let uniqueComment = ''
      //   forEach(comments of resource.allcomments){
      //   uniqueComment = ($('<p>').text(comments))
      //   console.log(comments)
      //   commentsContainer.append(uniqueComment);
      // }


      // $article.append(commentsContainer);


function renderPosts(data) {
    data.appendTo($('.resource-container'));
}


});


 // let $article = ($('<article>').addClass('shared-content')
 //      .append($head)
 //      .append($body)
 //      .append($footer)
 //      .append($('<div>').addClass('commentsContainer').text(`Comments: ${resource.allcomments}`))
 //    )
 //      return $article;
 //  }

 // let commentsContainer = ($('<div>').addClass('commentsContainer').text())
 //        let uniqueComment = ''
 //        forEach(comments of resource.allcomments){
 //        uniqueComment = ($('<p>').text(comments)))
 //        commentsContainer.append(uniqueComment);
 //      }
 //      $article.append(commentsContainer);

 //      return $article;
