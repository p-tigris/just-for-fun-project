/*-------------------------------- Constants --------------------------------*/
import { animeQuestions, disneyQuestions } from "./data.js";
import { animeImageEl, animeButtonEl, disneyImageEl, disneyButtonEl, 
    buttonStyle, imageStyles, imageContainerEl, buttonContainerEl, quizImageEl,
    choiceButtonsEl, finalMessageEl, resetButtonEl, 
    removeBorder} from "./setup.js";

/*---------------------------- Variables (state) ----------------------------*/
let score;
let currentQuestionIndex;
let quizQuestions;

/*------------------------ Cached Element References ------------------------*/
const quizContainer = document.querySelector('#quiz-container');
const messageEl = document.querySelector('#message');
const titleEl = document.querySelector('#title');

/*-------------------------------- Functions --------------------------------*/
// Initiates the starting view of the app
const home = () => {
    window.scrollTo(0, 0);
    score = 0;
    currentQuestionIndex = 0;
    quizContainer.innerHTML = "";
    messageEl.textContent = "Choose your quiz!";
    quizContainer.appendChild(imageContainerEl);
    quizContainer.appendChild(buttonContainerEl);
    imageContainerEl.appendChild(animeImageEl);
    imageContainerEl.appendChild(disneyImageEl);
    buttonContainerEl.appendChild(animeButtonEl);
    buttonContainerEl.appendChild(disneyButtonEl);
}

// Starts the quiz depending on which quiz button is clicked
const startQuiz = (event) => {
    if (!event.target.classList.contains("quiz")) {
        return; // Ensures only buttons are clicked
    }
    if (event.target.textContent === "Guess the Anime") {
        quizQuestions = animeQuestions;
    } else if (event.target.textContent === "Guess the Disney Lyrics") {
        quizQuestions = disneyQuestions;
    }
    render();
}

// Creates a view of a quiz question, an image and choices
const render = () => {
    window.scrollTo(0, 0);
    messageEl.textContent = quizQuestions[currentQuestionIndex].question;
    quizContainer.innerHTML = "";
    imageStyles(quizImageEl);
    quizImageEl.src = quizQuestions[currentQuestionIndex].image;
    quizContainer.appendChild(quizImageEl);
    choiceButtonsEl.innerHTML = "";
    quizContainer.appendChild(choiceButtonsEl);

    quizQuestions[currentQuestionIndex].choices.forEach((choice) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButton.classList.add("choice");
        buttonStyle(choiceButton, 24, 'Vollkorn');
        choiceButtonsEl.appendChild(choiceButton);
        choiceButtonsEl.addEventListener('click', checkAnswer);
    })
}

// Checks to see if the user's choice is correct, and updates score accordingly
const checkAnswer = (event) => {
    if (!event.target.classList.contains("choice")) {
        return; // Ensures only buttons are clicked
    }
    quizContainer.innerHTML = "";
    window.scrollTo(0, 0);
    removeBorder(quizImageEl);
    if (event.target.textContent === quizQuestions[currentQuestionIndex].answer) {
        messageEl.textContent = "✅ That is correct!";
        quizImageEl.src = "./images/mainImages/rightAnswer.png";
        score++;
    } else {
        messageEl.textContent = "❌ Sorry, that is incorrect."
        quizImageEl.src = "./images/mainImages/wrongAnswer.png";
    }
    quizContainer.appendChild(quizImageEl);
    next();
}

// Creates a "Next" button to move on to the next question after the result of the previous
// Gives the final score at the end of the quiz
// Provides a reset button to return to the beginning of the app
const next = () => {
    const nextButtonEl = document.createElement('button');
    nextButtonEl.style.display = "block";
    nextButtonEl.style.margin = "20px auto";
    nextButtonEl.textContent = "Next";
    buttonStyle(nextButtonEl, 48, 'Ceviche One');
    quizContainer.appendChild(nextButtonEl);
    nextButtonEl.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            render();
        } else {
            nextButtonEl.remove();
            window.scrollTo(0, 0);
            messageEl.textContent = `Your final score is ${score} out of ${quizQuestions.length}`;
            finalMessage();
            quizContainer.appendChild(resetButtonEl);
        }
    })
}

// Gives one final message based on the user's final score
const finalMessage = () => {
    if (score === 10) {
        finalMessageEl.textContent = "You're too good for this quiz.";
        quizImageEl.src = "./images/mainImages/perfectScore.png";
    } else if (score >= 8) {
        finalMessageEl.textContent = "You really know your stuff!";
        quizImageEl.src = "./images/mainImages/veryGoodScore.png";
    } else if (score >= 5) {
        finalMessageEl.textContent = "Not bad, but it's hard to believe you missed some of these.";
        quizImageEl.src = "./images/mainImages/okayScore.png";
    } else if (score >= 3) {
        finalMessageEl.textContent = "Are you sure you're a fan?";
        quizImageEl.src = "./images/mainImages/mediocreScore.png";
    } else {
        finalMessageEl.textContent = "Well... you tried.";
        quizImageEl.src = "./images/mainImages/poorScore.png";
    }
    quizContainer.appendChild(finalMessageEl);
}

/*----------------------------- Event Listeners -----------------------------*/
document.addEventListener('DOMContentLoaded', home);
titleEl.addEventListener('click', home);
resetButtonEl.addEventListener('click', home);
buttonContainerEl.addEventListener('click', startQuiz);