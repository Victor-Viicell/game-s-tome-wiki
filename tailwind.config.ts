import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        '-gd-selected-blue': '#70BAFAff',
        '-gd-purple': '#8DA5F3ff',
        '-gd-violet': '#C38EF1ff',
        '-gd-red': '#FB7F7Fff',
        '-gd-yellow': '#F6D764ff',
        '-gd-green': '#8EEF97ff',
        '-gd-prop-blue': '#88B6DDff',
        '-gd-logo-blue': '#478CBFff',
        '-gd-white': '#E0E0E0ff',
        '-gd-container': '#363D4Aff',
        '-gd-container-nav': '#252B34ff',
        '-gd-container-selected': '#202832ff',
        '-gd-header-1': '#40444Cff',
        '-gd-header-2': '#282D35ff',
        '-gd-content': '#21262Eff',
        '-gd-prop': '#1D2229ff',
        '-gd-prop-type': '#15181Eff',
        '-gd-unchecked-toggle': '#45484Eff',
        '-gd-collapsable': '#4C535Eff',
      },
      fontFamily: {},
    },
  },
  plugins: [],
} satisfies Config;
