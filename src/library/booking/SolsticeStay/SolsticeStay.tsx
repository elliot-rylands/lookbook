type SolsticeStayProps = {
  mode?: 'room' | 'treatment'
}

export default function SolsticeStay({ mode = 'room' }: SolsticeStayProps) {
  const room = mode === 'room'

  return (
    <section className="w-full bg-[#e7ddd0] text-[#2c2a22]">
      <div className="h-28 w-full bg-[#8a8f6e]" />
      <div className="px-6 py-7 sm:px-8">
        <p className="text-[10px] tracking-[0.22em] uppercase text-[#5b5346]">Kiso Valley</p>
        <h2
          className="mt-1 text-[32px] leading-none"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Solstice
        </h2>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-[#5b5346]">
          {room
            ? 'One room facing the cedar. Bath before dinner. Breakfast in the corridor light.'
            : 'A two-hour sequence: mineral bath, rest, then tea in the north room.'}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-px bg-[#c8beaf]">
          <div className="bg-[#e7ddd0] py-3 pr-4">
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#5b5346]">Arrive</p>
            <p className="mt-1 text-[18px]">18 Sep</p>
          </div>
          <div className="bg-[#e7ddd0] py-3 pl-4">
            <p className="text-[10px] tracking-[0.16em] uppercase text-[#5b5346]">
              {room ? 'Depart' : 'Hour'}
            </p>
            <p className="mt-1 text-[18px]">{room ? '21 Sep' : '16:00'}</p>
          </div>
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-[#c8beaf] pt-4 text-[14px]">
          <span>{room ? 'Cedar room · 2 guests' : 'Private bath · 1 guest'}</span>
          <span className="text-[#5b5346]">{room ? '3 nights' : '120 min'}</span>
        </div>

        <button
          type="button"
          className="mt-6 w-full border border-[#2c2a22] py-3 text-[12px] tracking-[0.18em] uppercase"
        >
          Enquire
        </button>
      </div>
    </section>
  )
}
