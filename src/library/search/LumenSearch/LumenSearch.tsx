type LumenSearchProps = {
  populated?: boolean
}

const results = [
  { id: '01', title: 'Casa das Janelas', meta: 'Dwelling · Porto · 1968' },
  { id: '02', title: 'Hall of Measures', meta: 'Civic · Basel · 1954' },
  { id: '03', title: 'North Light Rooms', meta: 'Studio · Oslo · 1979' },
]

export default function LumenSearch({ populated = true }: LumenSearchProps) {
  return (
    <section className="w-full bg-[#f2f1ec] px-6 py-10 text-[#111] sm:px-10">
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#6a6a6a]">Lumen Library</p>
      <h2
        className="mt-2 text-[36px] leading-none tracking-tight sm:text-[44px]"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        Search the catalogue
      </h2>
      <input
        defaultValue={populated ? 'north light' : ''}
        placeholder="Building, city, year"
        className="mt-8 w-full border-0 border-b border-[#111] bg-transparent py-3 text-[20px] outline-none placeholder:text-[#9a9a9a]"
      />
      <div className="mt-4 flex flex-wrap gap-2 text-[11px] tracking-[0.12em] uppercase">
        {['Typology', 'Decade', 'City'].map((chip) => (
          <span key={chip} className="border border-[#111] px-2 py-1">
            {chip}
          </span>
        ))}
      </div>
      {populated && (
        <ol className="mt-8 divide-y divide-[#d6d4cc] border-t border-[#111]">
          {results.map((result) => (
            <li key={result.id} className="grid grid-cols-[40px_1fr] items-baseline py-4">
              <span className="text-[12px] text-[#6a6a6a]">{result.id}</span>
              <div>
                <p className="text-[18px]">{result.title}</p>
                <p className="mt-1 text-[12px] tracking-[0.06em] uppercase text-[#6a6a6a]">
                  {result.meta}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
