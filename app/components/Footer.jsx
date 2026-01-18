export default function Footer() {
  return (
    <footer className="mt-20 pt-10 border-t border-white/10 text-center text-sm">
      {/* Tip Address */}
      <div className="mb-4">
        <span className="opacity-60">tip: </span>
        <code className="px-2 py-1 bg-white/5 rounded text-xs opacity-80 font-mono">
          0x4f6Fb0A6c8A4C667bdF73C0257BE162B144c1624
        </code>
      </div>

      {/* Made By */}
      <p className="opacity-80 mb-3">
        Made with 🔥 by <span className="font-semibold">CryptoExplor</span>
      </p>
      
      <p className="opacity-60 mb-6 text-xs">Trust through transparency</p>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <a
          href="https://farcaster.xyz/dare1.eth"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 opacity-60 hover:opacity-100 transition"
          aria-label="Farcaster Profile"
        >
          <img 
            src="/farcaster.png" 
            alt="Farcaster" 
            className="w-5 h-5"
          />
          <span>Farcaster</span>
        </a>
        
        <a
          href="https://github.com/CryptoExplor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 opacity-60 hover:opacity-100 transition"
          aria-label="GitHub Profile"
        >
          <img 
            src="/github.png" 
            alt="GitHub" 
            className="w-5 h-5"
          />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  )
}
