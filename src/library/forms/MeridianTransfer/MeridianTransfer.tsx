export default function MeridianTransfer() {
  return (
    <form
      className="mx-auto w-full max-w-[440px] bg-[#102033] px-6 py-8 text-[#e8e2d4] sm:px-8"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="text-[10px] tracking-[0.24em] uppercase text-[#b7a882]">Meridian Private</p>
      <h2
        className="mt-2 text-[28px] leading-tight"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        Send internationally
      </h2>
      <p className="mt-2 text-[13px] text-[#b7c0c8]">From Sterling Reserve · ··4291</p>

      <label className="mt-8 block">
        <span className="text-[10px] tracking-[0.16em] uppercase text-[#b7a882]">Beneficiary</span>
        <input
          defaultValue="Atelier Solstice Lda."
          className="mt-2 w-full border-0 border-b border-[#3a5168] bg-transparent py-2 text-[15px] text-[#e8e2d4] outline-none"
        />
      </label>

      <div className="mt-6 grid grid-cols-[1fr_88px] gap-4">
        <label className="block">
          <span className="text-[10px] tracking-[0.16em] uppercase text-[#b7a882]">Amount</span>
          <input
            defaultValue="12,400.00"
            className="mt-2 w-full border-0 border-b border-[#3a5168] bg-transparent py-2 text-[22px] tracking-tight text-[#e8e2d4] outline-none"
          />
        </label>
        <label className="block">
          <span className="text-[10px] tracking-[0.16em] uppercase text-[#b7a882]">Ccy</span>
          <div className="mt-2 border-b border-[#3a5168] py-2 text-[15px]">GBP</div>
        </label>
      </div>

      <label className="mt-6 block">
        <span className="text-[10px] tracking-[0.16em] uppercase text-[#b7a882]">Reference</span>
        <input
          defaultValue="SS26 deposit — Look 07"
          className="mt-2 w-full border-0 border-b border-[#3a5168] bg-transparent py-2 text-[15px] text-[#e8e2d4] outline-none"
        />
      </label>

      <div className="mt-8 flex items-center justify-between text-[12px] text-[#b7c0c8]">
        <span>Arrives Tue, 16 Sep</span>
        <span>Fee 18.00</span>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-[#e8e2d4] py-3 text-[12px] tracking-[0.18em] uppercase text-[#102033]"
      >
        Review transfer
      </button>
    </form>
  )
}
