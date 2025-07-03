// Home page elements
export const animeImageEl = document.createElement('img');
animeImageEl.src = "./images/anime-image.jpg";
animeImageEl.height = 200;
animeImageEl.width = 300;

export const disneyImageEl = document.createElement('img');
disneyImageEl.src = "./images/disney-image.jpg";
disneyImageEl.height = 200;
disneyImageEl.width = 300;

export const animeButtonEl = document.createElement('button');
animeButtonEl.textContent = "Guess the Anime"

export const disneyButtonEl = document.createElement('button');
disneyButtonEl.textContent = "Guess the Disney Lyrics";

// Containers to hold the above images and buttons
export const imageContainerEl = document.createElement('div');
export const buttonContainerEl = document.createElement('div');

// Choice buttons for each quiz question
export const choiceButtonsEl = document.createElement('div');
choiceButtonsEl.style.display = "grid";
choiceButtonsEl.style.justifyContent = "center";
choiceButtonsEl.style.alignItems = "center";
choiceButtonsEl.style.gridTemplateColumns = "repeat(2, 200px)";
choiceButtonsEl.style.gap = "10px";
choiceButtonsEl.style.marginTop = "20px";

// Reset button for end of quiz
export const resetButtonEl = document.createElement('button');
resetButtonEl.textContent = "Return to Home Page";