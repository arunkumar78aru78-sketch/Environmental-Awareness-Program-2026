// USER NAME SYSTEM
let userName = localStorage.getItem("ecoUser");

if (!userName) {
    userName = prompt("Enter your name:");
    localStorage.setItem("ecoUser", userName);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("welcomeMessage").innerText =
        `Welcome, ${userName} 👋`;
});
let ecoPoints = 0;

function updateEcoPoints(points){

ecoPoints += points;

document.getElementById("ecoPoints").innerText =
"Points: " + ecoPoints;

updateEcoLevel();

}
function updateEcoLevel(){

let level = "Eco Beginner 🌱";

if(ecoPoints >= 80)
level = "Earth Guardian 🌍";

else if(ecoPoints >= 50)
level = "Eco Hero 🌳";

else if(ecoPoints >= 20)
level = "Eco Warrior 🌿";

document.getElementById("ecoLevel").innerText =
"Level: " + level;

}
// ==============================
// ENVIRONMENTAL AWARENESS 2026
// ==============================

// ACTIVITY DATA
const activities = [
    { id: 1, name: "Plant a Tree 🌳", description: "Plant one tree today.", completed: false },
    { id: 2, name: "Avoid Plastic ♻", description: "Do not use plastic today.", completed: false },
    { id: 3, name: "Save Water 💧", description: "Reduce water usage.", completed: false },
    { id: 4, name: "Clean Area 🧹", description: "Clean your surroundings.", completed: false },
    { id: 5, name: "Learn Renewable Energy ☀", description: "Study solar/wind energy.", completed: false }
];

// ==============================
// SHOW HOME / ACTIVITY
// ==============================

function hideAllSections() {
    document.getElementById("homeSection").classList.add("hidden");
    document.getElementById("activitySection").classList.add("hidden");
    document.getElementById("quizSection").classList.add("hidden");
    document.getElementById("gameSection").classList.add("hidden");
}

function showGame() {
    hideAllSections();
    document.getElementById("gameSection").classList.remove("hidden");
    startGame();
}

function showHome() {
    hideAllSections();
    document.getElementById("homeSection").classList.remove("hidden");
}

function showActivities() {
    hideAllSections();
    document.getElementById("activitySection").classList.remove("hidden");
    displayActivities();
}

function showQuiz() {
    hideAllSections();
    document.getElementById("quizSection").classList.remove("hidden");

    shuffleArray(quizQuestions);   // 🔥 Random order each time
    displayQuiz();
}
// ==============================
// DISPLAY ACTIVITIES
// ==============================

function displayActivities() {

    const list = document.getElementById("activityList");
    list.innerHTML = "";

    activities.forEach(activity => {

        const card = document.createElement("div");
        card.className = "activity-card";

        card.innerHTML = `
            <h3>${activity.name}</h3>
            <p>${activity.description}</p>

            ${activity.completed && activity.completedDate 
                ? `<p style="font-size:13px;color:green;">
                     Completed on: ${activity.completedDate}
                   </p>` 
                : ""}

            <input type="checkbox"
                ${activity.completed ? "checked" : ""}
                onchange="toggleActivity(${activity.id})">
        `;

        list.appendChild(card);
    });

    updateProgress();
}
// ==============================
// TOGGLE ACTIVITY
// ==============================

function toggleActivity(id) {

    const activity = activities.find(a => a.id === id);

    if (activity) {
        activity.completed = !activity.completed;

        if (activity.completed) {
            activity.completedDate = new Date().toLocaleString();
            updateEcoPoints(10);
        } else {
            activity.completedDate = null;
        }
    }

    displayActivities();
}
// ==============================
// UPDATE PROGRESS + BADGES
// ==============================
function updateProgress() {

    const completedCount = activities.filter(a => a.completed).length;
    const total = activities.length;
    const percentage = (completedCount / total) * 100;

    const bar = document.getElementById("progressBar");
    const text = document.getElementById("progressText");
    const badge = document.getElementById("achievementBadge");
    const certificateBtn = document.getElementById("certificateBtn");
    const celebration = document.getElementById("celebrationMessage");

    if (!bar || !text || !badge || !certificateBtn) return;

    bar.style.width = percentage + "%";
    text.innerText = completedCount + " of " + total + " completed";

    if (completedCount === total && total > 0) {
        badge.innerText = "🏆 Eco Champion!";
        certificateBtn.classList.remove("hidden");

        if (celebration) {
            celebration.classList.remove("hidden");
            setTimeout(() => {
                celebration.classList.add("hidden");
            }, 3000);
        }

    } else if (completedCount >= 3) {
        badge.innerText = "🌿 Eco Warrior!";
        certificateBtn.classList.add("hidden");
    } else if (completedCount >= 1) {
        badge.innerText = "🌱 Eco Beginner!";
        certificateBtn.classList.add("hidden");
    } else {
        badge.innerText = "";
        certificateBtn.classList.add("hidden");
    }
}


