$(document).ready(function(){

  $('#myButton').click(function(){

    var filmUtente = $('#nomeFilm').val();
    $('.container-all-films').html('');

    if (filmUtente != '') {
      $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        method: 'GET',
        data: {
          api_key: 'fd686ababf68788e8d87639cef87259e',
          language: 'it',
          query: filmUtente
        },
        success: function(data){
          var risultatoFilm = data.results;
          console.log(risultatoFilm);
          for (var i = 0; i < risultatoFilm.length; i++) {
            //qui devo inserire una funzione che crea il contenuto
            generaHtml(risultatoFilm[i])
          }
        },
        error: function(){
          alert('qualcosa non sta funzionando');
        }
      })

      $.ajax({
        url: 'https://api.themoviedb.org/3/search/tv',
        method: 'GET',
        data: {
          api_key: 'fd686ababf68788e8d87639cef87259e',
          language: 'it',
          query: filmUtente
        },
        success: function(data){
          var risultatoSerieTv = data.results;

          for (var i = 0; i < risultatoSerieTv.length; i++) {
            var serieTv = risultatoSerieTv[i]
            serieTv.title = serieTv.name;
            serieTv.original_title = serieTv.original_name;
            generaHtml(serieTv)
          }
        },
        error: function(){
          alert('qualcosa non sta funzionando')
        }


    })
    }

  })

  function stelline(voto){
    var star = '';
    for (var k = 0; k < voto; k++) {
      star += '<i class="fas fa-star"></i>'
    }
    return star;
  }

  function flag(bandiera){
    var linguaDelFilm = '';

    if (bandiera == 'en') {
      linguaDelFilm = '<img src="img/en.jpg">';
    } else if (bandiera == 'it') {
      linguaDelFilm = '<img src="img/it.png">';
    } else {
      linguaDelFilm = bandiera;
    }
    return linguaDelFilm;
  }

  function generaHtml(contenuto){
    var source   = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var votoAverage = Math.ceil(contenuto.vote_average / 2);
    var lingua = contenuto.original_language;
    // console.log(votoAverage);
    var context = {
      immagine_film: imgFilm(contenuto.poster_path),  //'<img src="https://image.tmdb.org/t/p/w342/' + contenuto.poster_path + '">'
      titoloFilm: contenuto.title,
      titoloOriginale: contenuto.original_title,
      descrizione: contenuto.overview,
      lingua: flag(lingua),
      voto: stelline(votoAverage),
    };
    var html = template(context);
    $('.container-all-films').append(html);

    $('.imgFilm').mouseenter(function(){

      $(this).children().addClass('active')

    })

    $('.imgFilm').mouseleave(function(){

      $(this).children().removeClass('active')

    })


  }

  function imgFilm(url){
    var placeImg = '<img src="https://image.tmdb.org/t/p/w342/' + url + '">'

    if (placeImg == '<img src="https://image.tmdb.org/t/p/w342/null">'){
      placeImg = '<img src="https://via.placeholder.com/342x513?text=Immagine+non+disponibile">'
    }

    return placeImg;
  }

});
