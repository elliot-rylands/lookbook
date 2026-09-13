const rows = [
  { name: 'Item A', status: 'Open', owner: 'Sam' },
  { name: 'Item B', status: 'Done', owner: 'Riley' },
  { name: 'Item C', status: 'Open', owner: 'Jordan' },
]

export default function DataTable() {
  return (
    <div className="w-full overflow-x-auto bg-white p-4 text-[#111]">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[#e5e5e5] text-[#737373]">
            <th className="px-3 py-2 font-medium">Name</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium">Owner</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-[#e5e5e5]">
              <td className="px-3 py-2">{row.name}</td>
              <td className="px-3 py-2 text-[#525252]">{row.status}</td>
              <td className="px-3 py-2 text-[#525252]">{row.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
