export function showLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "flex";
}

export function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "none";  
}

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
