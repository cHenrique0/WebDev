const BASE_URL = "https://thatcopy.pw/catAPI/rest/";
const button = document.getElementById("change-cat");
const img = document.getElementById("cat");

const getCats = async () => {
  try {
    const data = await fetch(BASE_URL);
    const json = await data.json();

    return json.url;
  } catch (e) {
    console.log(e.message);
  }
};

const loadImg = async () => {
  img.src = await getCats();
};

button.addEventListener("click", loadImg);

loadImg();
