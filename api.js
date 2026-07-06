export async function getDeals() {
  // пока делаем “умный мок”, чтобы система была готова к реальным API

  const raw = [
  {
    title: "Ozon товар 1",
    oldPrice: 3000,
    price: 800,
    marketplace: "Ozon",
    url: "https://www.ozon.ru",
  },
  {
    title: "WB товар 2",
    oldPrice: 2500,
    price: 600,
    marketplace: "WB",
    url: "https://www.wildberries.ru",
  },
  {
    title: "Ozon товар 3",
    oldPrice: 1990,
    price: 1200,
    marketplace: "Ozon",
    url: "https://www.ozon.ru",
  },
  {
    title: "WB товар 4",
    oldPrice: 5000,
    price: 1000,
    marketplace: "WB",
    url: "https://www.wildberries.ru",
  },
];

  return raw.map(item => ({
    ...item,
    discount: Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100),
  }));
}
