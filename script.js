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
