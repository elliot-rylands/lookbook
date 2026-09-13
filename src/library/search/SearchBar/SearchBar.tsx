export default function SearchBar() {
  return (
    <div className="w-full bg-white px-4 py-6">
      <label className="mx-auto block max-w-md">
        <span className="text-sm text-[#525252]">Search</span>
        <input
          type="search"
          defaultValue=""
          placeholder="Find a page"
          className="mt-1 w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
        />
      </label>
    </div>
  )
}
