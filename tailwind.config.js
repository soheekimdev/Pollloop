/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      body: '#85582B',
      transparent: 'transparent',
      current: 'currentColor',
      pollloop: {
        orange: '#FFA632',
        coral: '#FFC082',
        'brown-01': '#85582B',
        'brown-02': '#9B5A1A',
        'brown-03': '#693A0A',
        'bg-01': '#FFF2CD',
        'bg-02': '#FFE3B6',
        'bg-03': '#EAD8BB',
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
      input: {
        bg: '#FFFBEB',
        border: 'rgba(133, 88, 43, 0.3)',
        tip: 'rgba(133, 88, 43, 0.8)',
        placeholder: 'rgba(130, 110, 89, 0.47)',
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
    fontFamily: {
      gothic: ['Gothic A1', 'sans-serif'],
      iowan: ['Iowan Old Style', 'Georgia', 'Times New Roman', 'serif'],
    },
    extend: {
      fontSize: {
        13: '0.8125rem',
        15: '0.9375rem',
        22: '1.375rem',
      },
      boxShadow: {
        primary: '0px 0px 5px 1px #FF8D1A',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({
      noCompatibility: true,
      preferredStrategy: 'pseudoelements',
    }),
  ],
};
