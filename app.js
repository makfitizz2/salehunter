const deals = [
  {
    title: "Ozon: Смарт-часы",
    oldPrice: 1999,
    price: 499,
    marketplace: "Ozon",
    url: "https://ozon.ru",
  },
  {
    title: "WB: Наушники",
    oldPrice: 1890,
    price: 349,
    marketplace: "Wildberries",
    url: "https://wildberries.ru",
  },
  {
    title: "Ozon: Рюкзак",
    oldPrice: 2500,
    price: 600,
    marketplace: "Ozon",
    url: "https://ozon.ru",
  },
];

function getDiscount(oldPrice, price) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function renderDeals() {
  const container = document.getElementById("container");

  container.innerHTML = "";

  deals
    .filter(d => getDiscount(d.oldPrice, d.price) >= 70)
    .forEach(d => {
      const discount = getDiscount(d.oldPrice, d.price);

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div><b>${d.title}</b></div>
        <div class="discount">-${discount}%</div>
        <div>Цена: ${d.price} ₽ вместо ${d.oldPrice} ₽</div>
        <a href="${d.url}" target="_blank">Открыть</a>
      `;

      container.appendChild(card);
    });
}

renderDeals();
