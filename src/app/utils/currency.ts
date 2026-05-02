// Currency formatting utility based on user's selected country

export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
}

const CURRENCY_MAP: Record<string, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", locale: "en-US" },
  PHP: { code: "PHP", symbol: "₱", locale: "en-PH" },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB" },
  AUD: { code: "AUD", symbol: "A$", locale: "en-AU" },
  CAD: { code: "CAD", symbol: "C$", locale: "en-CA" },
  NGN: { code: "NGN", symbol: "₦", locale: "en-NG" },
  INR: { code: "INR", symbol: "₹", locale: "en-IN" },
  EUR: { code: "EUR", symbol: "€", locale: "en-EU" },
  SGD: { code: "SGD", symbol: "S$", locale: "en-SG" },
  MYR: { code: "MYR", symbol: "RM", locale: "en-MY" },
  JPY: { code: "JPY", symbol: "¥", locale: "ja-JP" },
};

export function getCurrencyConfig(currencyCode: string): CurrencyConfig {
  return CURRENCY_MAP[currencyCode] || CURRENCY_MAP.PHP;
}

export function formatCurrency(
  amount: number,
  currencyCode: string = "PHP",
  options: { showSymbol?: boolean; showCode?: boolean } = {}
): string {
  const { showSymbol = true, showCode = false } = options;
  const config = getCurrencyConfig(currencyCode);

  const formatted = amount.toLocaleString(config.locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (showSymbol && showCode) {
    return `${config.symbol}${formatted} ${config.code}`;
  } else if (showSymbol) {
    return `${config.symbol}${formatted}`;
  } else if (showCode) {
    return `${formatted} ${config.code}`;
  }
  
  return formatted;
}

export function getCurrencySymbol(currencyCode: string = "PHP"): string {
  return getCurrencyConfig(currencyCode).symbol;
}
