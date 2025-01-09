//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let backButton = document.getElementById("back-button");

let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options---
const quizArray = [
    {
        id: "01",
        question: "What is 5 + 3?",
        options: ["10", "32", "8", "9"],
        correct: "8",
    },
    {
        id: "1",
        question: "Which is the only continent in the world without a desert?",
        options: ["North America", "Asia", "Africa", "Europe"],
        correct: "Europe",
    },
    {
        id: "2",
        question: "Who invented Computer?",
        options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
        correct: "Charles Babbage",
    },
    {
        id: "3",
        question: "What do you call a computer on a network that requests files from another computer?",
        options: ["A client", "A host", "A router", "A web server"],
        correct: "A client",
    },
    {
        id: "4",
        question: "Hardware devices that are not part of the main computer system and are often added later to the system.",
        options: ["Peripheral", "Clip art", "Highlight", "Execute"],
        correct: "Peripheral",
    },
    {
        id: "5",
        question: "The main computer that stores the files that can be sent to computers that are networked together is:",
        options: ["Clip art", "Mother board", "Peripheral", "File server"],
        correct: "File server",
    }, {
        id: "6",
        question: "How can you catch a computer virus?",
        options: ["Sending e-mail messages", "Using a laptop during the winter", "Opening e-mail attachments", "Shopping on-line"],
        correct: "Opening e-mail attachments",
    },
    {
        id: "7",
        question: "Google (www.google.com) is a:",
        options: ["Search Engine", "Number in Math", "Directory of images", "Chat service on the web"],
        correct: "Search Engine",
    },
    {
        id: "8",
        question: "Which is not an Internet protocol?",
        options: ["HTTP", "FTP", "STP", "IP"],
        correct: "STP",
    },
    {
        id: "9",
        question: "Which of the following is not a valid domain name?",
        options: ["www.yahoo.com", "www.yahoo.co.uk", "www.com.yahoo", "www.yahoo.co.in"],
        correct: "www.com.yahoo",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        // Increment questionCount after the user clicks Next
        questionCount += 1;

        // If last question
        if (questionCount === quizArray.length) {
            // Hide the question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");

            // Display the user's score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + quizArray.length;
        } else {
            // Display the question number correctly (1-based index)
            countOfQuestion.innerHTML =
                (questionCount + 1) + " of " + quizArray.length + " Question";

            // Display the next question
            quizDisplay(questionCount);

            // Reset the timer for the next question
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to highlight the selected option
function checker(userOption) {
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    // Get the correct answer for the current question
    let correctAnswer = quizArray[questionCount].correct;

    // Remove highlight from all options
    options.forEach((element) => {
        element.classList.remove("selected"); // Remove any existing selection
    });

    // Highlight the selected option
    userOption.classList.add("selected");

    // Disable all options to prevent further selection
    options.forEach((element) => {
        element.disabled = true;
    });

    // Check if the selected option is correct
    if (userOption.innerText === correctAnswer) {
        scoreCount++; // Increment score if answer is correct
    }

    // Clear interval (stop timer)
    clearInterval(countdown);
}



//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

backButton.addEventListener("click", () => {
    window.location.href = "index.html"; 
});


//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};