// ==============================
// DARK MODE
// ==============================

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
// ==============================
// AUTO IMAGE SLIDER
// ==============================

let currentSlide = 0;

function autoSlide() {

    const slidesContainer = document.getElementById("slides");
    const totalSlides = document.querySelectorAll(".slide").length;

    if (!slidesContainer) return;

    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    currentSlide++;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
}

setInterval(autoSlide, 3000);
// Reminder on page load
document.addEventListener("DOMContentLoaded", function() {

    setTimeout(() => {
        alert("🌿 Reminder: Complete your eco activities today!");
    }, 2000);

});
function downloadCertificate() {

    const userName = localStorage.getItem("ecoUser");

    const certificateWindow = window.open("", "_blank");

    certificateWindow.document.write(`
        <html>
        <head>
            <title>Eco Certificate</title>
            <style>
                body {
                    text-align: center;
                    font-family: Arial;
                    padding-top: 100px;
                }
                h1 { color: #2e8b57; }
            </style>
        </head>
        <body>
            <h1>Environmental Awareness Program 2026</h1>
            <h2>Certificate of Completion</h2>
            <p>This certifies that</p>
            <h2>${userName}</h2>
            <p>has successfully completed all eco activities.</p>
            <p>🌍💚</p>
        </body>
        </html>
    `);

    certificateWindow.document.close();
}
const quotes = [
    "The Earth does not belong to us; we belong to the Earth.",
    "Reduce, Reuse, Recycle.",
    "Small steps today, big change tomorrow.",
    "Plant a tree, grow a future.",
    "Act now for a greener tomorrow."
];

let quoteIndex = 0;

function changeQuote() {
    const quoteBox = document.getElementById("quoteBox");
    if (!quoteBox) return;

    quoteBox.style.opacity = 0;

    setTimeout(() => {
        quoteBox.innerText = quotes[quoteIndex];
        quoteBox.style.opacity = 1;
    }, 400);

    quoteIndex++;
    if (quoteIndex >= quotes.length) {
        quoteIndex = 0;
    }
}
setInterval(changeQuote, 4000);

