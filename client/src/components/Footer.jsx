function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="w-full p-1 text-center bg-primary text-white">
      © {year} Copyright <b>StayWise</b>
    </div>
  )
}

export default Footer
