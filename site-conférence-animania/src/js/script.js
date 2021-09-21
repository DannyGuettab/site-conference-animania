document.addEventListener("DOMContentLoaded", function () {

    var boutonMenu = document.querySelector(".clicmenu");
    var menu = document.querySelector(".menu");

    boutonMenu.addEventListener("click",ouvrirMenu);

    function ouvrirMenu(){
       if(boutonMenu.classList.contains("ouvrir")){
           menu.classList.remove("ferme");
           boutonMenu.classList.remove("ouvrir");
       }else if (boutonMenu.classList.contains("ouvrir") === false){
           menu.classList.add("ferme");
           boutonMenu.classList.add("ouvrir");
       }
    }



    let connexion = new MovieDB();

    if (document.location.pathname.search("fiche-film.html") > 0) {
        let params = (new URL(document.location)).searchParams;

        connexion.requeteInfoFilm(params.get("id"));
        connexion.requeteInfoActeurs(params.get("id"));
    } else {

        connexion.requeteDernierFilm();
        connexion.requetePopulaireFilm();
    }

});


class MovieDB {


    constructor() {
        // console.log("Constructeur");

        this.APIkey = "b481a08175675de22d54692fb3c2c6b7";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3";

        this.imgPath = "https://image.tmdb.org/t/p/"

        this.totalFilm = 9;

        this.filmCarrousel = 9;
    }


    requeteDernierFilm() {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/top_rated?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

        requete.send();
    }

    retourRequeteDernierFilm(e) {
        // console.log("retour dernier film")


        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        //  console.log(data);

        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data) {
        for (let i = 0; i < this.totalFilm; i++) {

            let unArticle = document.querySelector(".template>.film").cloneNode(true);
            unArticle.querySelector("h2").innerHTML = data[i].title;
            //unArticle.querySelector("p.description").innerHTML = data[i].overview || "Aucune description disponible";
            unArticle.querySelector("p.cote").innerHTML = "Note: " + data[i].vote_average + "/10";
            unArticle.querySelector("p.anneesortie").innerHTML = "Sorti le " + data[i].release_date;
            unArticle.querySelector("a").href = "fiche-film.html?id=" + data[i].id;

            let src = this.imgPath + "w185" + data[i].poster_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);


            document.querySelector(".liste-films").appendChild(unArticle);
        }

    }

    requeteInfoFilm(movieId) {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/" + movieId + "?api_key=" + this.APIkey + "&language=" + this.lang);


        requete.send();
    }

    retourRequeteInfoFilm(e) {


        let target = e.currentTarget;
        let data;
        // console.log(target.responseText);

        //console.log(target.responseText);

        data = JSON.parse(target.responseText);


        this.afficheInfoFilm(data);
        //  console.log(data);
    }

    afficheInfoFilm(data) {


        // let unArticle = document.querySelector(".template>.film").cloneNode(true);
        let unArticle = document.querySelector(".fiche-film");
        unArticle.querySelector("h1").innerHTML = data.title;
        unArticle.querySelector("p.annee").innerHTML = data.release_date;
        unArticle.querySelector("p.synopsis").innerHTML = data.overview || "Non disponible.";
        unArticle.querySelector("p.cote").innerHTML = data.vote_average + "/10";
        unArticle.querySelector("p.langue").innerHTML = data.original_language;
        unArticle.querySelector("p.duree").innerHTML = data.runtime;
        unArticle.querySelector("p.budget").innerHTML = data.budget || "Non disponible";
        unArticle.querySelector("p.recette").innerHTML = data.revenue;

        let src = this.imgPath + "w780" + data.poster_path;

        let uneImage = unArticle.querySelector("img");
        uneImage.setAttribute("src", src);
        uneImage.setAttribute("alt", data.title);

    }


    requetePopulaireFilm() {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequetePopulaireFilm.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/popular?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");


        requete.send();
    }

    retourRequetePopulaireFilm(e) {


        let target = e.currentTarget;
        let data;
        //  console.log(target.responseText);

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;


        this.affichePopulaireFilm(data);
        //  console.log(data);
    }

    affichePopulaireFilm(data) {

        for (let i = 0; i < this.filmCarrousel; i++) {

            let unArticle = document.querySelector(".template>.swiper-slide").cloneNode(true);
            unArticle.querySelector("h3").innerHTML = data[i].title;
            unArticle.querySelector("p.cote").innerHTML = data[i].vote_average + " /10";
            unArticle.querySelector("a").href = "fiche-film.html?id=" + data[i].id;

            let src = this.imgPath + "w185" + data[i].poster_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);


            document.querySelector(".swiper-wrapper").appendChild(unArticle);
        }


        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,

            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                375: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }

        });


    }

    requeteInfoActeurs(movieId) {


        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfoActeurs.bind(this));

        //requete.open("GET","https://api.themoviedb.org/3/movie/now_playing?api_key=b481a08175675de22d54692fb3c2c6b7&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/" + movieId + "/credits?api_key=" + this.APIkey + "&language=" + this.lang);


        requete.send();
    }

    retourRequeteInfoActeurs(e) {


        let target = e.currentTarget;
        let data;
        // console.log(target.responseText);

        //console.log(target.responseText);

        data = JSON.parse(target.responseText);


        this.afficheInfoActeurs(data);
        //  console.log(data);
    }

    afficheInfoActeurs(data) {

        var imageTempo = new Image(185, 278);
        imageTempo.src = "../images/image-tempo.png"
        for (let i = 0; i < data.cast.length; i++) {

            let unArticle = document.querySelector(".template>.swiper-slide").cloneNode(true);
            unArticle.querySelector("h3").innerHTML = data.cast[i].name;
            unArticle.querySelector("p.perso").innerHTML = data.cast[i].character;

            let src = this.imgPath + "w185" + data.cast[i].profile_path;

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data.cast[i].profile_path);

            if (src == "https://image.tmdb.org/t/p/w185null") {
                uneImage.setAttribute("src", imageTempo.src);
            }


            document.querySelector(".swiper-wrapper").appendChild(unArticle);
        }


        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,

            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                375: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
            }

        });
    }


}














