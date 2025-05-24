import { replace } from "lodash";
import numeral from "numeral";

// ----------------------------------------------------------------------

const locale = "en-US";

export function fCurrency(number) {
  const currencyCode = process.env.BASE_CURRENCY || "USD";

  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return currency.format(number);
}

export function fPercent(number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number) {
  return numeral(number).format("0.0 b");
}
