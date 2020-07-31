function init(){
  $('.search').click(function(){
      var titolo = $(".film-search").val();
      reset();
      searchFilms(titolo);
      searchSeries(titolo);
  });

  $('.film-search').keypress(function(event) {
    if(event.which == 13) {
      var titolo = $(".film-search").val();
      reset();
      searchFilms(titolo);
      searchSeries(titolo);
    }
  });
}



// FUNCTIONS ----------------------------------------------------------
function searchFilms(string) { // Chiamata Api
  $.ajax (
    {
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    data: {
      api_key :'a6d821f45a32df3aeda6a6858f2b5d63' ,
      query : string,
      language: 'it'
    },
    success: function(data) {
      if (data.total_results > 0) {
        var film = data.results;
        print('film', film);
      } else {
        alert('Film non trovato.');
      }
    },
    error: function (request, state, errors) {
      alert("Errore! " + errors);
      }
    }
  );
  reset();
}

function searchSeries(string){ // Chiamata Api per Serie tv
  $.ajax(
    {
    url: "https://api.themoviedb.org/3/search/tv",
    method: "GET",
    data: {
          api_key: "a6d821f45a32df3aeda6a6858f2b5d63",
          query: string,
          language: "it"
        },
    success: function (data) {
      console.log(data);
      if(data.total_results > 0){
        var serie = data.results;
        print('serie', serie);
      }else{
        alert('Serie tv non trovata.');
    }
      },
    error: function (request, stato, errors) {
      alert("Errore! " + errors);
      }
    }
  );
  reset();
};

function printStelle(votiFilm){ // Aggiunta votazione stelle
  var somma= '';
  for (var i = 0; i < 5; i++) {
    if ( i < votiFilm) {
      var risultato = '<i class="fas fa-star color"></i>';
    } else {
      var risultato = '<i class="far fa-star color"></i>';
    }
    somma += risultato;
  }
  return somma;
}

// Function Reset
function reset(){
  $('.film-search').val('');

  $('.films').html('');

  $('.serie').html('');
};

function print(type, results) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  var title;
  var originalTitle;

  for (var i = 0; i < results.length; i++) {
    var thisResult = results[i];

    if (type == 'film') {
      originalTitle = thisResult.original_title;
      title = thisResult.title;
      var container = $('.films');
    } else if (type == 'serie'){
      originalTitle = thisResult.original_name;
      title = thisResult.name;
      var container = $('.serie');
    }
    var voting = thisResult.vote_average / 2; //Votazione da 1 a 5

    var voti = Math.ceil(voting);
    var flag = thisResult.original_language;
    if (flag != "it" && flag != "en" && flag != "fr" && flag != "zh") {
      flag = "";
   }

    var context = {
      type: type,
      title: title,
      original_title: originalTitle,
      original_language: thisResult.original_language,
      vote_average: thisResult.vote_average,
      poster_path : "https://image.tmdb.org/t/p/w185" + thisResult.poster_path,
      flag: flag,
      vote_average: voti,
      stars: printStelle(voti)
   };
    var html = template(context);
    container.append(html);
  }
}

$(document).ready(init);
