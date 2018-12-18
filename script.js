$(document).ready(function(){

  $('#myButton').click(function(){

    var filmUtente = $('#nomeFilm').val();
    $('.filmList').html('');

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
          var votoAverage = Math.ceil(risultatoFilm[i].vote_average / 2);
          console.log(votoAverage);
          var context = {
            titoloFilm: risultatoFilm[i].title,
            titoloOriginale: risultatoFilm[i].original_title,
            lingua: risultatoFilm[i].original_language,
            voto: stelline(votoAverage), //Math.ceil(risultatoFilm[i].vote_average / 2)
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

  function stelline(voto){
    var star = '';
    for (var k = 0; k < voto; k++) {
      star += '<i class="fas fa-star"></i>'
    }
    return star;
  }

});
