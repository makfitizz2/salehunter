import { getDeals } from "./api.js";

function renderDeals(deals) {
  const container = document.getElementById("container");

  container.innerHTML = "";

  deals
    .filter(d => d.discount >= 70 && d.discount <= 90)
    .forEach(d => {
      const card = document.createElement("div");
      card.className = "card";

      card.style.cursor = "pointer";

      card.onclick = () => {
        window.open(d.url, "_blank");
      };

      card.innerHTML = `
        <div><b>${d.title}</b></div>
        <div class="discount">-${d.discount}%</div>
        <div>Цена: ${d.price} ₽ вместо ${d.oldPrice} ₽</div>
        <div>${d.marketplace}</div>

        <button style="
          margin-top:10px;
          padding:8px;
          border:none;
          background:black;
          color:white;
          border-radius:6px;
          cursor:pointer;
        ">
          Открыть товар
        </button>
      `;

      container.appendChild(card);
    });
}

async function init() {
  const deals = await getDeals();
  renderDeals(deals);
}

async function init() {
  const query = "phone"; // можно менять на "shoes", "bag", "laptop"

  const deals = await getDeals(query);
  renderDeals(deals);
}
