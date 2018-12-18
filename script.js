$(document).ready(function(){

  $('#myButton').click(function(){

    var filmUtente = $('#nomeFilm').val();


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

        for (var i = 0; i < risultatoFilm.length; i++) {
          var source   = document.getElementById("entry-template").innerHTML;
          var template = Handlebars.compile(source);

          var context = {
            titoloFilm: risultatoFilm[i].title,
            titoloOriginale: risultatoFilm[i].original_title,
            lingua: risultatoFilm[i].original_language,
            voto: Math.ceil(risultatoFilm[i].vote_average / 2),
          };
          var html = template(context);
          $('.filmList').append(html);
        }
      },
      error: function(){
        alert('qualcosa non sta funzionando');
      }
    })


  })


});
