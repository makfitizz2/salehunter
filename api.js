export async function getDeals(query = "скидки") {

  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`
  );

  const data = await response.json();

  return data.products.map(p => {
    const oldPrice = Math.round(p.price * 2);
    const price = p.price;

    return {
      title: p.title,
      oldPrice,
      price,
      discount: Math.round(((oldPrice - price) / oldPrice) * 100),
      marketplace: "Demo data",
      url: "https://example.com",
    };
  });
}
