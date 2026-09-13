import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { SiteFooter } from '@/components/lookbook/SiteFooter'
import { SiteHeader } from '@/components/lookbook/SiteHeader'
import { ComponentPage } from '@/pages/ComponentPage'
import { Home } from '@/pages/Home'
import { NotFound } from '@/pages/NotFound'
import { OpeningStoryFull } from '@/pages/OpeningStoryFull'
import { TailwindComponentPage } from '@/pages/TailwindComponentPage'
import { TailwindHome } from '@/pages/TailwindHome'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

function LookbookChrome() {
  return (
    <div className="lb-shell">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={basename || undefined}>
      <Routes>
        <Route path="/full/opening-story" element={<OpeningStoryFull />} />
        <Route path="/components/opening-story/full" element={<OpeningStoryFull />} />
        <Route element={<LookbookChrome />}>
          <Route path="/" element={<Home />} />
          <Route path="/components/:slug" element={<ComponentPage />} />
          <Route path="/tailwind" element={<TailwindHome />} />
          <Route path="/tailwind/components/:slug" element={<TailwindComponentPage />} />
          <Route path="/index.html" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
