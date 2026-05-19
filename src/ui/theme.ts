export const colors = {
  cream: "#fbf6ea",
  surface: "#fffdf6",
  surfaceStrong: "#edf3df",
  forest: "#06351f",
  forestAction: "#0b6a3d",
  forestSoft: "#2f6048",
  muted: "#66736f",
  border: "#ded6c4",
  blue: "#064d90",
  white: "#ffffff",
} as const;

export const spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  general: {
    fontSize: 11,
    lineHeight: 16,
  },
  tiny: {
    fontSize: 12,
    lineHeight: 16,
  },
  nav: {
    fontSize: 13,
  },
  body: {
    fontSize: 13,
    lineHeight: 18,
  },
  bodyLarge: {
    fontSize: 14,
    lineHeight: 20,
  },
  buttonPrimary: {
    fontSize: 13,
  },
  buttonSecondary: {
    fontSize: 13,
  },
  cardTitle: {
    fontSize: 15,
  },
  screenTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  heroTitle: {
    fontSize: 20,
    lineHeight: 26,
  },
  scenarioTitle: {
    fontSize: 20,
  },
  lessonWord: {
    fontSize: 20,
  },
  quizWord: {
    fontSize: 20,
  },
  quizLetter: {
    fontSize: 20,
  },
  sentence: {
    fontSize: 16,
    lineHeight: 22,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: colors.forest,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  button: {
    shadowColor: colors.forestAction,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  premium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 6,
  }
} as const;
