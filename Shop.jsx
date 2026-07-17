import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, fetchCategories } from '/api.js'
import ProductCard from '/ProductCard.jsx'
import FilterSidebar from '/FilterSidebar.jsx'
import { ProductGridSkeleton } from '/Skeleton.jsx'

export default function Shop() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceLimit, setPriceLimit] = useState(1000)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([p, c]) => {
        setProducts(p)
        setCategories(c)
        const max = Math.ceil(Math.max(...p.map((i) => i.price)))
        setPriceLimit(max)
      })
      .catch(() => {
        setProducts([])
        setCategories([])
      })
      .finally(() => setLoading(false))
  }, [])

  const maxPrice = useMemo(
    () => (products.length ? Math.ceil(Math.max(...products.map((p) => p.price))) : 1000),
    [products]
  )

  const filtered = useMemo(() => {
    let result = [...products]

    if (query) {
      result = result.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    }
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }
    result = result.filter((p) => p.price <= priceLimit)

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))

    return result
  }, [products, query, selectedCategory, priceLimit, sortBy])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl mb-1">Shop</h1>
      <p className="font-mono text-xs text-ink/50 mb-10">
        {query ? `Results for "${query}"` : 'All products'} — {filtered.length} items
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          maxPrice={maxPrice}
          priceLimit={priceLimit}
          onPriceChange={setPriceLimit}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {loading ? (
          <ProductGridSkeleton />
        ) : filtered.length === 0 ? (
          <div className="flex-1 py-24 text-center">
            <p className="font-display text-xl mb-2">Nothing here yet.</p>
            <p className="font-body text-sm text-ink/60">Try a different search or clear your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 flex-1">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
