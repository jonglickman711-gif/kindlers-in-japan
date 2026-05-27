import { Outlet } from 'react-router-dom'

function SiteLayout() {
  return (
    <div className="min-h-screen bg-foreground text-white">
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default SiteLayout
