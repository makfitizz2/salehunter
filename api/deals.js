export default async function handler(req, res) {

  const query = "платья";

  // несколько регионов WB (это КЛЮЧ к решению)
  const destList = [
    -1257786,
    -102266,
    -1235853
  ];

  let products = [];

  for (const dest of destList) {

    const url =
      `https://search.wb.ru/exactmatch/ru/common/v9/search?appType=1&curr=rub&dest=${dest}&query=${encodeURIComponent(query)}&page=1&resultset=catalog&sort=popular&spp=30`;

    try {

      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json"
        }
      });

      const data = await response.json();

      const items = data?.data?.products || [];

      if (items.length > 0) {
        products = items;
        break; // нашли рабочий регион → выходим
      }

    } catch (e) {
      continue;
    }
  }

  const result = [];

  for (const p of products) {

    const price = (p.salePriceU || p.priceU) / 100;
    const oldPrice = (p.priceU || p.salePriceU) / 100;

    if (!price || !oldPrice) continue;

    const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

    // ЖЁСТКИЕ УСЛОВИЯ
    if (price > 1000) continue;
    if (discount < 70) continue;

    result.push({
      id: p.id,
      title: p.name,
      price,
      oldPrice,
      discount,
      image: `https://images.wbstatic.net/c516x688/${p.id}.jpg`,
      url: `https://www.wildberries.ru/catalog/${p.id}/detail.aspx`
    });
  }

  res.status(200).json(result);
}
