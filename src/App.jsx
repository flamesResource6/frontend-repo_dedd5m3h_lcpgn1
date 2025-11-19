import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Leaderboard from './components/Leaderboard'
import QuickEntry from './components/QuickEntry'
import PlayerInsights from './components/PlayerInsights'

function App() {
  const [route, setRoute] = useState('home')
  const onNavigate = (r) => setRoute(r)
  const section = useMemo(() => {
    switch (route) {
      case 'leaderboard':
        return <Leaderboard />
      case 'players':
        return <PlayerInsights />
      case 'matches':
        return <QuickEntry onCreated={() => {}} />
      default:
        return <>
          <Hero onGetStarted={() => setRoute('matches')} />
          <Leaderboard />
          <PlayerInsights />
          <QuickEntry onCreated={() => {}} />
        </>
    }
  }, [route])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNavigate={onNavigate} />
      <main className="pt-16">
        {section}
      </main>
      <footer className="py-10 text-center text-slate-500">Built with Flames • Pickleball Analytics</footer>
    </div>
  )
}

export default App
