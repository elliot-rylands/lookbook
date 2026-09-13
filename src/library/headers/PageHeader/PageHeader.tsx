export default function PageHeader() {
  return (
    <div className="w-full bg-white px-6 py-8 text-[#111]">
      <p className="text-sm text-[#737373]">Settings</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-medium">Account</h1>
          <p className="mt-1 text-sm text-[#525252]">Name, email, and notification preferences.</p>
        </div>
        <span className="border border-[#e5e5e5] px-3 py-1.5 text-sm">Edit</span>
      </div>
    </div>
  )
}
