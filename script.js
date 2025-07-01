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
