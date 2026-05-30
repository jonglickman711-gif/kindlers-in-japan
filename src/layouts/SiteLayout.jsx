import { Outlet } from 'react-router-dom'
import { appVersion, buildVersion } from '@/lib/version'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-foreground text-white">
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer className="border-t border-white/10 bg-[#080a0f] px-4 py-4 text-center text-[0.68rem] uppercase tracking-[0.18em] text-white/34">
        Kindlers in Japan v{appVersion} · build {buildVersion}
      </footer>
    </div>
  )
}

export default SiteLayout
