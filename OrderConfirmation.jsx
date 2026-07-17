import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000)

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-rust mb-4">Order #{orderNumber}</p>
      <h1 className="font-display text-3xl mb-4">Thank you.</h1>
      <p className="font-body text-ink/70 mb-10">
        This is a demo confirmation — no real order was placed and no payment was processed.
      </p>
      <Link
        to="/shop"
        className="inline-block font-mono text-xs uppercase tracking-wide border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  )
}
