/** Fiyatlar AED olarak saklanır. Diğerleri ileride görüntüleme seçeneği olarak açılacak. */
export const currencies = ['AED', 'USD', 'EUR', 'TRY'] as const;

export type CurrencyCode = (typeof currencies)[number];

export const defaultCurrency: CurrencyCode = 'AED';
