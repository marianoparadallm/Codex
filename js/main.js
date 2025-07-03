// Initialize MDC components
mdc.autoInit();

// Mood Tracker functionality
const emotions = document.querySelectorAll('.emotion-button');
const saveEmotionBtn = document.getElementById('save-emotion');
const emotionNote = document.getElementById('emotion-note');
const emotionHistory = document.getElementById('emotion-history');
let selectedEmotion = '';

emotions.forEach(btn => {
  btn.addEventListener('click', () => {
    emotions.forEach(b => b.classList.remove('mdc-button--raised'));
    btn.classList.add('mdc-button--raised');
    selectedEmotion = btn.dataset.emotion;
  });
});

saveEmotionBtn.addEventListener('click', () => {
  if (!selectedEmotion) return;
  const entry = {
    emotion: selectedEmotion,
    note: emotionNote.value.trim(),
    timestamp: new Date().toISOString()
  };
  const data = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  data.unshift(entry);
  localStorage.setItem('moodEntries', JSON.stringify(data));
  emotionNote.value = '';
  emotions.forEach(b => b.classList.remove('mdc-button--raised'));
  selectedEmotion = '';
  renderMoodHistory();
});

function renderMoodHistory() {
  const data = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  emotionHistory.innerHTML = '';
  data.slice(0, 10).forEach(entry => {
    const card = document.createElement('div');
    card.className = 'mdc-card';
    card.style.padding = '16px';
    card.textContent = `${entry.emotion} - ${new Date(entry.timestamp).toLocaleString()}`;
    emotionHistory.appendChild(card);
  });
}

renderMoodHistory();

// Breathing exercises audio
const audios = document.querySelectorAll('.exercise');
audios.forEach(container => {
  const audio = container.querySelector('audio');
  const button = container.querySelector('.play-button');
  button.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      button.textContent = 'pause';
    } else {
      audio.pause();
      button.textContent = 'play_arrow';
    }
  });
});

// Achievement log
const saveAchievementBtn = document.getElementById('save-achievement');
const achievementText = document.getElementById('achievement-text');
const achievementList = document.getElementById('achievement-list');

saveAchievementBtn.addEventListener('click', () => {
  const text = achievementText.value.trim();
  if (!text) return;
  const entry = { text, timestamp: new Date().toISOString() };
  const data = JSON.parse(localStorage.getItem('achievements') || '[]');
  data.unshift(entry);
  localStorage.setItem('achievements', JSON.stringify(data));
  achievementText.value = '';
  renderAchievements();
});

function renderAchievements() {
  const data = JSON.parse(localStorage.getItem('achievements') || '[]');
  achievementList.innerHTML = '';
  data.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'mdc-card';
    card.style.padding = '16px';
    card.textContent = `${new Date(entry.timestamp).toLocaleDateString()}: ${entry.text}`;
    achievementList.appendChild(card);
  });
}

renderAchievements();
