let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const distance = endX - startX;
  if (Math.abs(distance) < 50) return;

  if (distance < 0) {
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

  // Get everything except the file name at the end
  const folderPath = pathParts.slice(0, -1).join('/');

  const fileName = pathParts[pathParts.length - 1];
  const match = fileName.match(/auto-ch-(\d+)\.html/);
  const chapter = match ? parseInt(match[1], 10) : 1;

  return { folderPath, chapter };
}

const nextPage = `${folderPath}/auto-ch-${next}.html`;

// Optional: check that the file exists before going to it
function checkIfExistsAndGo(url) {
  fetch(url, { method: 'HEAD' })
    .then((res) => {
      if (res.ok) {
        localStorage.setItem("lastPage", url);
        localStorage.setItem("scrollPos", 0);
        window.location.href = url;
      }
    });
}