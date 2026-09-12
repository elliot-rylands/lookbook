import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteFooter } from '@/components/lookbook/SiteFooter'
import { SiteHeader } from '@/components/lookbook/SiteHeader'
import { ComponentPage } from '@/pages/ComponentPage'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <div className="lb-shell">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/:slug" element={<ComponentPage />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}
