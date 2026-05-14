export const SUPPORTED_CURRENCIES = ['USD'] as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const currencyMeta: Record<
  SupportedCurrency,
  { decimals: number; locale: string }
> = { USD: { decimals: 2, locale: 'en-US' } };

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
