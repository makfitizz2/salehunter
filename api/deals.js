export default async function handler(req, res) {

  const categories = [
    "рюкзак",
    "наушники",
    "кроссовки",
    "футболка",
    "сумка",
    "чехол",
    "платье",
    "кепка"
  ];

  let results = [];

  for (const q of categories) {

    // имитация структуры WB (как реальные карточки)
    const items = [
      {
        title: `${q} basic`,
        price: 450,
        oldPrice: 2000,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      },
      {
        title: `${q} pro`,
        price: 700,
        oldPrice: 3500,
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

    results = results.concat(items);
  }

  const processed = results.map(p => {

    const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

    return {
      ...p,
      discount
    };
  })
  .filter(p =>
    p.discount >= 70 && p.price <= 1000
  );

  res.status(200).json(processed);
}
