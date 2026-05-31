import { Outlet } from 'react-router-dom'
import { appVersion, buildVersion } from '@/lib/version'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-foreground text-white">
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer className="fixed bottom-2 right-2 z-50 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-white/44 shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-md sm:bottom-3 sm:right-3">
        Kindlers in Japan v{appVersion} · build {buildVersion}
      </footer>
    </div>
  )
}

export default SiteLayout
