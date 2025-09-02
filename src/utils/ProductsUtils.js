// utils/productUtils.js
export function normalizeCartProduct(product) {
  // If already normalized, skip
  if (product.selectedVariant) return product;

  // Guess best variant (lowest price) if quantity array exists
  let variant = null;
  let arr = Array.isArray(product.quantity)
    ? product.quantity
    : typeof product.quantity === 'string'
    ? (() => { try { return JSON.parse(product.quantity) } catch { return [] } })()
    : [];
  if (arr.length) {
    variant = arr.reduce(
      (best, cur) =>
        Number(cur.final_price ?? cur.finalPrice ?? Infinity) <
        Number(best.final_price ?? best.finalPrice ?? Infinity)
          ? cur
          : best,
      arr[0]
    );
  }

  // Use variant or fallback fields
  return {
    ...product,
    selectedVariant: variant || null,
    cartQty: product.cartQty || 1,
    unitPrice:
      Number(variant?.final_price ?? variant?.finalPrice) ||
      Number(product.price) ||
      0,
    weight: variant?.weight ?? product.weight,
    // Add other normalized fields as required for your CartCard rendering
    // Such as discount, makingCharge, etc.
  };
}
