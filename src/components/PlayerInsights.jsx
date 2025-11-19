import { useEffect, useState } from 'react'

function PlayerInsights() {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [players, setPlayers] = useState([])
  const [selected, setSelected] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const res = await fetch(`${base}/api/players`)
        if (res.ok) setPlayers(await res.json())
      } catch (e) {}
    }
    loadPlayers()
  }, [base])

  const loadAnalytics = async (id) => {
    setLoading(true)
    try {
      const res = await fetch(`${base}/api/analytics/player/${id}`)
      if (!res.ok) throw new Error('Failed to load analytics')
      setData(await res.json())
    } catch (e) {
      setData({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Player Insights</h2>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-4">
            <select value={selected} onChange={e => { setSelected(e.target.value); if (e.target.value) loadAnalytics(e.target.value) }} className="border rounded px-3 py-2">
              <option value="">Select a player</option>
              {players.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
            {loading && <span className="text-slate-500">Loading...</span>}
          </div>

          {data && !data.error && (
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 rounded border border-emerald-200">
                <p className="text-sm text-emerald-900">Points Won</p>
                <p className="text-3xl font-bold text-emerald-700">{data.totals.points_won}</p>
              </div>
              <div className="p-4 bg-rose-50 rounded border border-rose-200">
                <p className="text-sm text-rose-900">Points Lost</p>
                <p className="text-3xl font-bold text-rose-700">{data.totals.points_lost}</p>
              </div>
              <div className="p-4 bg-sky-50 rounded border border-sky-200">
                <p className="text-sm text-sky-900">Avg Rally</p>
                <p className="text-3xl font-bold text-sky-700">{data.totals.avg_rally ? data.totals.avg_rally.toFixed(1) : '-'}</p>
              </div>
              <div className="md:col-span-3">
                <h4 className="font-semibold mt-4 mb-2">Winning Shot Distribution</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(data.shot_distribution).length === 0 && <span className="text-slate-500">No data yet</span>}
                  {Object.entries(data.shot_distribution).map(([shot, count]) => (
                    <span key={shot} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 border text-sm">
                      <span className="font-medium">{shot}</span>
                      <span className="text-slate-500">{count}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {data && data.error && <div className="text-red-600">{data.error}</div>}
        </div>
      </div>
    </section>
  )
}

export default PlayerInsights
