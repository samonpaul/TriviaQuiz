

// Load game html

function LoadGameHtml() {
const options = document.querySelectorAll(".option");
const mainScore = document.getElementById("score");
const questionContainer = document.querySelector(".question_container");
const progressBar = document.querySelector(".progress-bar");
const scoreOverlay = document.querySelector(".score-overlay");
const loader = document.getElementById('loader');
const questionNumber = document.querySelector('.question-number');


  let score = 0;
  let questionCounter = 0;
  let currentQuestion = {};
  let availableQuestions = [];

  // Constants
  const marksForCorrect = 10;
  const totalQuestions = 10;

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple",
    true
  );
  xhr.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(this.responseText);
      availableQuestions = [...res.results];
      // console.log(availableQuestions);
      startGame();
    } else {
      console.log("fetch api - error");
    }
  };

  xhr.send();

  function startGame() {
    score = 0;
    questionCounter = 0;
    getNewQuestion();
  }

  function getNewQuestion() {
    if (questionCounter != totalQuestions) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    loader.classList.remove('hidden');

    if (questionCounter == totalQuestions) {
      // save data to local storage
        localStorage.setItem("mainScore", score);
        loader.classList.add('hidden');
        return loadEndSnippet();
    }

    questionCounter++;

    // ProgressBar
    progressBar.style.width = `${questionCounter * 10}%`;

    let randomNum = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomNum];
    availableQuestions.splice(randomNum, 1);

    // Show number
    questionNumber.textContent = `Question - ${questionCounter}/${totalQuestions}`;

    // Show Question
    questionContainer.innerHTML = `<p id="question">${currentQuestion.question}</p>`;

    loadChoices(currentQuestion);
  }

  function loadChoices(choices) {
    var wrongChoices = [...choices.incorrect_answers];
    var correctChoice = choices.correct_answer;
    var currentChoices = wrongChoices;

    choices.answer = Math.floor(Math.random() * wrongChoices.length);
    currentChoices.splice(choices.answer, 0, correctChoice);

    // console.log(choices);
    // console.log(currentChoices);

    options.forEach(function (option) {
      let num = option.dataset.value;
      option.innerHTML = `<p class="option-data">${
        currentChoices[num - 1]
      }</p>`;
    });

    loader.classList.add('hidden');

    pointerOn();
  }

  options.forEach(function (option) {
    option.addEventListener("click", function (e) {
      let selectedVal = option.dataset.value;

      if (selectedVal - 1 == currentQuestion.answer) {
        // console.log('Matched');
        score += marksForCorrect;
        option.classList.add("correct");
        pointerNone();



        setTimeout(() => {
        // show score
        mainScore.textContent = score;
        scoreOverlay.style.background = `conic-gradient(
                var(--white) ${score}%,
                var(--primary-blue) ${score}%
            )`;
        }, 300);

        setTimeout(() => {
          option.classList.remove("correct");
          getNewQuestion();
        }, 1000);
      } else {
        // console.log('not Matched');
        option.classList.add("incorrect");
        pointerNone();
        setTimeout(() => {
          option.classList.remove("incorrect");
          getNewQuestion();
        }, 1000);
      }
    });
  });

  function pointerNone() {
    options.forEach(function (opt) {
      opt.classList.add("pointer-none");
    });
  }

  function pointerOn() {
    options.forEach(function (opt) {
      opt.classList.remove("pointer-none");
    });
  }
}
