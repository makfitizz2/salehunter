export default async function handler(req, res) {

  const categories = [
    "рюкзак",
    "наушники",
    "кроссовки",
    "сумка",
    "футболка",
    "чехол",
    "кепка",
    "платье"
  ];

  let results = [];

  for (const q of categories) {

    const items = [
      {
        title: `${q} basic`,
        price: 450,
        oldPrice: 2500,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      },
      {
        title: `${q} pro`,
        price: 600,
        oldPrice: 3000,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      },
      {
        title: `${q} ultra`,
        price: 900,
        oldPrice: 5000,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      },
      {
        title: `${q} mini`,
        price: 300,
        oldPrice: 1500,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      }
    ];

    for (const p of items) {

      const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

      // 🔥 ЖЁСТКИЕ ПРАВИЛА ВНУТРИ ЦИКЛА
      if (p.price <= 1000 && discount >= 70) {
        results.push({
          ...p,
          discount
        });
      }
    }
  }

  res.status(200).json(results);
}
