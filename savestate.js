// Redirect to last page if needed
const lastPage = localStorage.getItem("lastPage");
if (lastPage && lastPage !== window.location.pathname) {
  window.location.replace(lastPage);
}

// Save scroll position
function saveLocation() {
  localStorage.setItem("lastPage", window.location.pathname);
  localStorage.setItem("scrollPos", window.scrollY);
}

// Save on scroll
window.addEventListener("scroll", saveLocation);

// Save before unload
window.addEventListener("beforeunload", saveLocation);

// Restore scroll when page finishes loading
window.addEventListener("load", () => {
  const scrollPos = localStorage.getItem("scrollPos");
  if (scrollPos !== null) {
    setTimeout(() => {
      window.scrollTo(0, parseInt(scrollPos));
    }, 50);
  }
});