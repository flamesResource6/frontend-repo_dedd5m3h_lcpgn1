import { useEffect, useState } from 'react'

function Leaderboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/analytics/leaderboard`)
        if (!res.ok) throw new Error('Failed to load leaderboard')
        const data = await res.json()
        setRows(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="p-6">Loading leaderboard...</div>
  if (error) return <div className="p-6 text-red-600">{error}</div>

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full">
            <thead className="bg-slate-50 text-left text-slate-600 text-sm">
              <tr>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Points Won</th>
                <th className="py-3 px-4">Avg Rally</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-4">{r.name || r.player_id}</td>
                  <td className="py-3 px-4">{r.points_won}</td>
                  <td className="py-3 px-4">{r.avg_rally?.toFixed ? r.avg_rally.toFixed(1) : r.avg_rally}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Leaderboard
