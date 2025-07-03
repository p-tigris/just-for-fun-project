import { animeQuestions, disneyQuestions } from "./data.js";
import { animeImageEl, animeButtonEl, disneyImageEl, disneyButtonEl, resetButtonEl } from "./setup.js";

let score;
let currentQuestionIndex;

const quizContainer = document.querySelector('#quiz-container');

const imageContainer = document.createElement('div');
const buttonContainer = document.createElement('div');

const messageEl = document.querySelector('#message');



const init = () => {
    quizContainer.innerHTML = "";
    quizContainer.appendChild(imageContainer);
    quizContainer.appendChild(buttonContainer);
    imageContainer.style.display = "flex";
    imageContainer.style.gap = "2em";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-around";
    buttonContainer.style.marginTop = "1em";
    messageEl.textContent = "Choose your quiz!";
    score = 0;
    currentQuestionIndex = 0;
    imageContainer.appendChild(animeImageEl);
    imageContainer.appendChild(disneyImageEl);
    buttonContainer.appendChild(animeButtonEl);
    buttonContainer.appendChild(disneyButtonEl);
}

document.addEventListener('DOMContentLoaded', init)

const initAnimeQuiz = () => {
    init();
    render();
}
    
const render = () => {
    quizContainer.innerHTML = "";
    quizContainer.style.display = "flex";
    messageEl.textContent = "What anime is this?"
    const quizImage = document.createElement('img');
    quizImage.src = animeQuestions[currentQuestionIndex].image;
    quizImage.alt = "Anime image";
    quizImage.height = 400;
    quizImage.width = 500;
    quizContainer.appendChild(quizImage);
    animeQuestions[currentQuestionIndex].choices.forEach((choice) => {
        const choiceButton = document.createElement('button');
        choiceButton.textContent = choice;
        quizContainer.appendChild(choiceButton);
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

const initDisneyQuiz = () => {
    init();

    disneyImage.height = 500;
    disneyImage.width = 500;

    messageEl.innerHTML = "Guess the Disney lyrics!";
    
}