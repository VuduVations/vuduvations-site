import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white">
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI Strategy Consultant and Engineer
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-teal-200 max-w-3xl mx-auto">
            Multi-agent AI discovery system that identifies, prioritizes, and analyzes high-ROI opportunities for mid-market companies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/demo"
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              View Live Demos
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            6-Agent AI Analysis System
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-teal-500/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-teal-400">Discovery</h3>
              <p className="text-gray-300">
                Identifies 7-15 AI opportunities across your organization through multi-agent analysis
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-purple-500/20">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Financial Analysis</h3>
              <p className="text-gray-300">
                Complete ROI, NPV, and IRR calculations for each use case
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-cyan-500/20">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-400">Roadmap</h3>
              <p className="text-gray-300">
                Phased implementation strategy prioritized by complexity and risk
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 border-t border-gray-800">
        <p>© 2025 Vuduvations. AI Strategy and Engineering Services.</p>
      </footer>
    </div>
  )
}