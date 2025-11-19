function Hero({ onGetStarted }) {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-sky-50" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Track rallies. Uncover trends. Win more games.
            </h1>
            <p className="mt-5 text-lg text-slate-700">
              A lightweight analytics hub for pickleball. Log points, analyze rally length, shot distribution, and see who’s topping the leaderboard.
            </p>
            <div className="mt-8 flex gap-3">
              <button onClick={onGetStarted} className="px-5 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition">
                Get started
              </button>
              <a href="/test" className="px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-white/60 transition">
                Check backend
              </a>
            </div>
          </div>
          <div className="bg-white/70 border border-emerald-200 rounded-xl p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-900">Average rally length</p>
                  <p className="text-3xl font-bold text-emerald-700">7.2</p>
                </div>
              </div>
              <div className="col-span-1 p-4 bg-sky-50 border border-sky-200 rounded-lg">
                <p className="text-sm text-sky-900">Points Logged</p>
                <p className="text-2xl font-bold text-sky-700">124</p>
              </div>
              <div className="col-span-1 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-900">Matches</p>
                <p className="text-2xl font-bold text-amber-700">18</p>
              </div>
              <div className="col-span-1 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                <p className="text-sm text-violet-900">Top Player</p>
                <p className="text-2xl font-bold text-violet-700">Alex</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
