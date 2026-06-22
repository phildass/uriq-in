export const BASE_PRICE_INR = 99;
export const GST_RATE = 0.18;

export const GST_AMOUNT = Math.round(BASE_PRICE_INR * GST_RATE * 100) / 100;
export const TOTAL_PRICE_INR = Math.round((BASE_PRICE_INR + GST_AMOUNT) * 100) / 100;

export const PRICING_LABEL = `₹${BASE_PRICE_INR}/year + 18% GST = ₹${TOTAL_PRICE_INR.toFixed(2)}`;
