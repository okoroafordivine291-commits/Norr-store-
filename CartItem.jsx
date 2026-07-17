import { useCart } from '../context/CartContext.jsx'

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-6 border-b border-ink/10">
      <div className="w-20 h-20 bg-sand shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2 mix-blend-multiply" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-body text-sm line-clamp-2">{item.title}</p>
        <p className="font-mono text-xs text-ink/50 mt-1">${item.price.toFixed(2)} each</p>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center border border-ink/30">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="w-7 h-7 font-mono hover:bg-ink hover:text-paper transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center font-mono text-sm">{item.qty}</span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="w-7 h-7 font-mono hover:bg-ink hover:text-paper transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-xs font-mono uppercase tracking-wide text-ink/50 hover:text-rust transition-colors"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="font-mono text-sm shrink-0">${(item.price * item.qty).toFixed(2)}</p>
    </div>
  )
}
