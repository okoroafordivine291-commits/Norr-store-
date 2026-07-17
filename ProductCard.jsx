import { Link } from 'react-router-dom'
import { useCart } from '/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col">
      <Link to={`/product/${product.id}`} className="block bg-sand aspect-square overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain p-8 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-body text-sm leading-snug line-clamp-2 hover:text-rust transition-colors">
          {product.title}
        </h3>
      </Link>
      <div className="flex items-center justify-between mt-3">
        <span className="price-tag font-mono text-xs px-3 py-1 ml-2">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={() => addItem(product)}
          className="text-xs font-mono uppercase tracking-wide border border-ink px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  )
}
