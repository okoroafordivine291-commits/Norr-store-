export default function Toast({ message, show }) {
  if (!show) return null
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-ink text-paper font-mono text-xs px-4 py-3 z-50 animate-[fadeIn_0.2s_ease]">
      {message}
    </div>
  )
}
