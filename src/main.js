import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { DinoService, Word, GiphyService } from './dino-hangman';
import img from'./img/1.png';

$(document).ready(function() {
    let word, giphyService;
    $('#inputLetter').submit(function(event){
        event.preventDefault();
        const letter = $("#userInput").val();
        
        const output = word.checkLetter(letter);
        if (output) {
            displayLetters();
        } else {
            displayImage();
            
        }
    });
    
    (async () => {
        giphyService = new GiphyService();
        const response = await giphyService.getRandomGif();
        giphyService.setImages(response.data);
        //getElements(response);
    })();
    
    (async () => {
        let dinoService = new DinoService();
        const response = await dinoService.getRandomWord();
        word = new Word(response);
        getElements(response);
    })();

    function getElements(response){
        $("#word").text(response);
        for (let i=0; i< word.getBlanks(); i++) {
            $("#boxes").append(`<div class='item' id=${i}>-</div>`)
        }
        word.fillWithBlanks();
    }

    function displayLetters() {
        console.log(word.currentState);
        for (let i=0; i< word.currentState.length; i++) {
            $("#" + i).text(word.currentState[i])
        }
    }

    function displayImage() {
        let index = Math.ceil(Math.random() * 25);
        console.log(giphyService.images);
        $('#putGiphy').attr('src', giphyService.images[index].images.downsized_large.url);
    }
});
