type CloisterGateProps = {
  mode?: 'enter' | 'request'
}

export default function CloisterGate({ mode = 'enter' }: CloisterGateProps) {
  const enter = mode === 'enter'

  return (
    <section className="flex min-h-[480px] w-full items-center justify-center bg-[#f7f1e6] px-6 py-16 text-[#1b1812] dark:bg-[#16140f] dark:text-[#efe6d4]">
      <form
        className="w-full max-w-[360px] text-center"
        onSubmit={(event) => event.preventDefault()}
      >
        <p className="text-[10px] tracking-[0.32em] uppercase opacity-55">The archive</p>
        <h2
          className="mt-3 text-[44px] leading-none"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Cloister
        </h2>
        <p className="mx-auto mt-4 max-w-[240px] text-[13px] leading-relaxed opacity-65">
          {enter
            ? 'Members enter with a key. The rooms stay quiet.'
            : 'Write a short note. We reply only when there is a desk.'}
        </p>
        <div className="mx-auto mt-8 h-px w-12 bg-current/30" />

        <label className="mt-8 block text-left">
          <span className="text-[10px] tracking-[0.18em] uppercase opacity-55">
            {enter ? 'Key' : 'Petition'}
          </span>
          {enter ? (
            <input
              type="password"
              defaultValue=""
              placeholder="········"
              className="mt-2 w-full border-0 border-b border-current/25 bg-transparent py-2 text-center text-[16px] outline-none"
            />
          ) : (
            <textarea
              rows={3}
              defaultValue=""
              placeholder="A sentence is enough."
              className="mt-2 w-full resize-none border-0 border-b border-current/25 bg-transparent py-2 text-[14px] outline-none"
            />
          )}
        </label>

        <button
          type="submit"
          className="mt-8 text-[12px] tracking-[0.2em] uppercase underline decoration-current/30 underline-offset-6"
        >
          {enter ? 'Enter' : 'Send'}
        </button>
      </form>
    </section>
  )
}
