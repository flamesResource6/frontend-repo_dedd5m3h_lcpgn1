import { useEffect, useMemo, useState } from 'react'

function QuickEntry({ onCreated }) {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [players, setPlayers] = useState([])
  const [form, setForm] = useState({ name: '', rating: '', handedness: 'right' })
  const [match, setMatch] = useState({ player_a_id: '', player_b_id: '', location: '', level: '' })
  const [point, setPoint] = useState({ match_id: '', scorer_id: '', rally_length: 6, winner_shot: 'drive', unforced_error: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canCreateMatch = useMemo(() => match.player_a_id && match.player_b_id && match.player_a_id !== match.player_b_id, [match])
  const canCreatePoint = useMemo(() => point.match_id && point.scorer_id && point.rally_length > 0, [point])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${base}/api/players`)
        if (res.ok) setPlayers(await res.json())
      } catch (e) {}
    }
    load()
  }, [base])

  const createPlayer = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${base}/api/players`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, rating: form.rating ? parseFloat(form.rating) : null }) })
      if (!res.ok) throw new Error('Failed to create player')
      setForm({ name: '', rating: '', handedness: 'right' })
      const updated = await (await fetch(`${base}/api/players`)).json()
      setPlayers(updated)
      onCreated?.()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const createMatch = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${base}/api/matches`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(match) })
      if (!res.ok) throw new Error('Failed to create match')
      const { id } = await res.json()
      setPoint(p => ({ ...p, match_id: id }))
      onCreated?.()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const createPoint = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = { ...point, rally_length: Number(point.rally_length) }
      const res = await fetch(`${base}/api/points`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) throw new Error('Failed to create point')
      setPoint(p => ({ ...p, rally_length: 6 }))
      onCreated?.()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Add Player</h3>
          <form onSubmit={createPlayer} className="space-y-3">
            <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input className="w-full border rounded px-3 py-2" placeholder="Rating (e.g. 3.5)" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} />
            <select className="w-full border rounded px-3 py-2" value={form.handedness} onChange={e => setForm({ ...form, handedness: e.target.value })}>
              <option value="right">Right-handed</option>
              <option value="left">Left-handed</option>
            </select>
            <button disabled={loading} className="w-full bg-emerald-600 text-white rounded px-3 py-2 hover:bg-emerald-700">Add Player</button>
          </form>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Create Match</h3>
          <div className="space-y-3">
            <select className="w-full border rounded px-3 py-2" value={match.player_a_id} onChange={e => setMatch({ ...match, player_a_id: e.target.value })}>
              <option value="">Player A</option>
              {players.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
            <select className="w-full border rounded px-3 py-2" value={match.player_b_id} onChange={e => setMatch({ ...match, player_b_id: e.target.value })}>
              <option value="">Player B</option>
              {players.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
            <input className="w-full border rounded px-3 py-2" placeholder="Location" value={match.location} onChange={e => setMatch({ ...match, location: e.target.value })} />
            <input className="w-full border rounded px-3 py-2" placeholder="Level (e.g. 3.5)" value={match.level} onChange={e => setMatch({ ...match, level: e.target.value })} />
            <button disabled={!canCreateMatch || loading} onClick={createMatch} className="w-full bg-sky-600 text-white rounded px-3 py-2 hover:bg-sky-700 disabled:opacity-50">Create Match</button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Log Point</h3>
          <div className="space-y-3">
            <input className="w-full border rounded px-3 py-2" placeholder="Match ID" value={point.match_id} onChange={e => setPoint({ ...point, match_id: e.target.value })} />
            <select className="w-full border rounded px-3 py-2" value={point.scorer_id} onChange={e => setPoint({ ...point, scorer_id: e.target.value })}>
              <option value="">Scorer</option>
              {players.map(p => (<option key={p.id} value={p.id}>{p.name}</option>))}
            </select>
            <input type="number" className="w-full border rounded px-3 py-2" placeholder="Rally length" value={point.rally_length} onChange={e => setPoint({ ...point, rally_length: e.target.value })} />
            <select className="w-full border rounded px-3 py-2" value={point.winner_shot} onChange={e => setPoint({ ...point, winner_shot: e.target.value })}>
              {['serve','return','drive','drop','dink','lob','volley','smash','other'].map(s => (<option key={s} value={s}>{s}</option>))}
            </select>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={point.unforced_error} onChange={e => setPoint({ ...point, unforced_error: e.target.checked })} /> Unforced error</label>
            <button disabled={!canCreatePoint || loading} onClick={createPoint} className="w-full bg-amber-600 text-white rounded px-3 py-2 hover:bg-amber-700 disabled:opacity-50">Log Point</button>
          </div>
        </div>

        {error && <div className="md:col-span-3 text-red-600">{error}</div>}
      </div>
    </section>
  )
}

export default QuickEntry
