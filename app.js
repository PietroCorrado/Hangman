const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }))

const getRandomWord = async () => {
    try {
        const response = await axios.get("https://random-word-api.herokuapp.com/word")
        return JSON.stringify(response.data).slice(2,-2)
        
    } catch (error) {
        console.error(error)
    }
}

const createAnswerSection = async (word) => {
    try{
        var length = word.length
        var table = "<table class='guess'><tr>"
        for(i=0;i<length;i++){
            table += "<td class='answerSection answerIndex" + i + "'></td>"
        }
        table += "</tr></table>"
        return table
    } catch (error) {
        console.error(error)
    }
}

const createAttemptsTracker = async () => {
    try{
        var attempts = 6
        var attemptsTracker = "<h3 class='attemptsRemaining'>Attempts Remaining: " + attempts + "</h2>"
        return attemptsTracker 
    } catch (error) {
        console.error(error)
    }
}

const createLetterBank = async () => {
    try{
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
        var table = "<table class='letter-bank'><tr>"
        var count = 0

        alphabet.forEach(buildLetterBank)
        
        function buildLetterBank(letter){
            count += 1
            
            if(count % 7 === 0){
                table+="</tr><tr><td onclick='letterClicked(this)'>" + letter + "</td>"
            } else {
                table += "<td onclick='letterClicked(this)'>" + letter + "</td>"
            }
        }

        table += "</tr></table>"
        return table
    } catch (error) {
        console.error(error)
    }
}

const createSkeleton = async () => {
    try{
        var image = "<img class='skeleton' src='/images/skeleton.png' alt='Skeleton'>"
        return image
    } catch (error) {
        console.error(error)
    }
}

app.get("/", async function(req, res) {
    try{
        randomWord = await getRandomWord();
        answerSection = await createAnswerSection(randomWord);
        attemptsTracker = await createAttemptsTracker();
        letterBank = await createLetterBank();
        skeleton = await createSkeleton();
    } catch (error) {
        console.error(error)
    }
    res.render("home", {
        randomWord:randomWord,
        answerSection:answerSection,
        attemptsTracker:attemptsTracker,
        letterBank:letterBank,
        skeleton:skeleton
    });
  });



app.listen(process.env.PORT || 3000, function() {
    console.log("The server is running on port 3000.");
  });