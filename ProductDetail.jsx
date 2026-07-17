import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct } from '/api.js'
import { useCart } from '/CartContext.jsx'
import Toast from '/Toast.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchProduct(id)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [id])

  function handleAdd() {
    addItem(product, qty)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  if (loading) {
    return <div className="max-w-6xl mx-auto px-6 py-24 text-center font-mono text-sm text-ink/50">Loading…</div>
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="font-display text-xl mb-4">Product not found.</p>
        <Link to="/shop" className="font-mono text-xs uppercase underline">Back to shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link to="/shop" className="font-mono text-xs uppercase tracking-wide text-ink/50 hover:text-rust">
        ← Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-8">
        <div className="bg-sand aspect-square flex items-center justify-center">
          <img src={product.image} alt={product.title} className="max-h-[80%] object-contain mix-blend-multiply" />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-rust mb-3">{product.category}</p>
          <h1 className="font-display text-3xl mb-4">{product.title}</h1>
          <span className="price-tag font-mono text-sm px-3 py-1 ml-2 inline-block mb-6">
            ${product.price.toFixed(2)}
          </span>
          <p className="font-body text-sm text-ink/70 leading-relaxed mb-8">{product.description}</p>

          {product.rating && (
            <p className="font-mono text-xs text-ink/50 mb-8">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-ink/30">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 font-mono hover:bg-ink hover:text-paper transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center font-mono text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 font-mono hover:bg-ink hover:text-paper transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 font-mono text-xs uppercase tracking-wide bg-ink text-paper px-6 py-3 hover:bg-rust transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <Toast message="Added to cart" show={showToast} />
    </div>
  )
}
