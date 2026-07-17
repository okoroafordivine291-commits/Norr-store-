export default function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-xl mb-2">Norr</p>
          <p className="text-sm text-ink/60 font-body">Everyday objects, considered.</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">Shop</p>
          <ul className="space-y-2 text-sm font-body text-ink/70">
            <li>All products</li>
            <li>New arrivals</li>
            <li>Best sellers</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">Help</p>
          <ul className="space-y-2 text-sm font-body text-ink/70">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">Studio</p>
          <ul className="space-y-2 text-sm font-body text-ink/70">
            <li>About</li>
            <li>Journal</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink/10 py-4 text-center text-xs font-mono text-ink/40">
        © {new Date().getFullYear()} Norr. Demo store, front-end only.
      </div>
    </footer>
  )
}
