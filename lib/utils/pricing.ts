export const BASE_PRICE = 99;
export const BASE_PRICE_INR = BASE_PRICE;
export const GST_RATE = 0.18;
export const GST_AMOUNT = Math.round(BASE_PRICE * GST_RATE * 100) / 100;
export const TOTAL_PRICE = 116.82;
export const TOTAL_PRICE_INR = TOTAL_PRICE;

export const PRICING_LABEL = `₹${BASE_PRICE_INR}/year + 18% GST = ₹${TOTAL_PRICE_INR.toFixed(2)}`;
