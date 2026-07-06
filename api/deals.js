export default function handler(req, res) {

  const queries = ["наушники", "рюкзак", "кроссовки"];

  const products = [];

  for (const q of queries) {

    const base = [
      { title: "Наушники Bluetooth", price: 600, oldPrice: 3000 },
      { title: "Игровая мышь", price: 500, oldPrice: 2500 },
      { title: "Рюкзак городской", price: 800, oldPrice: 4000 },
      { title: "Кроссовки", price: 1200, oldPrice: 6000 }
    ];

    base.forEach(p => {
      const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

      if (discount >= 70) {
        products.push({
          ...p,
          discount,
          image: "https://via.placeholder.com/400",
          url: `https://www.ozon.ru/search/?text=${encodeURIComponent(p.title)}`
        });
      }
    });
  }

  res.status(200).json(products);
}
