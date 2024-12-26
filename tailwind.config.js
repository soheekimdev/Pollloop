/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transperent: 'transperent',
        current: 'currentColor',
        pollloop: {
          orange: '#FFA632',
          coral: '#FFC082',
          'brown-01': '#85582B',
          'brown-02': '#9B5A1A',
          'brown-03': '#693A0A',
          'bg-01': '#FFF2CD',
          'bg-02': '#FFE3B6',
          'light-beige': '#FFFBEB',
        },
        button: {
          'primary-bg': '#FFA632',
          'primary-text': '#FFFBEB',
          'secondary-bg': '#C28B55',
          'secondary-text': '#FFFBEB',
          'neutral-bg': '#EFD3A7',
          'neutral-text': '#85582B',
          'danger-bg': '#C63B00',
          'danger-text': '#FFFBEB',
          'ghost-bg-active': '#85582BD9',
        },
        status: {
          green: {
            bg: '#B5F0BC',
            text: '#45B552',
          },
          yellow: {
            bg: '#FFD470',
            text: '#9E7413',
          },
          red: {
            bg: '#FFBA9C',
            text: '#C63B00',
          },
        },
        tag: {
          'default-bg': '#EFD3A7',
          'default-text': '#85582B',
          'secondary-bg': '#F0E3CD',
          'secondary-text': '#A98764',
        },
      },
    },
  },
  plugins: [],
};
