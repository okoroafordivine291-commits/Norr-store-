import { Link } from 'react-router-dom'
import { useCart } from '/CartContext.jsx'
import CartItem from '/CartItem.jsx'

export default function Cart() {
  const { items, subtotal } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-2xl mb-4">Your cart is empty.</p>
        <Link
          to="/shop"
          className="inline-block font-mono text-xs uppercase tracking-wide border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl mb-10">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="border border-ink/20 p-6 sticky top-24">
            <div className="flex justify-between font-body text-sm mb-2">
              <span className="text-ink/60">Subtotal</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-body text-sm mb-4">
              <span className="text-ink/60">Shipping</span>
              <span className="font-mono text-ink/50">Calculated at checkout</span>
            </div>
            <div className="flex justify-between font-display text-lg border-t border-ink/10 pt-4 mb-6">
              <span>Total</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="block text-center font-mono text-xs uppercase tracking-wide bg-ink text-paper px-6 py-3 hover:bg-rust transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
