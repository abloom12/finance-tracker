export const SUPPORTED_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'NZD',
  'CHF',
  'SEK',
  'NOK',
  'DKK',
  'SGD',
  'HKD',
] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const currencyMeta: Record<
  SupportedCurrency,
  { decimals: number; locale: string }
> = {
  USD: { decimals: 2, locale: 'en-US' },
  EUR: { decimals: 2, locale: 'de-DE' },
  GBP: { decimals: 2, locale: 'en-GB' },
  CAD: { decimals: 2, locale: 'en-CA' },
  AUD: { decimals: 2, locale: 'en-AU' },
  NZD: { decimals: 2, locale: 'en-NZ' },
  CHF: { decimals: 2, locale: 'de-CH' },
  SEK: { decimals: 2, locale: 'sv-SE' },
  NOK: { decimals: 2, locale: 'nb-NO' },
  DKK: { decimals: 2, locale: 'da-DK' },
  SGD: { decimals: 2, locale: 'en-SG' },
  HKD: { decimals: 2, locale: 'zh-HK' },
};

export function formatMoney(
  amountMinor: number,
  currency: keyof typeof currencyMeta,
  locale?: string,
) {
  const meta = currencyMeta[currency];
  const amount = amountMinor / 10 ** meta.decimals;

  return new Intl.NumberFormat(locale ?? meta.locale, {
    style: 'currency',
    currency,
  }).format(amount);
}
