import { animeQuestions, disneyQuestions } from "./data.js";
import { animeImageEl, animeButtonEl, disneyImageEl, disneyButtonEl, imageContainerEl, buttonContainerEl, choiceButtonsEl, resetButtonEl } from "./setup.js";

let score;
let currentQuestionIndex;

const quizContainer = document.querySelector('#quiz-container');
const messageEl = document.querySelector('#message');


const init = () => {
    quizContainer.innerHTML = "";
    quizContainer.appendChild(imageContainerEl);
    quizContainer.appendChild(buttonContainerEl);
    messageEl.textContent = "Choose your quiz!";
    score = 0;
    currentQuestionIndex = 0;
    imageContainerEl.appendChild(animeImageEl);
    imageContainerEl.appendChild(disneyImageEl);
    buttonContainerEl.appendChild(animeButtonEl);
    buttonContainerEl.appendChild(disneyButtonEl);
    imageContainerEl.style.display = "flex";
    imageContainerEl.style.gap = "2em";
    buttonContainerEl.style.display = "flex";
    buttonContainerEl.style.justifyContent = "space-around";
    buttonContainerEl.style.marginTop = "1em";
}

document.addEventListener('DOMContentLoaded', init)
    
const render = () => {
    quizContainer.innerHTML = "";
    messageEl.textContent = "What anime is this?"
    const quizImage = document.createElement('img');
    quizImage.src = animeQuestions[currentQuestionIndex].image;
    quizImage.alt = "Anime image";
    quizImage.height = 400;
    quizImage.width = 500;
    quizContainer.appendChild(quizImage);
    quizImage.style.display = "flex";
    choiceButtonsEl.innerHTML = "";
    quizContainer.appendChild(choiceButtonsEl);
    animeQuestions[currentQuestionIndex].choices.forEach((choice) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        choiceButtonsEl.appendChild(choiceButton);
        choiceButton.addEventListener('click', checkAnswer)
        choiceButton.addEventListener('click', next)
    })
}

const checkAnswer = (event) => {
    quizContainer.innerHTML = "";
    if (event.target.textContent === animeQuestions[currentQuestionIndex].answer) {
        messageEl.textContent = "✅ That is correct!";
        score++;
    } else {
        messageEl.textContent = "❌ Sorry, that is incorrect."
    }
}

const next = () => {
    const nextButtonEl = document.createElement('button');
    nextButtonEl.textContent = "Next"
    quizContainer.appendChild(nextButtonEl)
    nextButtonEl.addEventListener('click', () => {
        currentQuestionIndex++;
        nextButtonEl.remove();
        if (currentQuestionIndex < animeQuestions.length) {
            render();
        } else {
            messageEl.textContent = `Your final score is ${score} out of ${animeQuestions.length}`;
            finalMessage();
            quizContainer.appendChild(resetButtonEl);
        }
    })
}

const finalMessage = () => {
    const finalMessageEl = document.createElement('h2');
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


resetButtonEl.addEventListener('click', init);

animeButtonEl.addEventListener('click', render);