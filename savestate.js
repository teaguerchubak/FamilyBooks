const currentPath = window.location.pathname;
const lastPage = localStorage.getItem("lastPage");
const alreadyRedirected = sessionStorage.getItem("redirectedThisSession");
const isHomePage =
  currentPath.endsWith("/index.html") ||
  currentPath === "/charlie/" ||
  currentPath === "/charlie";

if (isHomePage && lastPage && lastPage !== currentPath && !alreadyRedirected) {
  sessionStorage.setItem("redirectedThisSession", "true");
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