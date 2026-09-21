const API_URL = "http://localhost:5000/cars";

async function getCarDetails() {
  const container = document.getElementById("car-detail-container");

  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");

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
                <img
                    src="${car.cover}"
                    alt="${car.marka} ${car.model}"
                />
            </div>

            <div>
                <h3>Texniki göstəricilər</h3>

                <ul class="specs-list">
                    <li>
                        <span>Marka</span>
                        <strong>${car.marka}</strong>
                    </li>

                    <li>
                        <span>Model</span>
                        <strong>${car.model}</strong>
                    </li>

                    <li>
                        <span>Buraxılış ili</span>
                        <strong>${car.year}</strong>
                    </li>

                    <li>
                        <span>Mühərrik</span>
                        <strong>${car.engine} L</strong>
                    </li>

                    <li>
                        <span>Güc</span>
                        <strong>${car.power} d.q.</strong>
                    </li>

                    <li>
                        <span>Yürüş</span>
                        <strong>
                            ${Number(car.mileage).toLocaleString()} km
                        </strong>
                    </li>

                    <li>
                        <span>Sürətlər qutusu</span>
                        <strong>${car.gearbox}</strong>
                    </li>

                    <li>
                        <span>Vəziyyəti</span>
                        <strong>
                            ${car.isNew ? "Yeni" : "Sürülmüş"}
                        </strong>
                    </li>
                </ul>
            </div>

        </div>

    </div>
`;
  } catch (error) {
    console.error("Detallar yüklənərkən xəta baş verdi:", error);

    container.innerHTML = "Məlumat yüklənərkən xəta baş verdi!";
  }
}

getCarDetails();
