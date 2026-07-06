export default function handler(req, res) {

  const rawItems = [
    { title: "Рюкзак городской", price: 450, oldPrice: 2500 },
    { title: "Наушники Bluetooth", price: 600, oldPrice: 3000 },
    { title: "Игровая мышь", price: 700, oldPrice: 3200 },
    { title: "Кроссовки sport", price: 900, oldPrice: 5000 },
    { title: "Сумка женская", price: 300, oldPrice: 1800 },
    { title: "Футболка oversize", price: 250, oldPrice: 1500 },
    { title: "Кепка street", price: 200, oldPrice: 1200 },
    { title: "Чехол для телефона", price: 150, oldPrice: 1000 },
    { title: "Повербанк mini", price: 800, oldPrice: 4000 },
    { title: "Часы smart", price: 950, oldPrice: 6000 }
  ];

  const normalizeNumber = (value) => {
    return Number(String(value).replace(/[^\d.]/g, ""));
  };

  const calculateDiscount = (price, oldPrice) => {
    const p = normalizeNumber(price);
    const o = normalizeNumber(oldPrice);

    if (!p || !o || o <= 0 || p <= 0) return 0;

    return Math.round(((o - p) / o) * 100);
  };

  const filtered = [];

  for (let i = 0; i < rawItems.length; i++) {

    const item = rawItems[i];

    const price = normalizeNumber(item.price);
    const oldPrice = normalizeNumber(item.oldPrice);

    const discount = calculateDiscount(price, oldPrice);

    const isValidPrice = price <= 1000;
    const isValidDiscount = discount >= 70;

    if (!isValidPrice) continue;
    if (!isValidDiscount) continue;

    filtered.push({
      title: item.title,
      price,
      oldPrice,
      discount,
      image: "https://via.placeholder.com/500x400",
      url: `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(item.title)}`
    });
  }

  res.status(200).json(filtered);
}
