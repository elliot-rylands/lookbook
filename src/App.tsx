import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteFooter } from '@/components/lookbook/SiteFooter'
import { SiteHeader } from '@/components/lookbook/SiteHeader'
import { ComponentPage } from '@/pages/ComponentPage'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { TailwindComponentPage } from '@/pages/TailwindComponentPage'
import { TailwindHome } from '@/pages/TailwindHome'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <div className="lb-shell">
        <SiteHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/components/:slug" element={<ComponentPage />} />
          <Route path="/tailwind" element={<TailwindHome />} />
          <Route path="/tailwind/components/:slug" element={<TailwindComponentPage />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SiteFooter />
      </div>
    </BrowserRouter>
  )
}
