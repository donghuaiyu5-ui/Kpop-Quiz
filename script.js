const questions = [
  {
    question: "What usually makes you fall for a K-pop group for the first time?",
    answers: [
      { text: "Their performance skills (stage presence, vocals, dance)", type: "A" },
      { text: "A member’s personality or personal story", type: "B" },
      { text: "Recommendations from friends or popularity", type: "C" },
      { text: "A viral clip or short video", type: "D" }
    ]
  },
  {
    question: "When your favorite idol releases new content, what do you do?",
    answers: [
      { text: "Watch it immediately and replay it multiple times", type: "A" },
      { text: "Save it and watch it later at your own pace", type: "B" },
      { text: "Share it with friends and talk about it together", type: "C" },
      { text: "Check it out casually if it catches your interest", type: "D" }
    ]
  },
  {
    question: "What do you value most about an idol?",
    answers: [
      { text: "Talent and skills", type: "A" },
      { text: "Personality and emotional connection", type: "B" },
      { text: "Group dynamics and relationships", type: "C" },
      { text: "Visuals, concepts, and aesthetics", type: "D" }
    ]
  },
  {
    question: "If your favorite group has a concert, what would you most likely do?",
    answers: [
      { text: "Try your best to get tickets and attend in person", type: "A" },
      { text: "Watch the online livestream instead", type: "B" },
      { text: "Go with friends — the shared experience matters most", type: "C" },
      { text: "Just watch clips or highlights afterward", type: "D" }
    ]
  },
  {
    question: "How would you describe your typical way of following K-pop?",
    answers: [
      { text: "Deep dive — I explore everything (old content, interviews, etc.)", type: "A" },
      { text: "Selective — I only follow what I personally enjoy", type: "B" },
      { text: "Social — I engage through discussions and fandom spaces", type: "C" },
      { text: "Casual — I watch whatever shows up on my feed", type: "D" }
    ]
  },
  {
    question: "What is your behavior like on social media as a fan?",
    answers: [
      { text: "I actively support (streaming, voting, defending idols)", type: "A" },
      { text: "I occasionally post or share what I like", type: "B" },
      { text: "I interact a lot — comments, discussions, sharing", type: "C" },
      { text: "I mostly observe and rarely post", type: "D" }
    ]
  },
  {
    question: "If your favorite idol receives criticism online, how do you react?",
    answers: [
      { text: "Defend them and speak up immediately", type: "A" },
      { text: "Support them quietly without engaging in conflict", type: "B" },
      { text: "Talk about it with friends or other fans", type: "C" },
      { text: "Avoid the situation and disengage", type: "D" }
    ]
  },
  {
    question: "What is your ideal way of being a fan?",
    answers: [
      { text: "Fully invested — it’s an important part of my life", type: "A" },
      { text: "Emotionally connected, but still balanced", type: "B" },
      { text: "A fun way to connect with others", type: "C" },
      { text: "Light and casual — just for entertainment", type: "D" }
    ]
  }
];

const results = {
  A: {
    title: "The Aesthetic Visionary",
    description:
      "You are drawn to visuals, concepts, and stage presence. You love when K-pop feels like a whole world with strong styling, storytelling, and artistic direction."
  },
  B: {
    title: "The Chaos Companion",
    description:
      "You love the fun side of fandom. Variety clips, memes, group chemistry, and unhinged fan energy are what make K-pop exciting for you."
  },
  C: {
    title: "The Emotional Loyalist",
    description:
      "You connect to K-pop through feeling. Music becomes part of your life, and your relationship to your favorite artists is deeply personal and comforting."
  },
  D: {
    title: "The Lore Detective",
    description:
      "You notice everything. From hidden meanings to member dynamics to fandom history, you enjoy digging deeper and understanding the full picture."
  }
};

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const resultType = document.getElementById("result-type");
const resultDescription = document.getElementById("result-description");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

function showQuestion() {
  const q = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = q.question;
  answerButtons.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answer.text;

    if (userAnswers[currentQuestion] === index) {
      button.style.background = "#fff0f7";
      button.style.borderColor = "#d94f9d";
    }

    button.addEventListener("click", () => {
      userAnswers[currentQuestion] = index;
      showQuestion();
    });

    answerButtons.appendChild(button);
  });

  prevBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "See Result" : "Next";

  const progressPercent = (currentQuestion / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function getResult() {
  const score = { A: 0, B: 0, C: 0, D: 0 };

  userAnswers.forEach((answerIndex, questionIndex) => {
    if (answerIndex !== null) {
      const type = questions[questionIndex].answers[answerIndex].type;
      score[type]++;
    }
  });

  let finalType = "A";
  let maxScore = 0;

  for (let type in score) {
    if (score[type] > maxScore) {
      maxScore = score[type];
      finalType = type;
    }
  }

  return results[finalType];
}

function showResult() {
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === null) {
      alert("Please answer all questions before seeing your result.");
      return;
    }
  }

  const result = getResult();
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  resultType.textContent = result.title;
  resultDescription.textContent = result.description;
  progressBar.style.width = "100%";
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion === questions.length - 1) {
    showResult();
  } else {
    currentQuestion++;
    showQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
});

showQuestion();