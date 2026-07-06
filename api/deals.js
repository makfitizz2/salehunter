export default async function handler(req, res) {

  // категории поиска WB (реальные направления)
  const queries = [
    "рюкзак",
    "наушники",
    "кроссовки",
    "куртка",
    "смартфон"
  ];

  let results = [];

  for (const q of queries) {

    // имитация реального WB поведения (структура как у карточек)
    const items = [
      {
        title: `${q} premium`,
        price: 800,
        oldPrice: 4000,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      },
      {
        title: `${q} pro edition`,
        price: 600,
        oldPrice: 3000,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      },
      {
        title: `${q} ultra`,
        price: 1000,
        oldPrice: 5000,
        image: "https://via.placeholder.com/500x400",
        url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(q)}`
      }
    ];

    results = results.concat(items);
  }

  const withDiscount = results.map(p => {
    const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

    return {
      ...p,
      discount
    };
  })
  .filter(p => p.discount >= 70);

  res.status(200).json(withDiscount);
}
