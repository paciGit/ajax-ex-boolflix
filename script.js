function init(){
  $('.search').click(function(){
    $('.films').html('');
    var titolo = $(".film-search").val();

   $.ajax ({
     url: 'https://api.themoviedb.org/3/search/movie',
     method: 'get',
     data: {
       api_key :'a6d821f45a32df3aeda6a6858f2b5d63',
       query : titolo,
       language: 'it'
     },
     success: function(data) {
       var films = data.results;
       if (!films.length == 0) {
         printFilm(films);
       } else {
         alert('Questo film non è in lista!');
       }
     },
     error: function (request, state, error) {
       console.log(error);
     }
   });

 });
}



// Functions -----------------------------------------------------
function printFilm(films) {
  var source =$("#film-template").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < films.length; i++) {
    var thisFilm = films[i];
    console.log(thisFilm);
    var context = {
      title: thisFilm.title,
      original_title: thisFilm.original_title,
      original_language: thisFilm.original_language,
      vote_average: thisFilm.vote_average
    };
    var html = template(context);
    $('.films').append(html);
  }
}

$(document).ready(init);
