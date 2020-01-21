//attempt at making biography text transtion/animation in a cascading down format

  $(function( $ ){

    for(let n = 1; n <= 4; n++){

        var text = document.getElementById('text' + n);

        var newDom = '';
        var animationDelay = 4;

        for(let i = 0; i < text.innerText.length; i++)
        {
            newDom += '<span class="char">' + (text.innerText[i] == ' ' ? '&nbsp;' : text.innerText[i])+ '</span>';
        }

        text.innerHTML = newDom;
        var length = text.children.length;

        for(let i = 0; i < length; i++)
        {
            text.children[i].style['animation-delay'] = animationDelay * i + 'ms';
        }
   }
});