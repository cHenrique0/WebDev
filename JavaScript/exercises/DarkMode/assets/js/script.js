const body = document.getElementsByTagName("body");
const title = document.getElementById("page-title");
const button = document.getElementById("mode-selector");
const footer = document.getElementsByTagName("footer");


button.addEventListener("click", () => {
  body[0].classList.toggle("dark-mode");
  footer[0].classList.toggle("dark-mode");
  button.classList.toggle("dark-mode");
  title.classList.toggle("dark-mode");
  
  if(body[0].classList.contains("dark-mode")) {
    title.innerHTML = "Dark Mode ON";
    button.innerHTML = "Light Mode";
  } else {
    title.innerHTML = "Light Mode ON";
    button.innerHTML = "Dark Mode";
  }
});

