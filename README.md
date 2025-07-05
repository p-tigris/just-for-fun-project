![Question Marks](https://plus.unsplash.com/premium_photo-1680303134543-330dceac7d7b?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

# Mick's Just For Fun Quiz App

A quiz app made out of boredom, but also to showcase the various concepts learned in the software engineering class so far. 

**Concepts include:**

* HTML setup
* CSS styles, selectors and properties
* JavaScript Functions
* JavaScript Arrays and Iterator Methods
* JavaScript Objects
* DOM Manipulation
  * Query selectors
  * Event listeners
  * Element creation

The app starts on a home screen with two quizzes: one quiz tests the user's knowledge of anime, and the other quiz tests the user's knowledge of lyrics from Disney songs. Users select the quiz they wish to take.

## Table of Contents
1. [Guess the Anime](#guess-the-anime)
2. [Guess the Disney Lyrics](#guess-the-disney-lyrics)
3. [General Quiz Mechanics](#general-quiz-mechanics)
4. [Code Structure](#code-structure)
    1. [app.js](#app-js)
    2. [setup.js](#setup-js)
    3. [data.js](#data-js)
5. [Other Important Information and Acknowledgments](#other-info-and-acknowledgments)

<a id="guess-the-anime"></a>
## Guess the Anime

The quiz consists of questions that ask the user to guess which anime is shown in the given image. The user is given four buttons consisting of choices and must click on the button with their preferred answer. The message above each image consists of some personal commentary of each anime.

<a id="guess-the-disney-lyrics"></a>
## Guess the Disney Lyrics

The quiz consists of questions that ask the user to guess the lyrics of various Disney songs. Some questions give a line of a song and then ask the user what the preceding or succeeding line is. Some questions also ask the user to fill in the blank.

<a id="general-quiz-mechanics"></a>
## 🔧 General Quiz Mechanics

The quiz starts upon clicking one of the initial buttons on the home screen. The user chooses from one of four choices. After a choice is made, the app checks to see if the user's choice is the correct one. The user is told whether or not the choice is correct in the next screen. The user is then prompted to click a "Next" button to move on to the next screen. At the end of the quiz, the app tells the user their final score and gives a message based on that score. The user is then prompted to return to the home screen.

<a id="code-structure"></a>
## 🧱 Code Structure

The JavaScript code is divided into three files to keep the code from becoming cluttered, and also to separate different functionalities from others. The `app.js` file contains the core functionalities of the app, executing the quiz as needed. The `setup.js` file contains various elements that were dynamically created and used throughout the quiz. The `data.js` file consists of arrays of objects for both the anime and Disney quizzes; these arrays of objects include the questions, the choices and the answers for each one.

<a id="app-js"></a>
### app.js

The `home()` function sets up the home screen, which consists of two images and two buttons, one for each corresponding quiz. It also initializes variables such as `score`, the user's score, and `currentIndexNumber`, which loops through the data array, that will be used in other parts of the code. This function is called upon loading the app.

```
document.addEventListener('DOMContentLoaded', home);
```

This function as well as others, also uses a line of code to ensure the screen is scrolled up to the top regardless of which screen the user is on.

```
window.scrollTo(0, 0) // Makes sure the user is scrolled up to the top at the beginning of every screen
```

The `startquiz()` function, as you may have guessed, starts the quiz based on an event listener that checks to see if one of the initial buttons was clicked on.

```
buttonContainerEl.addEventListener('click', startQuiz);
```

It also ensures that the quiz only starts if one of the buttons is clicked, and nothing else within the button container.

```
(event) => {
    if (!event.target.classList.contains("quiz")) {
        return; // Ensures only buttons are clicked
    }
    /* ... rest of the code */
}
```

It checks which quiz was chosen, and takes data from the respective data array. The data is stored in a previously declared `quizQuestions` variable.

```
if (event.target.textContent === "Guess the Anime") {
    quizQuestions = animeQuestions;
} else if (event.target.textContent === "Guess the Disney Lyrics") {
    quizQuestions = disneyQuestions;
}
```

It then calls on a `render()` function, **the most important function of all**.

The `render()` function displays the quiz question, the corresponding image, and the choices, taking data from the `data.js` file. The quiz container's current elements are cleared out from its initialization and the new data is then appended to it. 

The `currentQuestionIndex` variable is used to determine which question the user is currently on. Choice buttons are created using a `forEach()` iterator and kept in a button container. This button container is used for another event listener that checks to see which choice the user has clicked on.

```
/* ... */
quizContainer.innerHTML = ""; // Clears quiz container for new elements
imageStyles(quizImageEl);
quizImageEl.src = quizQuestions[currentQuestionIndex].image;
quizContainer.appendChild(quizImageEl);
choiceButtonsEl.innerHTML = "";
quizContainer.appendChild(choiceButtonsEl);

quizQuestions[currentQuestionIndex].choices.forEach((choice) => {
    const choiceButton = document.createElement('button');
    choiceButton.textContent = choice;
    choiceButton.classList.add("choice");
    /* ... */
    choiceButtonsEl.appendChild(choiceButton);
    choiceButtonsEl.addEventListener('click', checkAnswer);
})
```

The `checkAnswer()` function, much like the `startQuiz()` function, checks to make sure the user clicks on a button first. Once this is done, the app compares the chosen button's text to the correct answer, and lets the user know if it was correct. If it was, then the `score` variable is increased by 1 and the app goes to a new screen and tells the user they were correct. If not, then the user is told that their chosen selection was incorrect.

```
if (event.target.textContent === quizQuestions[currentQuestionIndex].answer) {
    messageEl.textContent = "✅ That is correct!";
    /* ... */
    score++;
} else {
    messageEl.textContent = "❌ Sorry, that is incorrect."
    /* ... */
}
```

The user is also given a "Next" button on the same screen which is created through the `next()` function which is called in the `checkAnswer()` right after.

The `next()` function creates another button that lets the user move on to the next screen after receiving the result of the previous question. If the quiz still has questions remaining, then upon the user clicking the button, the `currentQuestionIndex` is incremented and the `render()` function is called again in a somewhat recursive way, moving on to the next question. If the user has reached the end of the quiz, then the user moves on to a screen showing their final score and message associated with it.

```
nextButtonEl.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            render();
        } else {
            nextButtonEl.remove();
            window.scrollTo(0, 0);
            messageEl.textContent = `Your final score is ${score} out of ${quizQuestions.length}`;
            /* ... */
        }
    })
```

If the end of the quiz is reached, then the `finalMessage()` function is called. Depending on the user's score, a new screen with a certain message will appear along with their final score.

```
if (score === 10) {
    finalMessageEl.textContent = "You're too good for this quiz.";
    /* ... */
} else if (/* ... */) {
    /* ... */
}
```

Finally, from the end of the `next()` function, a reset button is at the end of this final screen, allowing the user to return to the home screen. This button relies on an event listener calling the `home()` function and resets the app to its original state.

```
resetButtonEl.addEventListener('click', home);
```

> Side note: Clicking on the title at the top of the app also resets the quiz and returns the user to the home screen!

<a id="setup-js"></a>
### setup.js

This file consists of various elements that were created so they can be added as needed to the app. These include the initial images and buttons from the home screen as their corresponding containers, quiz images and all other buttons that were used throughout the quiz. The elements are *exported* for use in the `app.js` file, where they are *imported*. The `export` keyword allows them to be sent to another file, which uses the `import` keyword.

***Example:***

```
export const choiceButtonsEl = document.createElement('div');
```
It is then referenced in the `app.js` file:

```
import { /* ... */, choiceButtonsEl, /* ... */} from "./setup.js";
```

The file is primarily used for styling purposes, consisting of various DOM style properties being used for design.

***Example:***
```
choiceButtonsEl.style.display = "grid";
choiceButtonsEl.style.justifyContent = "center";
choiceButtonsEl.style.alignItems = "center";
choiceButtonsEl.style.gridTemplateColumns = "repeat(2, 200px)";
choiceButtonsEl.style.gap = "20px";
choiceButtonsEl.style.marginTop = "20px";
```

The above snippet shows the choice buttons for each quiz being displayed in a 2x2 grid format, with the use of the `display` and `gridTemplateColumns` properties.

The file also consists of functions that were used for styling purposes as well throughout the `app.js` and `setup.js` files.

***Styling images:***

```
export const imageStyles = (image) => {
    image.style.borderStyle = "ridge";
    image.style.borderRadius = "20px";
    image.style.height = "400px";
    image.style.width = "600px";
}
```
```
export const removeBorder = (image) => {
    image.style.borderStyle = "none";
}
```
One particular design choice was made in the function below, **which allowed for different font and font sizes depending on corresponding buttons by taking both values as parameters.** It also added effects upon hovering over the buttons.

```
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
```

<a id="data-js"></a>
### data.js

This file consists of the data used for the quizzes. There are currently two arrays of objects, one for `animeQuestions` and one for `disneyQuestions`. Each object in these arrays consist of four properties: `image`,`question`,`choices`, and `answer`.

```
{
    image: "...",
    question: "...",
    choices: ["...", "...", "...", "..."],
    answer: "...",
}
```

The first three property values are taken by the `app.js` file and used in the `render()` function. The `answer` property is used by the `checkAnswer()` function. More objects can be easily added to both arrays and the quiz could theoretically extend indefinitely, but for the purposes of this demonstration, there are ten objects for ten total questions on each quiz.

<a id="other-info-and-acknowledgments"></a>
## Other Important Information and Acknowledgments

The `style.css` file contains styles for the `index.html` file. It is mainly used for adding fonts that were imported from [Google Fonts](https://developer.mozilla.org/en-US/) for usage on the title and message underneath, as well as adding flex properties to the body of the app.

This app is primarily desktop-focused. Responsiveness may come in a future update. 

No installation required for offline usage or modification of the source code. To run the app locally, clone from the repository, and open the `index.html` file in your browser. To run the app remotely, **[access it here on GitHub Pages](https://p-tigris.github.io/just-for-fun-project/)**.

Images are taken from the Internet and screencapped from their respective IPs. They are being used for non-commercial purposes and constitute Fair Use. All images are the property of their respective owners.

The app was created with the knowledge that was gained from the class so far, and a little help from some independent studying on the Internet, particularly the [Mozilla Developer Network](https://developer.mozilla.org/en-US/). 

AI was used for debugging assistance and occasional design ideas. **This app was not created by AI**. 

For demo and educational use only.