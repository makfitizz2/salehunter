export default function handler(req, res) {

  const baseProducts = [
    {
      title: "Рюкзак городской",
      price: 800,
      oldPrice: 4000,
      url: "https://www.wildberries.ru/catalog/123456/detail.aspx"
    },
    {
      title: "Беспроводные наушники",
      price: 600,
      oldPrice: 3000,
      url: "https://www.wildberries.ru/catalog/234567/detail.aspx"
    },
    {
      title: "Игровая мышь RGB",
      price: 500,
      oldPrice: 2500,
      url: "https://www.wildberries.ru/catalog/345678/detail.aspx"
    },
    {
      title: "Смарт-часы Sport",
      price: 900,
      oldPrice: 4500,
      url: "https://www.wildberries.ru/catalog/456789/detail.aspx"
    },
    {
      title: "Кроссовки Running",
      price: 1200,
      oldPrice: 6000,
      url: "https://www.wildberries.ru/catalog/567890/detail.aspx"
    },
    {
      title: "Повербанк 20000",
      price: 700,
      oldPrice: 3500,
      url: "https://www.wildberries.ru/catalog/678901/detail.aspx"
    }
  ];

  const products = baseProducts.map(p => {

    const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

    return {
      ...p,
      discount,
      image: "https://via.placeholder.com/500x400"
    };
  })
  .filter(p => p.discount >= 70); // 🔥 железный фильтр

  res.status(200).json(products);
}
