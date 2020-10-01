export const getFormattedPrice = (price: number | undefined | null) => {
  return price != null ? price / 100 : price
}
