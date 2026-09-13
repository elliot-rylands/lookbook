type BasicFormProps = {
  error?: boolean
}

export default function BasicForm({ error = false }: BasicFormProps) {
  return (
    <form className="w-full max-w-sm bg-white p-6 text-[#111]" onSubmit={(event) => event.preventDefault()}>
      <h2 className="text-base font-medium">Contact</h2>
      <label className="mt-4 block">
        <span className="text-sm text-[#525252]">Name</span>
        <input
          className="mt-1 w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
          defaultValue="Alex Rivera"
        />
      </label>
      <label className="mt-3 block">
        <span className="text-sm text-[#525252]">Email</span>
        <input
          className="mt-1 w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
          defaultValue={error ? 'not-an-email' : 'alex@example.com'}
        />
        {error && <span className="mt-1 block text-xs text-[#b42318]">Enter a valid email.</span>}
      </label>
      <button type="submit" className="mt-4 border border-[#111] bg-[#111] px-3 py-1.5 text-sm text-white">
        Send
      </button>
    </form>
  )
}
