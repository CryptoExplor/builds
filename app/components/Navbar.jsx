import { Boxes } from 'lucide-react'

export default function Navbar({ toolCount }) {
  return (
    <header className="border-b border-white/10 bg-[#111827]/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Boxes size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">Builds</h1>
            <p className="text-xs opacity-60">by CryptoExplor</p>
          </div>
        </a>
        
        <div className="flex items-center gap-4">
          {toolCount && (
            <span className="text-sm opacity-60">{toolCount} projects</span>
          )}
          <a
            href="https://github.com/CryptoExplor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm opacity-60 hover:opacity-100 transition"
          >
            GitHub →
          </a>
        </div>
      </div>
    </header>
  )
}