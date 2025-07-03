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

// Reset button for end of quiz
export const resetButtonEl = document.createElement('button');
resetButtonEl.textContent = "Return to Home Page";