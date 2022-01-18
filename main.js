const form = document.querySelector("form");
const myLocation = document.querySelector("#myLocation");
const input = document.querySelector(".search-city input");
const msg = document.querySelector(".msg");
const weatherCity = document.querySelector(".info");

function data(url) {
  const li = document.createElement("li");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, weather, sys, name } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      const temp = Math.floor(main.temp);
      let degree = "";
      let degree_icon = "";
      if (temp > 30) {
        degree = "hot";
        degree_icon = "fas fa-temperature-high";
      } else if (temp < 30 && temp > 4) {
        degree = "normal";
      } else {
        degree = "cold";
        degree_icon = "fas fa-temperature-low";
      }

      const markup = `
        <div class="city-info d-flex">
          <h2 class="city"><span>${name}</span> <span>${sys.country}</span></h2>
          <p class="temp ${degree}"><i class="${degree_icon}"></i>  ${Math.floor(
        main.temp
      )}</p>
        </div>
        <article class="description">
          <img src="${icon}" alt="weather" class="img-fluid" />
          <p>${weather[0].description}</p>
        </article>	
        `;
      li.innerHTML = markup;
      weatherCity.appendChild(li);
      msg.innerHTML = "";
    })
    .catch(() => (msg.innerHTML = "please inter valid city"));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputval = input.value;
  console.log(inputval);
  const key = "cc8c130060196ac7c9ae8e87361ade4f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputval}&appid=${key}&units=metric`;
  console.log(url);
  
  data(url);

  input.value = "";
});

myLocation.addEventListener("click", (e) => {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const key = "cc8c130060196ac7c9ae8e87361ade4f";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
     data(url);
    },
    () => {
      console.log("err");
    }
  );
});
