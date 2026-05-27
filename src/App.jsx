import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import HomePage from '@/pages/HomePage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
