export default function SignIn() {
  return (
    <form
      className="mx-auto w-full max-w-xs border border-[#e5e5e5] bg-white p-6 text-[#111]"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 className="text-base font-medium">Sign in</h2>
      <label className="mt-4 block">
        <span className="text-sm text-[#525252]">Email</span>
        <input
          type="email"
          className="mt-1 w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
          defaultValue="you@example.com"
        />
      </label>
      <label className="mt-3 block">
        <span className="text-sm text-[#525252]">Password</span>
        <input
          type="password"
          className="mt-1 w-full border border-[#e5e5e5] px-3 py-2 text-sm outline-none"
          defaultValue="password"
        />
      </label>
      <button type="submit" className="mt-4 w-full border border-[#111] bg-[#111] px-3 py-1.5 text-sm text-white">
        Continue
      </button>
    </form>
  )
}
