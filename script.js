function calculatePR(exercise) {
  const weight = parseFloat(document.getElementById(`${exercise}-weight`).value);
  const reps = parseInt(document.getElementById(`${exercise}-reps`).value);
  const prResult = document.getElementById(`${exercise}-result`);

  if (reps < 1 || isNaN(weight) || isNaN(reps)) {
    prResult.innerText = "Invalid";
    return;
  }

  let pr;
  if (reps === 1) pr = weight;
  else if (reps <= 3) pr = weight / 0.95;
  else if (reps <= 5) pr = weight / 0.90;
  else if (reps <= 7) pr = weight / 0.85;
  else if (reps <= 9) pr = weight / 0.80;
  else if (reps <= 11) pr = weight / 0.75;
  else if (reps <= 15) pr = weight / 0.70;
  else if (reps <= 18) pr = weight / 0.65;
  else if (reps <= 20) pr = weight / 0.60;
  else {
    prResult.innerText = "Reps too high";
    return;
  }

  let resultHTML = `Your PR: ${pr.toFixed(1)} kg<br>`;
  resultHTML += `95% PR: ${(pr * 0.95).toFixed(1)} kg (≈2 reps)<br>`;
  resultHTML += `90% PR: ${(pr * 0.90).toFixed(1)} kg (≈4 reps)<br>`;
  resultHTML += `85% PR: ${(pr * 0.85).toFixed(1)} kg (≈6 reps)<br>`;
  resultHTML += `80% PR: ${(pr * 0.80).toFixed(1)} kg (≈8 reps)<br>`;
  resultHTML += `75% PR: ${(pr * 0.75).toFixed(1)} kg (≈10 reps)<br>`;
  resultHTML += `70% PR: ${(pr * 0.70).toFixed(1)} kg (≈12 reps)<br>`;
  resultHTML += `65% PR: ${(pr * 0.65).toFixed(1)} kg (≈16 reps)<br>`;
  resultHTML += `60% PR: ${(pr * 0.60).toFixed(1)} kg (≈20 reps)`;

  prResult.innerHTML = resultHTML;
}
function switchTab(tabName) {
  // Tüm tab-content'leri gizle
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Seçilen tab'ı göster
  const activeTab = document.getElementById(`${tabName}-tab`);
  if (activeTab) {
    activeTab.classList.add('active');
  }
}

function generateWorkoutProgram() {
  const benchPRText = document.getElementById("bench-result").innerText;
  const deadliftPRText = document.getElementById("deadlift-result").innerText;
  const squatPRText = document.getElementById("squat-result").innerText;
  const rowPRText = document.getElementById("row-result").innerText;

  const benchMatch = benchPRText.match(/Your PR: ([\d.]+) kg/);
  const deadliftMatch = deadliftPRText.match(/Your PR: ([\d.]+) kg/);
  const squatMatch = squatPRText.match(/Your PR: ([\d.]+) kg/);
  const rowMatch = rowPRText.match(/Your PR: ([\d.]+) kg/);

  if (!benchMatch || !deadliftMatch || !squatMatch || !rowMatch) return;

  const benchPR = parseFloat(benchMatch[1]);
  const deadliftPR = parseFloat(deadliftMatch[1]);
  const squatPR = parseFloat(squatMatch[1]);
  const rowPR = parseFloat(rowMatch[1]);

  const program = {
    Monday: [
      `Bench Press 3x8 (${(benchPR * 0.8).toFixed(0)} kg 8 reps) - 3min rest`,
      `Dumbbell Fly 3x10 (${benchPR >= 80 ? "15kg" : "10kg"}) - 2min rest`,
      `Row 3x10 (~${(rowPR * 0.75).toFixed(0)}kg) - 3min rest`,
      `Squat 5x5 (~${(squatPR * 0.9).toFixed(0)}kg) - 3min rest`,
      `Pull Ups 3x5 (optional) - 5min rest`
    ],
    Wednesday: [
      `Deadlift 1x5 PR65% = ${(deadliftPR * 0.65).toFixed(0)}kg - 5min rest`,
      `1x5 PR75% = ${(deadliftPR * 0.75).toFixed(0)}kg - 5min rest`,
      `1x5 PR80% = ${(deadliftPR * 0.80).toFixed(0)}kg - 5min rest`,
      `2x5 PR85% = ${(deadliftPR * 0.85).toFixed(0)}kg - 5min rest`,
      `Overhead Press 5x5 (~${(benchPR * 0.5).toFixed(0)}kg) - 3min rest`,
      `Barbell Curl 4x20 (~${(benchPR * 0.2).toFixed(0)}kg) - 2min rest`
    ],
    Friday: [
      `Bench Press 3x8 (${(benchPR * 0.8).toFixed(0)} kg 8 reps) - 3min rest`,
      `Dumbbell Fly 3x10 (${benchPR >= 80 ? "15kg" : "10kg"}) - 2min rest`,
      `Row 3x10 (~${(rowPR * 0.75).toFixed(0)}kg) - 3min rest`,
      `Squat 5x5 (~${(squatPR * 0.9).toFixed(0)}kg) - 3min rest`,
      `Pull Ups 3x5 (optional) - 5min rest`
    ],
    Saturday: [
      `Deadlift 5x5 PR65% = ${(deadliftPR * 0.65).toFixed(0)}kg - 5min rest`,
      `Barbell Curl 4x20 (~${(benchPR * 0.2).toFixed(0)}kg) - 2min rest`,
      `Single DB Behind Neck Triceps 4x10 (~${(benchPR * 0.2).toFixed(0)}kg) - 2min rest`
    ]
  };

  const div = document.getElementById("workout-tab");
  div.innerHTML = '<h2>Your Weekly Workout Program</h2>';
  Object.entries(program).forEach(([day, list]) => {
    div.innerHTML += `<h3>${day}</h3><ul>` + list.map(ex => `<li>${ex}</li>`).join("") + '</ul>';
  });
}




