const questions = [
    {
        question: "What is the full form of HTML?",
        answers: [
            { text: "Hyper text markup language", correct: true },
            { text: "Hyper text marginal language", correct: false },
            { text: "High talent marks language", correct: false },
            { text: "Hyper talent markup language", correct: false },
        ]
    },
    {
        question: "What is the full form of CSS?",
        answers: [
            { text: "Cascade style sheets", correct: false },
            { text: "Cascading style sheets", correct: true },
            { text: "Cascading style sheet", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "What is the smallest header in HTML by default?",
        answers: [
            { text: "h1", correct: false },
            { text: "h2", correct: false },
            { text: "h6", correct: true },
            { text: "h4", correct: false },
        ]
    },
    {
        question: "The hr tag in HTML is used for?",
        answers: [
            { text: "New line", correct: false },
            { text: "Vertical ruler", correct: false },
            { text: "New paragraph", correct: false },
            { text: "Horizontal ruler", correct: true },
        ]
    },
    {
        question: "The property used in CSS to change the text color is?",
        answers: [
            { text: "bgcolor", correct: false },
            { text: "color", correct: true },
            { text: "background-color", correct: false },
            { text: "None of the above", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();