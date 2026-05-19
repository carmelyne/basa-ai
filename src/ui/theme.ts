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
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radii = {
  md: 12,
  lg: 16,
  xl: 20,
} as const;

export const typography = {
  general: {
    fontSize: 12,
    lineHeight: 18,
  },
  tiny: {
    fontSize: 13,
    lineHeight: 18,
  },
  nav: {
    fontSize: 15,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 23,
  },
  buttonPrimary: {
    fontSize: 15,
  },
  buttonSecondary: {
    fontSize: 15,
  },
  cardTitle: {
    fontSize: 17,
  },
  screenTitle: {
    fontSize: 22,
    lineHeight: 29,
  },
  heroTitle: {
    fontSize: 24,
    lineHeight: 31,
  },
  scenarioTitle: {
    fontSize: 24,
  },
  lessonWord: {
    fontSize: 24,
  },
  quizWord: {
    fontSize: 24,
  },
  quizLetter: {
    fontSize: 24,
  },
  sentence: {
    fontSize: 18,
    lineHeight: 25,
  },
} as const;

export const shadows = {
  card: {
    shadowColor: "#123326",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
