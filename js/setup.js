// Styles for images (Design choice)
export const imageStyles = (image) => {
    image.style.borderStyle = "ridge";
    image.style.borderRadius = "20px";
    image.style.height = "400px";
    image.style.width = "600px";
}

// Just a function to remove the border on certain images (Design choice)
export const removeBorder = (image) => {
    image.style.borderStyle = "none";
}

// Home page elements
export const animeImageEl = document.createElement('img');
animeImageEl.src = "./images/mainImages/animeCoverImage.jpg";
animeImageEl.alt = "Anime Cover Image";
imageStyles(animeImageEl);

export const disneyImageEl = document.createElement('img');
disneyImageEl.src = "./images/mainImages/disneyCoverImage.jpg";
disneyImageEl.alt = "Disney Cover Image";
imageStyles(disneyImageEl);

export const animeButtonEl = document.createElement('button');
animeButtonEl.textContent = "Guess the Anime";
animeButtonEl.classList.add('quiz')

export const disneyButtonEl = document.createElement('button');
disneyButtonEl.textContent = "Guess the Disney Lyrics";
disneyButtonEl.classList.add('quiz')

// Function for styling buttons
export const buttonStyle = (button, fontSize, font) => {
    button.style.padding = "10px";
    button.style.borderStyle = "ridge";
    button.style.borderRadius = "20px";
    button.style.background = "radial-gradient(circle, #103783 0%, #439cfb 50%, #000000 100%)";
    button.style.color = "#ffffff";
    button.style.font = `${fontSize}px ${font}, Arial, sans-serif`;
    button.style.boxShadow = "0 10px #103783";
    button.style.cursor = "pointer";
    button.addEventListener('mouseover', () => {
        button.style.background = "radial-gradient(circle, #103783 0%, #439cfb 50%, #103783 100%)";
    })
    button.addEventListener('mouseout', () => {
        button.style.background = "radial-gradient(circle, #103783 0%, #439cfb 50%, #000000 100%)";
    })
    button.addEventListener('click', () => {
        button.style.background = "radial-gradient(circle, #103783 0%, #439cfb 50%, #000000 100%)";
    })
}

// Style both of the above buttons the same way
const buttons = [animeButtonEl, disneyButtonEl];
buttons.forEach((button) => {
    buttonStyle(button, 48, 'Ceviche One');
});

// Containers to hold the above images and buttons, for flex purposes
export const imageContainerEl = document.createElement('div');
export const buttonContainerEl = document.createElement('div');
imageContainerEl.style.display = "flex";
imageContainerEl.style.gap = "2em";
buttonContainerEl.style.display = "flex";
buttonContainerEl.style.justifyContent = "space-between";
buttonContainerEl.style.alignItems = "center";
buttonContainerEl.style.marginTop = "1em";

// Image for each quiz question
export const quizImageEl = document.createElement('img');
quizImageEl.alt = "Quiz Image";
quizImageEl.style.display = "flex";

// Choice buttons container for each quiz question
export const choiceButtonsEl = document.createElement('div');
choiceButtonsEl.style.display = "grid";
choiceButtonsEl.style.justifyContent = "center";
choiceButtonsEl.style.alignItems = "center";
choiceButtonsEl.style.gridTemplateColumns = "repeat(2, 200px)";
choiceButtonsEl.style.gap = "20px";
choiceButtonsEl.style.marginTop = "20px";

// Final message at the end of the quiz
export const finalMessageEl = document.createElement('h2');
finalMessageEl.style.color = "#ffffff";
finalMessageEl.style.fontFamily = "Courgette";
finalMessageEl.style.textAlign = "center";

// Reset button for end of quiz
export const resetButtonEl = document.createElement('button');
resetButtonEl.textContent = "Return Home";
resetButtonEl.style.display = "block";
resetButtonEl.style.margin = "auto";
buttonStyle(resetButtonEl, 48, 'Ceviche One');