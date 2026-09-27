/**
 * Formata valores numéricos para o padrão de moeda brasileira (BRL).
 * Exemplo: 129.9 -> "R$ 129,90"
 */
export function formatBRL(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(value)) {
    return "Consulte o valor";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Calcula a porcentagem de desconto com base no preço anterior e preço atual.
 * Exemplo: previousPrice: 159.90, currentPrice: 129.90 -> 19 (retorna número inteiro)
 */
export function calculateDiscountPercentage(
  previousPrice: number | null | undefined,
  currentPrice: number | null | undefined
): number | null {
  if (
    !previousPrice ||
    !currentPrice ||
    previousPrice <= currentPrice ||
    previousPrice <= 0
  ) {
    return null;
  }

  const discount = Math.round(((previousPrice - currentPrice) / previousPrice) * 100);
  return discount > 0 ? discount : null;
}
