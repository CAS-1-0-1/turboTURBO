const API_URL = "http://localhost:5000/cars";
let currentCarId = null;

async function getCarDetails() {
  const container = document.getElementById("car-detail-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");
  currentCarId = carId;

  if (!carId) {
    container.innerHTML = "Elan ID-si tapılmadı!";
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/${carId}`);
    const car = response.data;

    container.innerHTML = `
    <div class="detail-wrapper">
        <div class="detail-header">
            <div>
                <h2>${car.marka} ${car.model}</h2>
                <p>${car.year} il</p>
            </div>
            <div class="detail-price">
                ${Number(car.price).toLocaleString()} ${car.currency}
            </div>
        </div>

        <div class="detail-body">
            <div class="detail-img-box">
                <img src="${car.cover}" alt="${car.marka} ${car.model}" />
                <!-- BUTONLAR BURAYA ƏLAVƏ OLUNDU -->
                <div class="action-buttons">
                    <button class="btn-edit" id="trigger-edit">Düzəliş et</button>
                    <button class="btn-delete" id="trigger-delete">Elanı sil</button>
                </div>
            </div>

            <div>
                <h3>Texniki göstəricilər</h3>
                <ul class="specs-list">
                    <li><span>Marka</span><strong>${car.marka}</strong></li>
                    <li><span>Model</span><strong>${car.model}</strong></li>
                    <li><span>Buraxılış ili</span><strong>${car.year}</strong></li>
                    <li><span>Mühərrik</span><strong>${car.engine} L</strong></li>
                    <li><span>Güc</span><strong>${car.power} d.q.</strong></li>
                    <li><span>Yürüş</span><strong>${Number(car.mileage).toLocaleString()} km</strong></li>
                    <li><span>Sürətlər qutusu</span><strong>${car.gearbox}</strong></li>
                    <li><span>Vəziyyəti</span><strong>${car.isNew ? "Yeni" : "Sürülmüş"}</strong></li>
                </ul>
            </div>
        </div>
    </div>
    `;

    document.getElementById("trigger-delete").onclick = () => deleteCar(carId);
    document.getElementById("trigger-edit").onclick = () => openEditModal(car);
  } catch (error) {
    console.error("Detallar yüklənərkən xəta baş verdi:", error);
    container.innerHTML = "Məlumat yüklənərkən xəta baş verdi!";
  }
}

async function deleteCar(id) {
  const confirmDelete = confirm("Bu elanı silmək istədiyinizdən əminsiniz?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`${API_URL}/${id}`);
    alert("Elan uğurla silindi!");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Elan silinərkən xəta:", error);
    alert("Silinmə zamanı xəta baş verdi.");
  }
}

function openEditModal(car) {
  document.getElementById("edit-marka").value = car.marka;
  document.getElementById("edit-model").value = car.model;
  document.getElementById("edit-year").value = car.year;
  document.getElementById("edit-engine").value = car.engine;
  document.getElementById("edit-price").value = car.price;
  document.getElementById("edit-currency").value = car.currency;
  document.getElementById("edit-gearbox").value = car.gearbox;
  document.getElementById("edit-mileage").value = car.mileage;
  document.getElementById("edit-power").value = car.power;
  document.getElementById("edit-cover").value = car.cover;
  document.getElementById("edit-isNew").checked = car.isNew;
  document.getElementById("edit-modal").style.display = "flex";
}

const closeEditBtn = document.getElementById("close-edit-modal");
if (closeEditBtn) {
  closeEditBtn.onclick = () => {
    document.getElementById("edit-modal").style.display = "none";
  };
}

const editForm = document.getElementById("edit-car-form");
if (editForm) {
  editForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const updatedCar = {
      marka: document.getElementById("edit-marka").value,
      model: document.getElementById("edit-model").value,
      year: Number(document.getElementById("edit-year").value),
      engine: Number(document.getElementById("edit-engine").value),
      price: Number(document.getElementById("edit-price").value),
      currency: document.getElementById("edit-currency").value,
      gearbox: document.getElementById("edit-gearbox").value,
      mileage: Number(document.getElementById("edit-mileage").value),
      power: Number(document.getElementById("edit-power").value),
      isNew: document.getElementById("edit-isNew").checked,
      cover: document.getElementById("edit-cover").value,
    };

    try {
      await axios.put(`${API_URL}/${currentCarId}`, updatedCar);
      alert("Elan uğurla yeniləndi!");
      document.getElementById("edit-modal").style.display = "none";
      getCarDetails();
    } catch (error) {
      console.error("Elan yenilənərkən xəta:", error);
      alert("Yenilənmə zamanı xəta baş verdi.");
    }
  });
}

getCarDetails();
