function PriceFormatter({ price }) {
  const formattedPrice = new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
  return <span className="font-medium text-base">{formattedPrice}</span>
}

export default PriceFormatter
