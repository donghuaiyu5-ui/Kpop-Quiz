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
    title: "The Core Stan",
    image: "images/core-stan.jpg",
    description:
      "You’re all in. Comebacks are events, not just releases, and you somehow know every era, inside joke, and chaotic moment in the fandom. Being a fan isn’t just something you do—it’s part of your personality now.",
    vibe: "🔥 Passionate • Loyal • Dedicated",
    groups: [
    { group: "Enhypen", song: "Bite Me" },
    { group: "Ateez", song: "Crazy Form" }
    ]
  },
  B: {
    title: "The Emotional Supporter",
    image: "images/emotional-supporter.jpg",
    description:
      "You connect with K-pop on a deeper level. The music, lyrics, and the members’ stories often feel personal, and sometimes a single song can completely change your mood. For you, K-pop is comfort as much as it is entertainment.",
    vibe: "🌙 Warm • Empathetic • Comforting",
    groups: [
    { group: "TXT", song: "Love Language" },
    { group: "Lesserafim", song: "Blue Flame" }
    ]
  },
  C: {
    title: "The Social Fan",
    image: "images/social-fan.jpg",
    description:
      "Half the fun of K-pop is talking about it with other people. Group chats explode during comebacks, memes appear instantly, and reactions are always dramatic. For you, the fandom experience is just as exciting as the music.",
    vibe: "🎊 Energetic • Expressive • Community-Driven",
    groups: [
    { group: "Twice", song: "The Feels" },
    { group: "P1Harmony", song: "DUH!" }
    ]
    },
  D: {
    title: "The Casual Listener",
    image: "images/casual-listener.jpg",
    description:
      "You enjoy K-pop when it shows up on your playlist, and that’s enough. A catchy song or cool performance will get your attention, but you don’t feel the need to follow every update. You’re here for the vibes, not the full-time commitment.",
    vibe: "✨ Chill • Easygoing • Laid-back",
    groups: [
    { group: "NewJeans", song: "Hype Boy" },
    { group: "Aespa", song: "Better Things" }
    ]
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
const resultImage = document.getElementById("result-image");
const resultVibe = document.getElementById("result-vibe");
const resultGroups = document.getElementById("result-groups");
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
      button.style.background = "#EAF4E1";
      button.style.borderColor = "#A0CD79";
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
  resultImage.src = result.image;
  resultImage.alt = result.title;
  resultDescription.textContent = result.description;
  resultVibe.textContent = "Vibe: " + result.vibe;
  
  let groupHTML = "<ul>";

  result.groups.forEach(item => {
    groupHTML += `<li><strong>${item.group}</strong> — <em>"${item.song}"</em></li>`;
  });

  groupHTML += "</ul>";

  resultGroups.innerHTML = groupHTML;

  progressBar.style.width = "100%";
  document.body.className = "";

  if (result.title === "The Core Stan") {
    document.body.classList.add("core");
  }

  if (result.title === "The Emotional Supporter") {
    document.body.classList.add("emotional");
  }

  if (result.title === "The Social Fan") {
    document.body.classList.add("social");
  }

  if (result.title === "The Casual Listener") {
    document.body.classList.add("casual");
  }
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
  document.body.className = "";
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
});

showQuestion();
