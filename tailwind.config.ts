import scrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import { fontFamily } from 'tailwindcss/defaultTheme';

import { convertRemToEm } from './src/libs/tailwind/plugins';

const opacity0_99 = {
  ...Array.from(Array(100)).map((_, i) => `.${i.toString().padStart(2, '0')}`),
} as {
  [key: number]: string;
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      opacity: {
        ...opacity0_99,
        '5.5': '.055',
      },
      fontFamily: {
        sans: ['var(--notion-font)', ...fontFamily.sans],
        mono: ['var(--code-font)', ...fontFamily.mono],
      },
      colors: {
        primary: colors.orange,
        brown: {
          50: 'rgb(253,248,246)',
          100: 'rgb(242,232,229)',
          200: 'rgb(234,221,215)',
          300: 'rgb(224,206,199)',
          400: 'rgb(210,186,176)',
          500: 'rgb(191,160,148)',
          600: 'rgb(161,128,114)',
          700: 'rgb(151,118,105)',
          800: 'rgb(132,99,88)',
          900: 'rgb(67,48,43)',
        },
      },
      backgroundColor: {
        day: colors.white,
        night: 'rgb(24,24,27)',
        red: { light: 'rgb(253,235,236)', dark: 'rgb(82,46,42)' },
        pink: { light: 'rgb(249,238,243)', dark: 'rgb(78,44,60)' },
        blue: { light: 'rgb(231,243,248)', dark: 'rgb(20,58,78)' },
        purple: { light: 'rgb(244,240,247)', dark: 'rgb(60,45,73)' },
        green: { light: 'rgb(237,243,236)', dark: 'rgb(36,61,48)' },
        yellow: { light: 'rgb(251,243,219)', dark: 'rgb(86,67,40)' },
        orange: { light: 'rgb(251,236,221)', dark: 'rgb(92,59,35)' },
        brown: { light: 'rgb(244,238,238)', dark: 'rgb(74,50,40)' },
        gray: { light: 'rgb(241,241,239)', dark: 'rgb(47,47,47)' },
        code: {
          light: 'rgb(247,246,243)',
          dark: 'rgba(255,255,255,0.03)',
          inline: {
            light: 'rgba(127,122,107,0.1)',
            dark: 'rgba(69,75,78,0.5)',
          },
        },
        button: {
          light: 'rgb(234,233,229)',
          dark: 'rgb(37,37,37)',
        },
        accent: {
          light: 'rgba(55,53,47)',
          dark: 'rgba(255,255,255)',
        },
        sun: 'rgb(255,215,0)',
        moon: 'rgb(221,221,221)',
      },
      textColor: {
        red: { light: 'rgb(224,62,62)', dark: 'rgb(223,84,82)' },
        pink: { light: 'rgb(193,76,138)', dark: 'rgb(209,87,150)' },
        blue: { light: 'rgb(51,126,169)', dark: 'rgb(94,135,201)' },
        purple: { light: 'rgb(144,101,176)', dark: 'rgb(157,104,211)' },
        green: { light: 'rgb(68,131,97)', dark: 'rgb(82,158,114)' },
        yellow: { light: 'rgb(223,171,1)', dark: 'rgb(202,152,73)' },
        orange: { light: 'rgb(217,115,13)', dark: 'rgb(199,125,72)' },
        brown: { light: 'rgb(159,107,83)', dark: 'rgb(186,133,111)' },
        gray: { light: 'rgb(120,119,116)', dark: 'rgb(155,155,155)' },
        code: {
          inline: 'rgb(255,64,129)',
          light: 'rgb(31,41,55)',
          dark: 'rgb(229,231,235)',
        },
      },
      boxShadow: {
        light:
          'inset 0 -1px 2px rgb(152,116,22), 0 1px 2px rgba(128,128,128,0.47), 0 0 0 6px rgba(255,255,255,0.13), 0 0 0 12px rgba(255,255,255,0.13), 6px 0 0 12px rgba(255,255,255,0.13)',
        dark: 'inset 0 -1px 2px rgb(128,128,128), 0 1px 2px #555555, 0 0 0 6px #ffffff22, 0 0 0 12px #ffffff22, -6px 0 0 12px #ffffff22',
        inset: 'inset 0 0 3px',
        cloud:
          '0 -5px 2px 4px white, -8px 1px 2px 6px white, -30px 5px 2px 5px white, -19.5px 10px 2px 8px white',
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(rgb(135,206,235), rgb(95,158,160))',
        'gradient-dark': 'linear-gradient(-45deg, rgb(34,34,34), rgb(0,0,48))',
      },
    },
  },
  plugins: [
    convertRemToEm,
    scrollbar({ preferredStrategy: 'pseudoelements', nocompatible: true }),
  ],
};

export default config;
