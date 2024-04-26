const body = document.querySelector('body');
const sidebar = body.querySelector('nav');
const toggle = body.querySelector(".toggle");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");
const whiteSection = document.querySelector(".white-section");
const musicPlayer = document.querySelector(".music-player"); // Получаем элемент плеера

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    whiteSection.style.width = "calc(100% - 120px)";
    musicPlayer.style.width = "calc(100% - 120px)"; // Изменяем ширину плеера
  } else {
    whiteSection.style.width = "calc(100% - 280px)";
    musicPlayer.style.width = "calc(100% - 280px)"; // Изменяем ширину плеера
  }
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    modeText.innerText = "Светлая тема";
  } else {
    modeText.innerText = "Тёмная тема";
  }
});


let audio = document.getElementById('audio-element');
const seekBar = document.querySelector('.seek-bar');
const volumeBar = document.querySelector('.volume-bar');
const playPauseButton = document.querySelector('.play-pause');
const prevTrackButton = document.querySelector('.prev-track');
const nextTrackButton = document.querySelector('.next-track');
let trackListItems = document.querySelectorAll('.track-list .track');
let files = []; // Список загруженных треков
let currentTrackIndex = 0;
const timeDisplay = document.querySelector('.time-display');
const currentTimeDisplay = document.createElement('span');
currentTimeDisplay.classList.add('current-time');
const totalTimeDisplay = document.createElement('span');
totalTimeDisplay.classList.add('total-time');
timeDisplay.appendChild(currentTimeDisplay);
timeDisplay.appendChild(totalTimeDisplay);

function uploadTracks() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'audio/mp3';
  input.multiple = true;
  input.addEventListener('change', handleFileSelection);
  input.click();
}



function handleFileSelection(event) {
  const newFiles = event.target.files;
  const trackList = document.querySelector('.track-list');

  for (const file of newFiles) {
    const trackItem = document.createElement('li');
    trackItem.classList.add('track');

    // Add the track name span
    const trackName = document.createElement('span');
    trackName.classList.add('track-name');
    trackName.textContent = file.name;

    // Add the delete icon dynamically
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-track');
    deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
    deleteIcon.addEventListener('click', () => deleteTrack(trackItem));

    // Append track name and delete icon to the track item
    trackItem.appendChild(trackName);
    trackItem.appendChild(deleteIcon);

    trackItem.addEventListener('click', () => {
      playTrack(file);
    });

    trackList.appendChild(trackItem);
    files.push(file);
  }
  trackListItems = document.querySelectorAll('.track-list .track');
  toggleControls(files.length > 0);
}



function playTrack(file) {
  const trackIndex = Array.from(trackListItems).findIndex(track => track.textContent === file.name);
  if (trackIndex !== -1) {
    currentTrackIndex = trackIndex;
    audio.src = URL.createObjectURL(file);
    audio.play();
  }
}

// Обновление позиции ползунка длительности во время воспроизведения
function updateSeekBar() {
  seekBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeDisplay.textContent = formatTime(audio.currentTime);
  totalTimeDisplay.textContent = formatTime(audio.duration);
  setTimeout(updateSeekBar, 50); // Запускаем обновление через каждые 50 миллисекунд
}

// Функция для преобразования времени в нужный формат (мм:сс)
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audio.addEventListener('play', function() {
  requestAnimationFrame(updateSeekBar); // Запустить обновление при воспроизведении
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Меняем иконку кнопки на паузу
});

audio.addEventListener('pause', function() {
  cancelAnimationFrame(updateSeekBar); // Останавливаем обновление при паузе
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Меняем иконку кнопки на воспроизведение
});

// При изменении ползунка длительности
seekBar.addEventListener('input', function() {
  audio.currentTime = audio.duration * (seekBar.value / 100);
});

// При изменении ползунка громкости
volumeBar.addEventListener('input', function() {
  audio.volume = volumeBar.value / 100;
});

// При нажатии на кнопку воспроизведения/паузы
playPauseButton.addEventListener('click', function() {
  if (files.length > 0) {
    if (audio.paused) {
      // Если трек находится в паузе, устанавливаем текущую позицию воспроизведения
      // и продолжаем воспроизведение с этой позиции
      if (audio.currentTime > 0) {
        audio.play();
      } else {
        playTrack(files[currentTrackIndex]);
        audio.play();
      }
    } else {
      audio.pause();
    }
  }
});

// При нажатии на кнопку предыдущего трека
prevTrackButton.addEventListener('click', function() {
  if (currentTrackIndex > 0) {
    currentTrackIndex--;
    const prevTrackFile = files[currentTrackIndex];
    playTrack(prevTrackFile);
  }
});