document.addEventListener("DOMContentLoaded", changeQuote);
function drawChart() {

    const canvas = document.getElementById("progressChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const completedCount = activities.filter(a => a.completed).length;
    const total = activities.length;

    const completedHeight = (completedCount / total) * 150;

    ctx.clearRect(0, 0, 300, 200);

    // Completed bar
    ctx.fillStyle = "#2e8b57";
    ctx.fillRect(100, 180 - completedHeight, 50, completedHeight);

    // Label
    ctx.fillStyle = "black";
    ctx.fillText("Completed", 95, 195);
}

setInterval(drawChart, 1000);

// ==============================
// SAFE SLIDER SYSTEM
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    let currentSlide = 0;
    const slidesContainer = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slide");

    if (!slidesContainer || slides.length === 0) return;

    function showSlide(index) {

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slidesContainer.style.transform =
            `translateX(-${currentSlide * 100}%)`;
    }

    window.nextSlide = function () {
        showSlide(currentSlide + 1);
    }

    window.prevSlide = function () {
        showSlide(currentSlide - 1);
    }

    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);

});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("homeSection").classList.add("show");
});
console.log("JS Loaded Successfully");
const quizQuestions = [
    {
        question: "What gas causes global warming?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: "Carbon Dioxide"
    },
    {
        question: "Which energy is renewable?",
        options: ["Coal", "Solar", "Petrol", "Diesel"],
        answer: "Solar"
    },
    {
        question: "What does the 3R principle stand for?",
        options: ["Reduce, Reuse, Recycle", "Read, Run, Rest", "Repair, Replace, Remove", "React, Rebuild, Reform"],
        answer: "Reduce, Reuse, Recycle"
    },
    {
        question: "Which of these helps save water?",
        options: ["Long showers", "Fixing leaks", "Leaving tap open", "Washing daily car"],
        answer: "Fixing leaks"
    },
    {
        question: "Which fuel causes the most air pollution?",
        options: ["Solar", "Wind", "Coal", "Hydro"],
        answer: "Coal"
    },
    {
        question: "Planting trees helps to:",
        options: ["Increase pollution", "Reduce carbon dioxide", "Destroy soil", "Waste water"],
        answer: "Reduce carbon dioxide"
    },
    {
        question: "Which material takes longest to decompose?",
        options: ["Paper", "Food waste", "Plastic", "Leaves"],
        answer: "Plastic"
    },
    {
        question: "Turning off unused lights helps to:",
        options: ["Waste electricity", "Save energy", "Increase bills", "Damage environment"],
        answer: "Save energy"
    },
    {
        question: "Which is an example of renewable energy?",
        options: ["Wind", "Oil", "Gasoline", "Coal"],
        answer: "Wind"
    },
    {
        question: "What is the main cause of climate change?",
        options: ["Tree planting", "Burning fossil fuels", "Recycling", "Saving water"],
        answer: "Burning fossil fuels"
    }
];
const ecoTips = [
"Turn off lights when not in use 💡",
"Carry reusable bags 🛍",
"Use public transport 🚆",
"Plant trees whenever possible 🌳",
"Reduce water waste 💧"
];

