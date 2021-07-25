/* variables */

const rowDiv = document.querySelector(".row");
const categories = document.getElementsByClassName("category-details");
const cardMain = document.querySelector(".card-deck");

/* Common Async fetch function  */

async function fetchAPI(url, callbck) {
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`${resp.status}`);
    const data = await resp.json();
    callbck(data);
  } catch (error) {
    alert("Error in fetching  data , Getting " + error);
  }
}

/* handling event listener for films, people , planet and starship */

cardMain.addEventListener("click", (e) => {
  const targetEl = e.target.offsetParent.getAttribute("class");

  switch (targetEl) {
    case "card category-details-films":
      console.log("films");
      fetchAPI("https://swapi.dev/api/films", displayMovies);
      break;
    case "card category-details-people":
      console.log("people");
      fetchAPI("https://swapi.dev/api/people", displayCharacters);
      break;
    case "card category-details-planet":
      console.log("planet");
      fetchAPI("https://swapi.dev/api/planets", displayPlanets);
      break;
    case "card category-details-starship":
      console.log("starship");
      fetchAPI("https://swapi.dev/api/starships", displayStarships);
      break;
    default:
      console.log("missed");
  }
});

/* for displaying DOM for movies  */
function displayMovies({ results: data }) {
  console.log(data);
  rowDiv.innerHTML = "";
  data.forEach((el) => {
    rowDiv.innerHTML += `
    <div class="col-3 m-2 d-flex">
        <div class="card bg-dark text-warning">
            <img src="https://i.pinimg.com/564x/dd/a2/0a/dda20a2031f4ff11572dce69a356b7db.jpg" class="card-img" alt="...">
            <div class="card-img-overlay font-weight-bolder">
                 <h5 class="card-title">${el.title}</h5>
                 <p class="card-text">${
                   el.opening_crawl.slice(0, 190) + "..."
                 }</p>
            </div>
        </div>
    </div>   
    `;
  });
}

/* for displaying DOM for characters  */

function displayCharacters({ results: data }) {
  rowDiv.innerHTML = "";
  data.forEach((el) => {
    rowDiv.innerHTML += `
        <div class="col-3 m-2 d-flex">
          <div class="card border-warning mb-3 bg-warning" style="max-width: 18rem;">
          <div class="card-header text-white text-center">CHARACTER</div>
          <div class="card-body text-white">
                <h5 class="card-title">${el.name}</h5>
                <p class="card-text">has height ${el.height}  and mass ${el.mass}. has skin color ${el.skin_color} and 
                eye color ${el.eye_color} and born in ${el.birth_year}</p>
              </div>
            </div>
        </div>
        `;
  });
}

/* for displaying DOM for planets  */

function displayPlanets({ results: data }) {
  rowDiv.innerHTML = "";
  data.forEach((el) => {
    rowDiv.innerHTML += `
        <div class="col-3 m-2 d-flex">
          <div class="card border-success mb-3 bg-success" style="max-width: 18rem;">
          <div class="card-header text-white text-center">PLANET</div>
          <div class="card-body text-white">
                <h5 class="card-title">${el.name}</h5>
                <p class="card-text">has diameter ${el.diameter}  and climate ${el.climate}. has  ${el.terrain} terrain and 
                population ${el.population}</p>
              </div>
            </div>
        </div>
        `;
  });
}

/* for displaying DOM for starships  */

function displayStarships({ results: data }) {
  rowDiv.innerHTML = "";
  data.forEach((el) => {
    rowDiv.innerHTML += `
          <div class="col-3 m-2 d-flex">
            <div class="card border-info mb-3 bg-info" style="max-width: 18rem;">
            <div class="card-header text-white text-center font-weight-bold">STARSHIP</div>
            <div class="card-body text-white">
                  <h5 class="card-title">${el.name}</h5>
                  <p class="card-text">Manufactured by ${el.manufacturer}  and costs ${el.cost_in_credits}.It can attain maximum speed of 
                    ${el.max_atmosphering_speed} and  hold ${el.crew} crew and ${el.passengers} passengers and has cargo capacity
                  of  ${el.cargo_capacity} and ship belongs to ${el.starship_class} class</p>
                </div>
              </div>
          </div>
          `;
  });
}
