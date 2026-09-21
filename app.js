const API_URL = "http://localhost:5000/cars";

// 1. API-dən elanları GET sorğusu ilə oxumaq
async function loadCars() {
  try {
    const response = await axios.get(API_URL);
    renderCars(response.data);
  } catch (error) {
    console.error("API-dən elanlar yüklənərkən xəta baş verdi:", error);
  }
}

// 2. Elanları HTML-də ekrana vermək
function renderCars(cars) {
  const container = document.getElementById("cars-container");

  if (!container) return;

  container.innerHTML = "";

  cars.forEach((car) => {
    const card = document.createElement("div");

    card.className = "car-card";

    card.onclick = () => {
      window.location.href = `details.html?id=${car.id}`;
    };

    card.innerHTML = `
            <div class="card-img">
                <img src="${car.cover}" alt="${car.marka} ${car.model}">
            </div>

            <div class="card-info">
                <div class="card-price">
                    ${Number(car.price).toLocaleString()} ${car.currency}
                </div>

                <div class="card-title">
                    ${car.marka} ${car.model}
                </div>

                <div class="card-subtitle">
                    ${car.year} il, ${car.engine} L,
                    ${Number(car.mileage).toLocaleString()} km
                </div>
            </div>
        `;

    container.appendChild(card);
  });
}

// 3. Yeni elan əlavə etmək
const addForm = document.getElementById("add-car-form");

if (addForm) {
  addForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const newCar = {
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

    try {
      await axios.post(API_URL, newCar);

      await loadCars();

      this.reset();

      document.getElementById("add-modal").style.display = "none";
    } catch (error) {
      console.error("Yeni elan əlavə edilərkən xəta:", error);
    }
  });
}

// 4. Modal idarəçiliyi
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

// Səhifə açılanda elanları gətir
loadCars();