function showEcoTip(){

const randomTip = ecoTips[Math.floor(Math.random()*ecoTips.length)];

document.getElementById("ecoTip").innerText =
"🌎 Eco Tip: " + randomTip;

}
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
function displayQuiz() {

    const container = document.getElementById("quizContainer");
    container.innerHTML = "";

    quizQuestions.forEach((q, index) => {

        const questionDiv = document.createElement("div");
        questionDiv.className = "activity-card";

        let optionsHTML = "";

        q.options.forEach(option => {
            optionsHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${option}">
                    ${option}
                </label><br>
            `;
        });

        questionDiv.innerHTML = `
            <h3>${q.question}</h3>
            ${optionsHTML}
        `;

        container.appendChild(questionDiv);
    });
}
function updateQuizProgress(answered, total) {

    const percentage = (answered / total) * 100;

    const bar = document.getElementById("quizProgressBar");
    const text = document.getElementById("quizProgressText");

    if (!bar) return;

    bar.style.width = percentage + "%";
    text.innerText = Math.round(percentage) + "% Completed";
}

function submitQuiz() {

    let score = 0;

    quizQuestions.forEach((q, index) => {

        const selected = document.querySelector(`input[name="q${index}"]:checked`);

        if (selected && selected.value === q.answer) {
            score++;
        }
    });
    updateEcoPoints(score * 5);

    const result = document.getElementById("quizResult");

    result.innerText = `You scored ${score} out of ${quizQuestions.length}`;

    const userName = localStorage.getItem("ecoUser");

    if (score === quizQuestions.length) {
        result.innerText += " 🏆 Eco Genius!";
    } else if (score >= 7) {
        result.innerText += " 🌿 Great Job!";
    } else {
        result.innerText += " 🌱 Keep Learning!";
    }

    // 🎓 QUIZ CERTIFICATE (Score 7 or more)
    if (score >= quizQuestions.length * 0.7) {

        const certificateWindow = window.open("", "_blank");

        certificateWindow.document.write(`
            <html>
            <head>
                <title>Quiz Certificate</title>
                <style>
                    body {
                        text-align: center;
                        font-family: Arial;
                        padding-top: 100px;
                    }
                    h1 { color: #2e8b57; }
                </style>
            </head>
            <body>
                <h1>Environmental Awareness Program 2026</h1>
                <h2>Quiz Excellence Certificate</h2>
                <p>This certifies that</p>
                <h2>${userName}</h2>
                <p>has successfully passed the Environmental Quiz</p>
                <p>Score: ${score} / ${quizQuestions.length}</p>
                <p>🌍💚</p>
            </body>
            </html>
        `);

        certificateWindow.document.close();
    }
}
// 🎵 MUSIC SYSTEM
let isPlaying = false;

function toggleMusic() {
    const music = document.getElementById("bgMusic");

    if (!music) {
        alert("Music element not found!");
        return;
    }

    if (isPlaying) {
        music.pause();
    } else {
        music.play().catch(error => {
            console.log("Playback blocked:", error);
        });
    }

    isPlaying = !isPlaying;
}
// 🎮 WASTE SORTING GAME

const wasteItems = [
    { name: "Plastic Bottle 🧴", type: "Recycle" },
    { name: "Banana Peel 🍌", type: "Compost" },
    { name: "Old Battery 🔋", type: "Hazard" },
    { name: "Paper 📄", type: "Recycle" },
    { name: "Food Waste 🍎", type: "Compost" }
];

let currentItem;
let score = 0;

function startGame() {
    score = 0;
    document.getElementById("gameScore").innerText = "Score: 0";
    nextItem();
}

function nextItem() {
    currentItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    document.getElementById("gameItem").innerHTML = `<h3>${currentItem.name}</h3>`;
}

function chooseBin(selected) {

    if (selected === currentItem.type) {
        score += 10;
        alert("✅ Correct!");
    } else {
        alert("❌ Wrong!");
    }

    document.getElementById("gameScore").innerText = "Score: " + score;
    nextItem();
}
let plasticScore = 0;

function showPlasticGame(){
    hideAllSections();
    document.getElementById("plasticGame").classList.remove("hidden");
}

function startPlasticGame(){

    plasticScore = 0;
    document.getElementById("plasticScore").innerText = "Score: 0";

    spawnPlastic();
}

function spawnPlastic(){

    const area = document.getElementById("plasticArea");

    const plastic = document.createElement("div");

    plastic.innerText = "🧴";
    plastic.style.position = "absolute";
    plastic.style.fontSize = "40px";

    plastic.style.left = Math.random()*250 + "px";
    plastic.style.top = Math.random()*200 + "px";

    plastic.onclick = function(){
        plasticScore++;
        document.getElementById("plasticScore").innerText =
        "Score: " + plasticScore;
        plastic.remove();
        spawnPlastic();
    };

    area.appendChild(plastic);
}
function createLeaf(){

const leaf=document.createElement("div");
leaf.className="leaf";
leaf.innerText="🍃";

leaf.style.left=Math.random()*100+"vw";
leaf.style.animationDuration=3+Math.random()*5+"s";

document.querySelector(".leaf-container").appendChild(leaf);

setTimeout(()=>{leaf.remove()},8000);
}

setInterval(createLeaf,800);
const dailyChallenges = [
"Turn off unused lights today 💡",
"Use a reusable bottle ♻",
"Walk instead of driving 🚶",
"Avoid plastic bags 🛍",
"Plant a tree 🌳",
"Take a short shower to save water 🚿"
];

function showDailyChallenge() {

const day = new Date().getDate();
const challenge = dailyChallenges[day % dailyChallenges.length];

document.getElementById("dailyChallenge").innerText =
"🌿 Today's Challenge: " + challenge;

}
showDailyChallenge();
const ctx = document.getElementById('ecoChart');

new Chart(ctx, {
type: 'bar',
data: {
labels: ['Activities', 'Quiz Score', 'Eco Points'],
datasets: [{
label: 'Eco Progress',
data: [3, 7, ecoPoints]
}]
}
});

function showLessons(){

hideAllSections();

document.getElementById("lessonSection")
.classList.remove("hidden");

}
function startLesson(){

alert("Climate change happens when greenhouse gases trap heat in the atmosphere.");

const answer = prompt("Which gas causes global warming?");

if(answer && answer.toLowerCase().includes("carbon")){
alert("Correct! 🌿 +5 Eco Points");
updateEcoPoints(5);
}else{
alert("Correct answer: Carbon Dioxide");
}

}
function openLesson(){

hideAllSections();

document.getElementById("lessonPage")
.classList.remove("hidden");

}
function lessonQuestion(){

const answer = prompt(
"Which gas causes global warming?"
);

if(answer && answer.toLowerCase().includes("carbon")){
alert("Correct! +5 Eco Points 🌿");
updateEcoPoints(5);
}
else{
alert("Correct answer: Carbon Dioxide");
}

}
