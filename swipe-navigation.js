let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].screenX;
  startY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  const currentX = e.changedTouches[0].screenX;
  const currentY = e.changedTouches[0].screenY;

  const deltaX = currentX - startX;
  const deltaY = currentY - startY;

  // Only block vertical scroll if it's a strong horizontal swipe
  if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
    e.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].screenX;
  endY = e.changedTouches[0].screenY;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  // Require strong horizontal swipe only
  if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;

  if (deltaX < 0) {
    goToNextChapter();
  } else {
    goToPreviousChapter();
  }
}

function goToNextChapter() {
  const { folderPath, chapter } = getCurrentChapterInfo();
  const next = chapter + 1;
  const nextPage = `${folderPath}/auto-ch-${next}.html`;
  checkIfExistsAndGo(nextPage);
}

function goToPreviousChapter() {
  const { folderPath, chapter } = getCurrentChapterInfo();
  const prev = chapter - 1;
  if (prev < 1) return;
  const prevPage = `${folderPath}/auto-ch-${prev}.html`;
  checkIfExistsAndGo(prevPage);
}

function getCurrentChapterInfo() {
  const pathParts = window.location.pathname.split('/');
  const folderPath = pathParts.slice(0, -1).join('/'); // up to folder
  const fileName = pathParts[pathParts.length - 1];
  const match = fileName.match(/auto-ch-(\d+)\.html/);
  const chapter = match ? parseInt(match[1], 10) : 1;
  return { folderPath, chapter };
}

function checkIfExistsAndGo(url) {
  fetch(url, { method: 'HEAD' })
    .then((res) => {
      if (res.ok) {
        const a = document.createElement('a');
        a.href = url;
        const nextPath = a.pathname;
        localStorage.setItem("lastPage", nextPath);
        localStorage.setItem("scrollPos", 0);
        window.location.href = url;
      }
    })
    .catch(() => {
      alert("Error loading chapter.");
    });
}