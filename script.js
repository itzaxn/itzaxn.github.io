// Exams start 1 Dec 2026, 00:00 (local time of the device)
const examDate = new Date(2026, 11, 1, 0, 0, 0);
// Start of prep period, used for the progress bar
const startDate = new Date(2026, 9, 27, 0, 0, 0);

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  bar: document.getElementById("bar"),
  percent: document.getElementById("percent"),
  message: document.getElementById("message"),
};

const pad = (n) => String(n).padStart(2, "0");

function getMessage(daysLeft) {
  if (daysLeft > 25) return "Plenty of time. Build a solid routine now.";
  if (daysLeft > 14) return "Time to finish the syllabus and start revising.";
  if (daysLeft > 7) return "Revision mode. Solve past papers daily.";
  if (daysLeft > 2) return "Final stretch. Focus on weak topics and sleep well.";
  return "Almost there. Stay calm, you've got this.";
}

function update() {
  const now = new Date();
  const diff = examDate - now;

  if (diff <= 0) {
    document.body.classList.add("started");
    document.querySelector("h1").textContent = "Exams have started. Good luck!";
    ["days", "hours", "minutes", "seconds"].forEach((k) => (els[k].textContent = "00"));
    els.bar.style.width = "100%";
    els.percent.textContent = "100%";
    els.message.textContent = "Give it your best.";
    clearInterval(timerId);
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  els.days.textContent = pad(days);
  els.hours.textContent = pad(hours);
  els.minutes.textContent = pad(minutes);
  els.seconds.textContent = pad(seconds);

  const total = examDate - startDate;
  const pct = Math.min(100, Math.max(0, ((now - startDate) / total) * 100));
  els.bar.style.width = pct.toFixed(1) + "%";
  els.percent.textContent = pct.toFixed(1) + "%";

  els.message.textContent = getMessage(days);
}

update();
const timerId = setInterval(update, 1000);
