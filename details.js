async function getCarDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");

  if (!carId) {
    document.getElementById("car-detail-container").innerHTML =
      "<h2>Elan tapılmadı!</h2>";
    return;
  }

  let carsData = [];
  const localData = localStorage.getItem("my_cars");

  if (localData) {
    carsData = JSON.parse(localData);
  } else {
    try {
      const res = await fetch("db.json");
      carsData = await res.json();
    } catch (err) {
      console.error(err);
    }
  }

  const car = carsData.find((c) => String(c.id) === String(carId));

  if (!car) {
    document.getElementById("car-detail-container").innerHTML =
      "<h2>Elan tapılmadı!</h2>";
    return;
  }

  const container = document.getElementById("car-detail-container");
  container.innerHTML = `
    <div class="detail-wrapper">
      <div class="detail-header">
        <h1>${car.marka} ${car.model}, ${car.engine} L, ${car.year} il</h1>
        <div class="detail-price">${car.price.toLocaleString()} ${car.currency}</div>
      </div>
      <div class="detail-body">
        <div class="detail-img-box">
          <img src="${car.cover}" alt="${car.marka}">
        </div>
        <div class="detail-info-box">
          <h3>Texniki göstəricilər</h3>
          <ul class="specs-list">
            <li><span>Marka</span> <strong>${car.marka}</strong></li>
            <li><span>Model</span> <strong>${car.model}</strong></li>
            <li><span>Buraxılış ili</span> <strong>${car.year}</strong></li>
            <li><span>Mühərrik</span> <strong>${car.engine} L</strong></li>
            <li><span>Güc</span> <strong>${car.power} d.q.</strong></li>
            <li><span>Yürüş</span> <strong>${car.mileage.toLocaleString()} km</strong></li>
            <li><span>Sürətlər qutusu</span> <strong>${car.gearbox}</strong></li>
            <li><span>Vəziyyəti</span> <strong>${car.isNew ? "Yeni" : "Sürülmüş"}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

getCarDetails();
