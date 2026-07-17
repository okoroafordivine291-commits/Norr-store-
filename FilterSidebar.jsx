export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  maxPrice,
  priceLimit,
  onPriceChange,
  sortBy,
  onSortChange,
}) {
  return (
    <aside className="w-full md:w-56 shrink-0 space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">Category</p>
        <ul className="space-y-2 font-body text-sm">
          <li>
            <button
              onClick={() => onCategoryChange('all')}
              className={`hover:text-rust transition-colors ${selectedCategory === 'all' ? 'text-rust' : ''}`}
            >
              All
            </button>
          </li>
          {categories.map((c) => (
            <li key={c}>
              <button
                onClick={() => onCategoryChange(c)}
                className={`capitalize hover:text-rust transition-colors ${selectedCategory === c ? 'text-rust' : ''}`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">
          Max price: ${priceLimit}
        </p>
        <input
          type="range"
          min="0"
          max={maxPrice}
          value={priceLimit}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-rust"
        />
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">Sort by</p>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-ink/30 bg-paper text-sm font-body py-2 px-2"
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </aside>
  )
}
