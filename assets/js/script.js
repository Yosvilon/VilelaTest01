// List of Questions and Answers

var questions = [
    {


      
        prompt: "¿A qué se refiere la inteligencia interpersonal?",
        options: ["A)	Se refiere a la capacidad de una persona para comprender y comunicarse efectivamente con los demás, así como para comprender y trabajar con sus emociones, motivaciones y pensamientos.", 
        "B)	Cuando una persona que se trata a sí misma con amabilidad, pero no comprende sus propios errores ni la capacidad para perdonarse. ", 
        "C)	Se refiere a desarrollar una buena capacidad de trabajo en equipo implica poder tomar en cuenta solo las ideas de uno mismo. ", 
        "D)	A que permitirán tener una mejor capacidad de resolución de conflictos a través de estrategias creativas. "],
        answer: "A)	Se refiere a la capacidad de una persona para comprender y comunicarse efectivamente con los demás, así como para comprender y trabajar con sus emociones, motivaciones y pensamientos."
    },

    {
        prompt: "¿En que año Howard Gardner propuso la Teoría de las Inteligencias Múltiples? ",
        options: ["A) En 1988", 
        "B) En 1938", 
        "C) En 1993", 
        "D) En 1983"],
        answer: "D) En 1983"
   },

   {
    prompt: "	¿Qué es la empatía? ",
    options: ["A)	Es la competencia o habilidades que dicho individuo alcanza.", 
    "B)	Se refiere a lo que una persona puede comunicar sin palabras, como el lenguaje corporal o el tono de voz. ", 
    "C)	Es la capacidad de una persona para comprender y experimentar los sentimientos y emociones de otra persona.", 
    "D)	Es la que implica poder hacer frente a los problemas de escasez de información. "],
    answer: "C)	Es la capacidad de una persona para comprender y experimentar los sentimientos y emociones de otra persona."
    },


    {
      prompt: " ¿Qué son las destrezas? ",
      options: ["A)	Son competencias o habilidades que dicho individuo alcanzó.", 
      "B)	Es la capacidad de una persona para comprender y experimentar los sentimientos y emociones de otra persona. ", 
      "C)	Es la que implica poder hacer frente a los problemas de escasez de información.  ", 
      "D)	A que permitirán tener una mejor capacidad de resolución de conflictos a través de estrategias creativas.  "],
      answer: "A)	Son competencias o habilidades que dicho individuo alcanzó."
   },
   
   {
    prompt: " ¿Cuáles son las 4 competencias importantes en la inteligencia emocional? ",
    options: ["A) Trabajo en equipo, Comunicación escrita, empatía. ", 
    "B)	Habilidades de negociación, mediación, Toma de decisiones.  ", 
    "C)	Percepción de las emociones, comprensión de las emociones, control de las emociones y uso de las emociones.", 
    "D)	La empatía, destreza, emociones.   "],
    answer: "C)	Percepción de las emociones, comprensión de las emociones, control de las emociones y uso de las emociones."

    }];

    
// Get Dom Elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");

// Quiz's initial state

var currentQuestionIndex = 0;
var time = questions.length * 20;
var timerId;

// Start quiz and hide frontpage

function quizStart() {
    timerId = setInterval(clockTick, 9999999999999999);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

// Loop through array of questions and answers and create list with buttons

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
  var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild(choiceBtn);
    });
}

// Check for right answers and deduct time for wrong answer, go to next question

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      time -= 20;
      if (time < 0) {
        time = 0;
      }
      timerEl.textContent = time;
      feedbackEl.textContent = `Sorry! La respuesta correcta era: ${questions[currentQuestionIndex].answer}`;
      feedbackEl.style.color = "red";
      feedbackEl.style.shadow = "black";
      feedbackEl.style.backgroundColor = "Ivory";

    } else {
      feedbackEl.textContent = "Correcto, ¡qué listo eres!";
      feedbackEl.style.color = "green";
      feedbackEl.style.color = "red";
      feedbackEl.style.shadow = "black";
      feedbackEl.style.backgroundColor = "Ivory";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 15000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
}

// End quiz by hiding questions, stop timer and show final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

// End quiz if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      quizEnd();
    }
}

// Save score in local storage along with users' name

function saveHighscore() {
    var name = nameEl.value.trim();
    if (name !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
      var newScore = {
        score: time,
        name: name
      };
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore; 

// Start quiz after clicking start quiz

startBtn.onclick = quizStart;




