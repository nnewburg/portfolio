//attempt at making biography text transtion/animation in a cascading down format

  $(function( $ ){



    if(window.screen.width > 728){

      let navBar = $("<div></div>");
      $(navBar).attr( 'id', 'nav' );

      let nameTitle = $("<div></div>");
      $(nameTitle).attr( 'id', 'nameTitle' );

      let header = $("<h2></h2>");

      let link = $('<a>NICK NEWBURG</a>')
      $(link).attr('href', '/')


      $(header).append(link)
      $(nameTitle).append(header)
      $(navBar).append(nameTitle)

     $(navBar).append(createCategory('/aboutme', 'Biography'))
     $(navBar).append(createCategory('/projects', 'Projects'))
     $(navBar).append(createCategory('/resume', 'Resume'))

      $('#newNav').append(navBar)

    } else {

        let navBar = $("<div></div>");
      $(navBar).attr( 'id', 'nav' );

        let hamburger = '<nav class="navbar navbar-light navbar-1 white"><a class="navbar-brand" href="/">NICK NEWBURG</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent15"aria-controls="navbarSupportedContent15" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarSupportedContent15"><ul class="navbar-nav mr-auto"><li class="nav-item active"><a class="nav-link" href="/aboutme">Biography <span class="sr-only">(current)</span></a></li><li class="nav-item"><a class="nav-link" href="/projects">Projects</a></li><li class="nav-item"><a class="nav-link" href="/resume">Resume</a></li></ul></div></nav>';

      $('#newNav').append($.parseHTML(hamburger))

    }



});

  function createCategory (href, text){

    let section = $(`<a>${text}</a>`)

    $(section).attr('href', href)
    $(section).addClass('sectionLink')

    return section
  }