// При нажатии на кнопку следующего трека
nextTrackButton.addEventListener('click', function() {
  if (currentTrackIndex < files.length - 1) {
    currentTrackIndex++;
    const nextTrackFile = files[currentTrackIndex];
    playTrack(nextTrackFile);
  }
});

function toggleControls(enabled) {
  playPauseButton.disabled = !enabled;
  prevTrackButton.disabled = !enabled;
  nextTrackButton.disabled = !enabled;
  seekBar.disabled = !enabled;
}

function deleteTrack(trackItem) {
  const trackIndex = Array.from(trackListItems).indexOf(trackItem);

  // Remove the track from the list
  trackItem.remove();
  files.splice(trackIndex, 1);

  // Update trackListItems after deletion
  trackListItems = document.querySelectorAll('.track-list .track');
  toggleControls(files.length > 0);

  // If the deleted track is the currently playing track, stop playback
  if (currentTrackIndex === trackIndex && !audio.paused) {
    audio.pause();
  }
}

function playFirstTrackIfPaused() {
  if (audio.paused && files.length > 0) {
    playTrack(files[0]);
  }
}

// Обработчик события загрузки треков
function handleFileSelection(event) {
  const newFiles = event.target.files;
  const trackList = document.querySelector('.track-list');

  for (const file of newFiles) {
    const trackItem = document.createElement('li');
    trackItem.classList.add('track');
    
    // Add the delete icon dynamically
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('delete-track');
    deleteIcon.innerHTML = '<i class="fas fa-trash"></i>';
    deleteIcon.addEventListener('click', () => deleteTrack(trackItem));

    // Add the track name span
    const trackName = document.createElement('span');
    trackName.classList.add('track-name');
    trackName.textContent = file.name;

    // Append delete icon and track name to the track item
    trackItem.appendChild(deleteIcon);
    trackItem.appendChild(trackName);

    trackItem.addEventListener('click', () => {
      playTrack(file);
    });

    trackList.appendChild(trackItem);
    files.push(file);
  }
  trackListItems = document.querySelectorAll('.track-list .track');
  toggleControls(files.length > 0);
}

// Обработчик события воспроизведения трека
audio.addEventListener('play', function() {
  requestAnimationFrame(updateSeekBar);
  playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
});

// Обработчик события паузы трека
audio.addEventListener('pause', function() {
  cancelAnimationFrame(updateSeekBar);
  playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
});

// Обработчик события клика на кнопку воспроизведения/паузы
function playFirstTrackIfPaused() {
  if (audio.paused && files.length > 0) {
    currentTrackIndex = 0;
    playTrack(files[currentTrackIndex]);
  }
}

// Обработчик события клика на кнопку предыдущего трека
prevTrackButton.addEventListener('click', function() {
  if (currentTrackIndex > 0) {
    currentTrackIndex--;
    const prevTrackFile = files[currentTrackIndex];
    playTrack(prevTrackFile);
  }
});

// Обработчик события клика на кнопку следующего трека
nextTrackButton.addEventListener('click', function() {
  if (currentTrackIndex < files.length - 1) {
    currentTrackIndex++;
    const nextTrackFile = files[currentTrackIndex];
    playTrack(nextTrackFile);
  }
});

// При загрузке страницы отключаем кнопки и ползунок, если нет треков
toggleControls(false);

const searchInput = document.querySelector('.search');

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.toLowerCase();
  filterTracks(searchTerm);
});

function filterTracks(searchTerm) {
  const trackList = document.querySelector('.track-list');
  const trackItems = trackList.querySelectorAll('.track');

  trackItems.forEach((trackItem) => {
    const trackName = trackItem.textContent.toLowerCase();
    if (trackName.includes(searchTerm)) {
      trackItem.classList.add('visible');
      trackItem.classList.remove('hidden');
    } else {
      trackItem.classList.add('hidden');
      trackItem.classList.remove('visible');
    }
  });

  // Preserve the applied style by reapplying it after the search
  applyTrackStyles();
}

// Add this function to reapply track styles after search
function applyTrackStyles() {
  trackListItems = document.querySelectorAll('.track-list .track');
  trackListItems.forEach((trackItem) => {
    const trackIndex = Array.from(trackListItems).indexOf(trackItem);
    if (trackIndex === currentTrackIndex) {
      trackItem.style.background = 'var(--track-hover-color)';
    } else {
      trackItem.style.background = 'none';
    }
  });
}