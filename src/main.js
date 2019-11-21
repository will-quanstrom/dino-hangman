import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { DinoService, Word, GiphyService } from './dino-hangman';

export function winning() {
    console.log('inside?');
    $('.everything').hide();
    $('#putGiphy').attr('src', 'https://media.tenor.com/images/46c9c1ac2d73668880d4ead82d35cf57/tenor.gif');
    $('#loser').text('YOU WIN!');
}

$(document).ready(function() {
    let word, giphyService;
    let counter = 0;
    $('.everything').toggle();
    $('#inputLetter').submit(function(event){
        event.preventDefault();
        const letter = $("#userInput").val();
        
        
        const output = word.checkLetter(letter);
        if (output) {
            displayLetters();
        } else {
            counter++;
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

        if(counter == 6){
            $('.everything').toggle();
            $('#loser').text('YOU LOSE!');
            $('#hangman').attr('src', 'img/6.png');
        } else {
            $('#hangman').attr('src', `img/${counter}.png`);
        }
    }
});
