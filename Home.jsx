import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'
import { ProductGridSkeleton } from '../components/Skeleton.jsx'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((data) => setFeatured(data.slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-rust mb-4">No. 001 — Autumn Catalogue</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
            Objects for a quieter kind of living.
          </h1>
          <p className="font-body text-ink/70 max-w-sm mb-8">
            Norr sources honest materials and durable forms — pieces meant to be used daily, not admired from a shelf.
          </p>
          <Link
            to="/shop"
            className="inline-block font-mono text-xs uppercase tracking-wide border border-ink px-6 py-3 hover:bg-ink hover:text-paper transition-colors"
          >
            Browse the shop
          </Link>
        </div>
        <div className="bg-sand aspect-[4/5] flex items-center justify-center">
          <span className="font-display italic text-2xl text-ink/30">Norr</span>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-2xl">Featured</h2>
          <Link to="/shop" className="font-mono text-xs uppercase tracking-wide hover:text-rust transition-colors">
            View all →
          </Link>
        </div>
        {loading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
