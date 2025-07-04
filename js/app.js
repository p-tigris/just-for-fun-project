import { animeQuestions, disneyQuestions } from "./data.js";
import { animeImageEl, animeButtonEl, disneyImageEl, disneyButtonEl, 
    imageContainerEl, buttonContainerEl, quizImageEl, choiceButtonsEl, 
    finalMessageEl, resetButtonEl } from "./setup.js";

let score;
let currentQuestionIndex;
let quizQuestions;

const quizContainer = document.querySelector('#quiz-container');
const messageEl = document.querySelector('#message');


const home = () => {
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

const startQuiz = (event) => {
    if (event.target.textContent === "Guess the Anime") {
        quizQuestions = animeQuestions;
    } else if (event.target.textContent === "Guess the Disney Lyrics") {
        quizQuestions = disneyQuestions;
    }
    render();
}
    
const render = () => {
    messageEl.textContent = quizQuestions[currentQuestionIndex].question;
    quizContainer.innerHTML = "";
    quizImageEl.src = quizQuestions[currentQuestionIndex].image;
    quizContainer.appendChild(quizImageEl);
    choiceButtonsEl.innerHTML = "";
    quizContainer.appendChild(choiceButtonsEl);
    quizQuestions[currentQuestionIndex].choices.forEach((choice) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButtonsEl.appendChild(choiceButton);
        choiceButtonsEl.addEventListener('click', checkAnswer)
    })
}

const checkAnswer = (event) => {
    quizContainer.innerHTML = "";
    if (event.target.textContent === quizQuestions[currentQuestionIndex].answer) {
        messageEl.textContent = "✅ That is correct!";
        score++;
    } else {
        messageEl.textContent = "❌ Sorry, that is incorrect."
    }
    next();
}

const next = () => {
    const nextButtonEl = document.createElement('button');
    nextButtonEl.textContent = "Next"
    quizContainer.appendChild(nextButtonEl)
    nextButtonEl.addEventListener('click', () => {
        currentQuestionIndex++;
        nextButtonEl.remove();
        if (currentQuestionIndex < quizQuestions.length) {
            render();
        } else {
            messageEl.textContent = `Your final score is ${score} out of ${animeQuestions.length}`;
            finalMessage();
            quizContainer.appendChild(resetButtonEl);
        }
    })
}

const finalMessage = () => {
    if (score === 10) {
        finalMessageEl.textContent = "You're too good for this quiz."
    } else if (score >= 8) {
        finalMessageEl.textContent = "You really know your stuff!"
    } else if (score >= 5) {
        finalMessageEl.textContent = "Not bad, but it's hard to believe you missed some of these"
    } else if (score >= 3) {
        finalMessageEl.textContent = "Are you sure you're a fan?"
    } else {
        finalMessageEl.textContent = "Well... you tried."
    }
    quizContainer.appendChild(finalMessageEl);
}

document.addEventListener('DOMContentLoaded', home)
resetButtonEl.addEventListener('click', home);
buttonContainerEl.addEventListener('click', startQuiz);