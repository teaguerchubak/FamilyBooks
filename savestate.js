// Save current page and scroll position
function saveLocation() {
  localStorage.setItem("lastPage", window.location.pathname);
  localStorage.setItem("scrollPos", window.scrollY);
}

// Save on scroll
window.addEventListener("scroll", () => {
  saveLocation();
});

// Save again before leaving
window.addEventListener("beforeunload", () => {
  saveLocation();
});

// Restore on load
window.addEventListener("load", () => {
  const lastPage = localStorage.getItem("lastPage");
  const scrollPos = localStorage.getItem("scrollPos");

  // If not already on the last page, go to it
  if (lastPage && lastPage !== window.location.pathname) {
    window.location.href = lastPage;
  } else if (scrollPos !== null) {
    // Delay scroll restore slightly to wait for full render
    setTimeout(() => {
      window.scrollTo(0, parseInt(scrollPos));
    }, 50);
  }
});