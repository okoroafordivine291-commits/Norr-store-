import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '',
    card: '', expiry: '', cvc: '',
  })

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Front-end only demo — no real payment is processed.
    clearCart()
    navigate('/order-confirmation')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-xl">Your cart is empty.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl mb-10">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          <section>
            <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-4">Contact</p>
            <div className="space-y-3">
              <Input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            </div>
          </section>

          <section>
            <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-4">Shipping address</p>
            <div className="space-y-3">
              <Input name="address" placeholder="Street address" value={form.address} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-3">
                <Input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                <Input name="zip" placeholder="ZIP code" value={form.zip} onChange={handleChange} required />
              </div>
            </div>
          </section>

          <section>
            <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-4">Payment (demo — no real charge)</p>
            <div className="space-y-3">
              <Input name="card" placeholder="Card number" value={form.card} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-3">
                <Input name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} required />
                <Input name="cvc" placeholder="CVC" value={form.cvc} onChange={handleChange} required />
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-1">
          <div className="border border-ink/20 p-6 sticky top-24">
            <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-4">Order summary</p>
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm font-body mb-2">
                <span className="truncate pr-2">{i.title} × {i.qty}</span>
                <span className="font-mono shrink-0">${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-display text-lg border-t border-ink/10 pt-4 mt-4 mb-6">
              <span>Total</span>
              <span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full font-mono text-xs uppercase tracking-wide bg-ink text-paper px-6 py-3 hover:bg-rust transition-colors"
            >
              Place order
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full border border-ink/30 bg-transparent px-3 py-2 text-sm font-body outline-none focus:border-ink"
    />
  )
}
