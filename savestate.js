const currentPath = window.location.pathname;
const lastPage = localStorage.getItem("lastPage");
const alreadyRedirected = sessionStorage.getItem("redirectedThisSession");
const isHomePage =
  currentPath.endsWith("/index.html");

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
  const lastPage = localStorage.getItem("lastPage");
  const currentPath = window.location.pathname;

  if (scrollPos !== null && lastPage === currentPath) {
    setTimeout(() => {
      window.scrollTo(0, parseInt(scrollPos));
    }, 50);
  } else {
    // Always scroll to top if it's a new page
    window.scrollTo(0, 0);
  }
});



let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", () => {
  installBtn.hidden = true;
  deferredPrompt.prompt();
});





if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
  .then(() => console.log("Service Worker registered!"))
  .catch((err) => console.error("Service Worker failed:", err));
}