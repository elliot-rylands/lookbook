type RoundsBoardProps = {
  shift?: 'night' | 'day'
}

const beds = [
  { id: 'B12', name: 'Hale, M.', note: 'Post-op · 04:10', status: 'stable' },
  { id: 'B14', name: 'Okoye, A.', note: 'New admit', status: 'new' },
  { id: 'B15', name: 'Reed, S.', note: 'Review fluids', status: 'review' },
  { id: 'B18', name: 'Park, J.', note: 'Sleeping', status: 'stable' },
]

const statusLabel = {
  stable: 'Stable',
  review: 'Review',
  new: 'New',
}

export default function RoundsBoard({ shift = 'night' }: RoundsBoardProps) {
  const night = shift === 'night'

  return (
    <section
      className={
        night
          ? 'w-full bg-[#1c221c] px-5 py-6 text-[#e4e7d8] dark:bg-[#141814]'
          : 'w-full bg-[#eef0e6] px-5 py-6 text-[#243024]'
      }
    >
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase opacity-60">Harbor Clinic</p>
          <h2
            className="mt-1 text-[26px] leading-none"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Night rounds — Ward B
          </h2>
        </div>
        <p className="text-[12px] tabular-nums opacity-60">{night ? '02:14' : '09:40'} · 6 open</p>
      </div>

      <ol className="mt-6 divide-y divide-current/10 border-t border-current/20">
        {beds.map((bed) => (
          <li key={bed.id} className="grid grid-cols-[48px_1fr_auto] items-baseline gap-3 py-3">
            <span className="text-[12px] tabular-nums opacity-60">{bed.id}</span>
            <div>
              <p className="text-[15px]">{bed.name}</p>
              <p className="mt-0.5 text-[12px] opacity-55">{bed.note}</p>
            </div>
            <span className="text-[11px] tracking-[0.12em] uppercase opacity-70">
              {statusLabel[bed.status as keyof typeof statusLabel]}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
