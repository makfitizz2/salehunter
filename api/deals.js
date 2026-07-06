export default async function handler(req, res) {

  const CATEGORY_URL =
    "https://www.wildberries.ru/catalog/obuv/zhenskaya";

  try {

    const response = await fetch(CATEGORY_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    // ищем JSON внутри страницы
    const jsonMatch = html.match(/window.__INITIAL_STATE__\s*=\s*(\{.*\});/);

    if (!jsonMatch) {
      return res.status(200).json([]);
    }

    const data = JSON.parse(jsonMatch[1]);

    const productsRaw =
      data?.catalog?.products ||
      data?.products ||
      [];

    const results = [];

    for (const p of productsRaw) {

      const price = p.priceU ? p.priceU / 100 : null;
      const oldPrice = p.salePriceU ? p.salePriceU / 100 : price;

      if (!price || !oldPrice) continue;

      const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

      // строгие условия
      if (price > 1000) continue;
      if (discount < 70) continue;

      results.push({
        title: p.name,
        price,
        oldPrice,
        discount,
        image: `https://images.wbstatic.net/c516x688/${p.id}.jpg`,
        url: `https://www.wildberries.ru/catalog/${p.id}/detail.aspx`
      });
    }

    res.status(200).json(results);

  } catch (e) {
    res.status(500).json({ error: "parse_failed" });
  }
}
