import { getDeals } from "./api.js";

function renderDeals(deals) {
  const container = document.getElementById("container");

  container.innerHTML = "";

  deals
    .filter(d => d.discount >= 70 && d.discount <= 90)
    .forEach(d => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        card.innerHTML = `
  <div><b>${d.title}</b></div>
  <div class="discount">-${d.discount}%</div>
  <div>Цена: ${d.price} ₽ вместо ${d.oldPrice} ₽</div>
  <div>${d.marketplace}</div>
  <a href="${d.url}" target="_blank">🔗 Открыть товар</a>
`;

      container.appendChild(card);
    });
}

async function init() {
  const deals = await getDeals();
  renderDeals(deals);
}

init();
