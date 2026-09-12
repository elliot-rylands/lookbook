export function useRouter() {
  return {
    push() {},
    replace() {},
    back() {},
    prefetch() {},
  }
}

export function usePathname() {
  return '/'
}

export function useSearchParams() {
  return new URLSearchParams()
}
