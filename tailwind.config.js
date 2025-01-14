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
      scrim: '#252525A3',
      pollloop: {
        red: 'FF0000',
        orange: '#FFA632',
        coral: '#FFC082',
        'brown-01': '#85582B',
        'brown-02': '#9B5A1A',
        'brown-03': '#693A0A',
        'bg-01': '#FFF2CD',
        'bg-02': '#FFE3B6',
        'bg-03': '#EAD8BB',
        'light-beige': '#FFFBEB',
        'purple-01': '#928fd7',
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
        'ghost-bg-active': '#85582B26',
        'disabled-bg': '#C28B5540',
        'disabled-text': '#85582B66',
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
      width: {
        cardWidth: '400px',
      },
      keyframes: {
        dotBounce: {
          '0%': {
            transform: 'translateX(0) translateY(0.625rem) scaleX(1)',
          },
          '10%': {
            transform: 'translateX(0.75rem) translateY(0.125rem) scaleX(1.03)',
          },
          '20%': {
            transform: 'translateX(1.5rem) translateY(-0.275rem) scaleX(1.05)',
          },
          '30%': {
            transform: 'translateX(2.25rem) translateY(-0.575rem) scaleX(1.07)',
          },
          '40%': {
            transform: 'translateX(3rem) translateY(-0.775rem) scaleX(1.08)',
          },
          '50%': {
            transform: 'translateX(3.75rem) translateY(-0.875rem) scaleX(1.08)',
          },
          '60%': {
            transform: 'translateX(4.5rem) translateY(-0.775rem) scaleX(1.08)',
          },
          '70%': {
            transform: 'translateX(5.25rem) translateY(-0.575rem) scaleX(1.07)',
          },
          '80%': {
            transform: 'translateX(6rem) translateY(-0.275rem) scaleX(1.05)',
          },
          '90%': {
            transform: 'translateX(6.75rem) translateY(0.125rem) scaleX(1.03)',
          },
          '100%': {
            transform: 'translateX(7.5rem) translateY(0.825rem) scaleX(1)',
          },
        },
        dotBounceSm: {
          '0%': {
            transform: 'translateX(0) translateY(0.425rem) scaleX(1)',
          },
          '10%': {
            transform: 'translateX(0.5rem) translateY(0.125rem) scaleX(1.03)',
          },
          '20%': {
            transform: 'translateX(1rem) translateY(-0.175rem) scaleX(1.05)',
          },
          '30%': {
            transform: 'translateX(1.5rem) translateY(-0.375rem) scaleX(1.07)',
          },
          '40%': {
            transform: 'translateX(2rem) translateY(-0.475rem) scaleX(1.08)',
          },
          '50%': {
            transform: 'translateX(2.5rem) translateY(-0.575rem) scaleX(1.08)',
          },
          '60%': {
            transform: 'translateX(3rem) translateY(-0.475rem) scaleX(1.08)',
          },
          '70%': {
            transform: 'translateX(3.5rem) translateY(-0.375rem) scaleX(1.07)',
          },
          '80%': {
            transform: 'translateX(4rem) translateY(-0.175rem) scaleX(1.05)',
          },
          '90%': {
            transform: 'translateX(4.5rem) translateY(0.125rem) scaleX(1.03)',
          },
          '100%': {
            transform: 'translateX(5rem) translateY(0.425rem) scaleX(1)',
          },
        },
      },
      animation: {
        'dot-bounce': 'dotBounce 0.8s linear infinite alternate',
        'dot-bounce-sm': 'dotBounceSm 0.8s linear infinite alternate',
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
