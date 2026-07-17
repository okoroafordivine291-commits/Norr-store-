import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { count } = useCart()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop')
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <Link to="/" className="font-display text-2xl tracking-tight shrink-0">
          Norr
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-sm items-center border-b border-ink/30 focus-within:border-ink"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search objects…"
            className="w-full bg-transparent py-2 text-sm font-body outline-none placeholder:text-ink/40"
          />
        </form>

        <nav className="hidden md:flex items-center gap-6 font-body text-sm">
          <Link to="/shop" className="hover:text-rust transition-colors">Shop</Link>
          <Link to="/cart" className="relative hover:text-rust transition-colors">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-rust text-paper text-[10px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </nav>

        <button
          className="md:hidden text-sm font-mono"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-ink/10 px-6 py-4 flex flex-col gap-4 font-body text-sm">
          <form onSubmit={handleSearch} className="flex border-b border-ink/30">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search objects…"
              className="w-full bg-transparent py-2 outline-none placeholder:text-ink/40"
            />
          </form>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart ({count})</Link>
        </div>
      )}
    </header>
  )
}