// Kronometre (ileri sayım)
let chronoInterval;
let chronoSeconds = 0;
let chronoRunning = false;

function updateChronometerDisplay() {
  const hrs = Math.floor(chronoSeconds / 3600);
  const mins = Math.floor((chronoSeconds % 3600) / 60);
  const secs = chronoSeconds % 60;
  document.getElementById("chronometer").innerText =
    `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function startChronometer() {
  if (chronoRunning) return;
  chronoRunning = true;
  chronoInterval = setInterval(() => {
    chronoSeconds++;
    updateChronometerDisplay();
  }, 1000);
}

function pauseChronometer() {
  clearInterval(chronoInterval);
  chronoRunning = false;
}

function resetChronometer() {
  pauseChronometer();
  chronoSeconds = 0;
  updateChronometerDisplay();
}

// Beep Timer (geri sayım)
let countdown;

function startBeepTimer(minutes) {
  clearInterval(countdown);
  let seconds = minutes * 60;
  updateStatus(`Beep in ${Math.round(seconds)} second(s)...`);


  countdown = setInterval(() => {
    seconds--;
    updateStatus(`Time left: ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`);
    if (seconds <= 4) {
      clearInterval(countdown);
      playBeep();
      updateStatus("⏰ Beep!");
    }
  }, 1000);
}

function startCustomBeep() {
  const seconds = parseInt(document.getElementById("custom-minutes").value); // ID değişmiyor
  if (isNaN(seconds) || seconds < 10 || seconds > 600) {
    updateStatus("Enter valid seconds value.");
    return;
  }
  const minutes = seconds / 60;  // dönüşüm burada
  startBeepTimer(minutes);       // mevcut yapı bozulmadan çalışır
}


function updateStatus(text) {
  document.getElementById("timer-status").innerText = text;
}

function playBeep() {
  const audio = new Audio("Sound/go-time.mp3");
  audio.play();
}



let rawFoodData = {}; // JSON'dan dolacak
const foodTracker = {
  Monday: [], Tuesday: [], Wednesday: [],
  Thursday: [], Friday: [], Saturday: [], Sunday: []
};
let currentDay = "Monday";
let allFoodsFlat = [];

document.getElementById("daySelect").addEventListener("change", function () {
  currentDay = this.value;
  updateFoodUI();
});

function loadFoodData() {
  fetch("rawfood.json")
    .then(response => response.json())
    .then(data => {
      rawFoodData = data;
      // Tüm yiyecekleri tek listeye düzleştir
      allFoodsFlat = [];
      for (const category in rawFoodData) {
        allFoodsFlat = allFoodsFlat.concat(rawFoodData[category]);
      }
    });
}

function findCalories(foodName) {
  const name = foodName.trim().toLowerCase();
  for (let item of allFoodsFlat) {
    if (item.Name.toLowerCase() === name) {
      return item.Calories;
    }
  }
  return null;
}

function addFood() {
  const foodName = document.getElementById("foodInput").value.trim();
  const calories = findCalories(foodName);
  if (calories === null) {
    alert("Food not found in database.");
    return;
  }

  foodTracker[currentDay].push({ food: foodName, calories });
  document.getElementById("foodInput").value = "";
  document.getElementById("suggestions").innerHTML = "";
  updateFoodUI();
}

function updateFoodUI() {
  const list = document.getElementById("foodList");
  const total = document.getElementById("totalCalories");
  const label = document.getElementById("selectedDayLabel");

  list.innerHTML = "";
  let sum = 0;
  foodTracker[currentDay].forEach(item => {
    list.innerHTML += `<div>${item.food} - ${item.calories} kcal</div>`;
    sum += item.calories;
  });

  total.textContent = sum;
  label.textContent = "Day: " + currentDay;
}

// 🎯 Otomatik tamamlama
document.getElementById("foodInput").addEventListener("input", function () {
  const value = this.value.trim().toLowerCase();
  const suggestionBox = document.getElementById("suggestions");
  suggestionBox.innerHTML = "";

  if (value.length < 2) return;

  const matches = allFoodsFlat.filter(f => f.Name.toLowerCase().includes(value));
  matches.slice(0, 5).forEach(match => {
    const div = document.createElement("div");
    div.textContent = match.Name;
    div.style.cursor = "pointer";
    div.style.padding = "5px";
    div.onclick = () => {
      document.getElementById("foodInput").value = match.Name;
      suggestionBox.innerHTML = "";
    };
    suggestionBox.appendChild(div);
  });
});

// sayfa yüklenince verileri yükle
loadFoodData();
updateFoodUI();
