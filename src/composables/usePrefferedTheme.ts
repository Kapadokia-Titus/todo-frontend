import { Theme } from "@/types/Theme";

export const usePrefferedTheme = (): Theme => {
  const storedTheme = localStorage.getItem('theme') as Theme;
  const hasDarkPreference = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  if (storedTheme) return storedTheme;

  return hasDarkPreference ? 'dark' : 'light'
}