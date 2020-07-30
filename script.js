function init(){
  $('.search').click(function(){

      reset_list();

      var titolo = $(".film-search").val();

      searchFilms(titolo);
      searchSeries(titolo);
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
      var dati = data.results;
      if (!dati.length == 0) {
        print(dati);
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
      var dati = data.results;
      if(!dati.length == 0){
      print(dati);
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
};
function reset_list(){
  $('.films').html('');
}

function print(dati) {
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);
  for (var t = 0; t < dati.length; t++) {
    var film = dati[t];
    var voting = film.vote_average / 2; //Voto da 1 a 5
    var voti = Math.ceil(voting);
    var flag = film.original_language;
    if (flag != "it" && flag != "en" && flag != "fr" && flag != "zh") {
      flag = "";
   }

    var context = {
      title: film.title,
      original_title: film.original_title,
      original_language: film.original_language,
      vote_average: film.vote_average,
      flag: flag,
      vote_average: voti,
      stars: printStelle(voti)
   };
    var html = template(context);
    $('.films').append(html);
  }
}

$(document).ready(init);
