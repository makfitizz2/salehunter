export default function handler(req, res) {

  const baseProducts = [
    { title: "Рюкзак городской", price: 800, oldPrice: 4000 },
    { title: "Наушники Bluetooth", price: 600, oldPrice: 3000 },
    { title: "Игровая мышь", price: 500, oldPrice: 2500 },
    { title: "Смарт-часы", price: 900, oldPrice: 4500 },
    { title: "Кроссовки", price: 1200, oldPrice: 6000 },
    { title: "Повербанк", price: 700, oldPrice: 3500 },
    { title: "Фитнес-браслет", price: 650, oldPrice: 3200 },
    { title: "Куртка зимняя", price: 1500, oldPrice: 7000 }
  ];

  const products = baseProducts.map(p => {

    const discount = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);

    return {
      ...p,
      discount,
      image: "https://via.placeholder.com/500x400",
      url: `https://www.ozon.ru/search/?text=${encodeURIComponent(p.title)}`
    };
  })
  .filter(p => p.discount >= 70); // 🔥 ВОТ ЖЁСТКИЙ ФИЛЬТР

  res.status(200).json(products);
}
