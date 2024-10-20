// Questions for Chemistry and Physics, easy and hard levels
const questions = {
  chemistry: {
    easy: [
      { question: "What is H2O?", answer: "Water" },
      { question: "What is the symbol for Sodium?", answer: "Na" },
    ],
    hard: [
      { question: "What is the molar mass of NaCl?", answer: "58.44 g/mol" },
      { question: "What is the speed of light?", answer: "299792458 m/s" },
    ],
  },
  physics: {
    easy: [
      { question: "What is Newton's first law?", answer: "Inertia" },
      { question: "What is the unit of force?", answer: "Newton" },
    ],
    hard: [
      {
        question: "What is the gravitational constant?",
        answer: "6.67430×10−11 m3 kg−1 s−2",
      },
      {
        question: "What is the formula for kinetic energy?",
        answer: "0.5mv^2",
      },
    ],
  },
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;

// Validating login information
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username.includes(" ") || username.includes("_")) {
    document.getElementById("login-error").innerText =
      "Invalid username! No spaces or underscores allowed.";
    return;
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password)
  ) {
    document.getElementById("login-error").innerText =
      "Password must be at least 8 chars, include 1 uppercase and 1 lowercase.";
    return;
  }

  startQuiz();
}

// Start the quiz
function startQuiz() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");

  const topic = prompt("Choose a topic: Chemistry or Physics").toLowerCase();
  const level = prompt("Choose a level: Easy or Hard").toLowerCase();

  if (topic !== "chemistry" && topic !== "physics") {
    alert("Invalid topic selected. Defaulting to Chemistry.");
    topic = "chemistry";
  }

  if (level !== "easy" && level !== "hard") {
    alert("Invalid level selected. Defaulting to Easy.");
    level = "easy";
  }

  currentQuestions = questions[topic][level];
  document.getElementById("topic-name").innerText = ` ${topic} (${level})`;

  shuffleQuestions();
  displayQuestion();
}

// Shuffle the questions to make them random
function shuffleQuestions() {
  currentQuestions.sort(() => Math.random() - 0.5);
}

// Display the current question
function displayQuestion() {
  if (currentQuestionIndex < currentQuestions.length) {
    document.getElementById("question").innerText =
      currentQuestions[currentQuestionIndex].question;
    timeLeft = 10; // Timer for each question
    document.getElementById("time-left").innerText = timeLeft;
    startTimer();
  } else {
    endQuiz();
  }
}

// Start the timer for each question
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time is over!");
      nextQuestion();
    }
  }, 1000);
}

// Submit the answer and move to the next question
function submitAnswer() {
  clearInterval(timer);
  const userAnswer = document
    .getElementById("answer")
    .value.trim()
    .toLowerCase();
  const correctAnswer =
    currentQuestions[currentQuestionIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    score +=
      currentQuestions[currentQuestionIndex].difficulty === "easy" ? 1 : 3;
    document.getElementById("feedback").innerText = "Correct!";
  } else {
    document.getElementById("feedback").innerText = "Wrong!";
  }

  nextQuestion();
}

// Move to the next question
function nextQuestion() {
  currentQuestionIndex++;
  document.getElementById("answer").value = ""; // Clear the input field
  displayQuestion();
}

// End the quiz and show the results
function endQuiz() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  document.getElementById("final-score").innerText = score;
  document.getElementById("performance").innerText =
    score <= 10 ? "Bad" : score <= 20 ? "Fair" : "Good";
}

// Retry the quiz
function retry() {
  score = 0;
  currentQuestionIndex = 0;
  startQuiz();
}

// Logout and return to the login screen
function logout() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("result-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
}
