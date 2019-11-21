import { winning } from './main';
export class DinoService {
    async getRandomWord() {
        try {
            let response = await fetch('http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=1');
            let jsonifiedResponse = await response.json();
            return jsonifiedResponse;
        } catch(error) {
            console.error('There was an error handling your request: ' + error.message);
        }
    } 
}

export class GiphyService {
    constructor() {
        this.images = []
    }

    async getRandomGif() {
        try {
            //console.log(process.env.API_KEY) 2ZSgRjeqQtUpxy8XUEJ4lQkQ0kiYEdwN
            let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.exports.API_KEY}&q=death&limit=25`);
            let jsonifiedResponse = await response.json();
            return jsonifiedResponse;
        } catch(error) {
            console.error('There was an error handling your request ' + error.message);
        }
    }

    setImages (imagesArray) {
        this.images = imagesArray;
    }
}

export class Word {
    constructor(response){
        this.response = response[0][0].toLowerCase().split('');
        this.currentState = [];
    }

    fillWithBlanks() {
        for (let i=0; i< this.response.length;i++) {
            this.currentState.push("-");
        }
    }

    getBlanks() {
        return this.response.length;
    }

    checkLetter (letter) {
        let flag = false;
        console.log(letter.length >= 2, letter, this.response.join(""));
        if(letter.length >= 2 && letter == this.response.join("")) {
            console.log('isInside?');
            winning();
        }
        for(let i = 0; i < this.response.length; i++){
            if(this.response[i] == (letter) ){
                this.currentState[i] = letter;
                flag = true;
            }
        } 
        return flag;
    }







}