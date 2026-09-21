let carsData = [];

async function loadCars() {
  const localData = localStorage.getItem("my_cars");

  if (localData) {
    carsData = JSON.parse(localData);
  } else {
    try {
      const res = await fetch("db.json");
      carsData = await res.json();
      localStorage.setItem("my_cars", JSON.stringify(carsData));
    } catch (err) {
      console.error("Xəta baş verdi:", err);
    }
  }
  renderCars(carsData);
}

function renderCars(cars) {
  const container = document.getElementById("cars-container");
  container.innerHTML = "";

  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = "car-card";
    card.onclick = () => {
      window.location.href = `details.html?id=${car.id}`;
    };

    card.innerHTML = `
      <div class="card-img">
        <img src="${car.cover}" alt="${car.marka}">
      </div>
      <div class="card-info">
        <div class="card-price">${car.price.toLocaleString()} ${car.currency}</div>
        <div class="card-title">${car.marka} ${car.model}</div>
        <div class="card-subtitle">${car.year}, ${car.engine} L, ${car.mileage.toLocaleString()} km</div>
      </div>
    `;
    container.appendChild(card);
  });
}

const addForm = document.getElementById("add-car-form");
if (addForm) {
  addForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newCar = {
      id: Date.now(),
      marka: document.getElementById("marka").value,
      model: document.getElementById("model").value,
      year: Number(document.getElementById("year").value),
      engine: Number(document.getElementById("engine").value),
      price: Number(document.getElementById("price").value),
      currency: document.getElementById("currency").value,
      gearbox: document.getElementById("gearbox").value,
      mileage: Number(document.getElementById("mileage").value),
      power: Number(document.getElementById("power").value),
      isNew: document.getElementById("isNew").checked,
      cover: document.getElementById("cover").value,
    };

    carsData.unshift(newCar);
    localStorage.setItem("my_cars", JSON.stringify(carsData));
    renderCars(carsData);

    this.reset();
    document.getElementById("add-modal").style.display = "none";
  });
}

const openBtn = document.getElementById("open-add-modal");
if (openBtn) {
  openBtn.onclick = () => {
    document.getElementById("add-modal").style.display = "flex";
  };
}

const closeBtn = document.getElementById("close-add-modal");
if (closeBtn) {
  closeBtn.onclick = () => {
    document.getElementById("add-modal").style.display = "none";
  };
}

loadCars();
