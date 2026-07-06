import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// временные запросы (мы потом расширим)
const queries = ["наушники", "рюкзак", "кроссовки"];

function calcDiscount(oldPrice, price) {
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

// имитация “реального сбора” (позже заменим на парсинг Ozon/WB)
async function getProducts(query) {
  const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
  const data = await res.json();

  return data.products.map(p => {
    const oldPrice = Math.round(p.price * 2);
    const price = p.price;

    return {
      title: p.title,
      price,
      oldPrice,
      discount: calcDiscount(oldPrice, price),
      image: p.thumbnail,
      url: `https://www.ozon.ru/search/?text=${encodeURIComponent(p.title)}`
    };
  });
}

app.get("/deals", async (req, res) => {
  let all = [];

  for (const q of queries) {
    const items = await getProducts(q);
    all = all.concat(items);
  }

  const filtered = all.filter(p => p.discount >= 70);

  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
