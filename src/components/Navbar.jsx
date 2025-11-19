import { Menu } from 'lucide-react'

function Navbar({ onNavigate }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <span className="font-semibold text-slate-800">Pickleball Analytics</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slate-600">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-900">Home</button>
          <button onClick={() => onNavigate('leaderboard')} className="hover:text-slate-900">Leaderboard</button>
          <button onClick={() => onNavigate('players')} className="hover:text-slate-900">Players</button>
          <button onClick={() => onNavigate('matches')} className="hover:text-slate-900">Matches</button>
        </nav>
        <button className="md:hidden p-2 text-slate-600"><Menu className="w-6 h-6" /></button>
      </div>
    </header>
  )
}

export default Navbar
