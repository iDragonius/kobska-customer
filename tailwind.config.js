/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,

      padding: {
        DEFAULT: '22px',
        sm: '25px',
        lg: '30px',
        xl: '65px',
        '2xl': '90px',
        '3xl': '120px'
      }
    },
    fontSize: {
      sm: '12px',
      base: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      '2xl': '28px',
      '3xl': '44px',
      link: '15px'
    },
    extend: {
      textColor: {
        whiteText: '#F9F9F9',
        whiteSubText: '#F1F1F1',
        mainText: '#4D4D4D',
        linkText: '#D2D2D2',
        secondaryText: '#8C8C8C',
        mainOrange: '#F05236',
        tagText: '#454161',
        placeholderText: '#9CA3AF',
        dateText: '#A0A0A0',
        newsText: '#27749C',
        navigationText: '#131313',
        navigationHover: '#65348D'
      },
      backgroundColor: {
        iconBg: '#E8E8E8',
        loadingBg: '#27749C',
        mainOrange: '#F05236',
        hoverColor: '#27749C'
      },
      borderColor: {
        borderGray: '#E8E8E8',
        hoverColor: '#27749C',
        leftBorder: '#3D7398',
        blockBorder: '#orF4F4F4'
      },
      stroke: {
        hoverColor: '#27749C'
      },
      screens: {
        xl: '1360px',
        mb: '900px',
        '3xl': '1920px'
      }
    },
    fontFamily: {
      sans: ['var(--font-poppins)']
    }
  },
  plugins: []
}
