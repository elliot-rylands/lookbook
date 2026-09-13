export default function HeroBanner() {
  return (
    <section className="w-full bg-white px-6 py-16 text-[#111] sm:px-10">
      <p className="text-sm text-[#737373]">Product</p>
      <h1 className="mt-3 max-w-lg text-3xl font-medium leading-tight">A short headline for the page.</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#525252]">
        Supporting sentence. Keep it to one or two lines.
      </p>
      <div className="mt-6 flex gap-3">
        <span className="border border-[#111] bg-[#111] px-3 py-1.5 text-sm text-white">Get started</span>
        <span className="border border-[#e5e5e5] px-3 py-1.5 text-sm">Learn more</span>
      </div>
    </section>
  )
}
