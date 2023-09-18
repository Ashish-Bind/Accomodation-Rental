function PriceFormatter({ price }) {
  const formattedPrice = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(price)
  return <span className="font-semibold text-base">{formattedPrice}</span>
}

export default PriceFormatter
