module.exports = {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			comandanteN: {
  				'1': '#59393F',
  				'2': '#400330',
  				'3': '#40043C',
  				'4': '#260324',
  				'5': '#0D0626'
  			},
  			lightTheme: {
  				background: '#f9f9f9',
  				card: '#ffffff',
  				text: '#333333',
  				subtitle: '#555555',
  				shadow: 'rgba(0, 0, 0, 0.05)'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				light: '#6870C5',
  				dark: '#0B0215',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			danger: {
  				DEFAULT: '#EF4444',
  				light: '#F87171',
  				dark: '#B91C1C'
  			},
  			tokyoNight: {
  				bg: '#1a1b26',
  				primary: '#7aa2f7',
  				secondary: '#bb9af7',
  				accent: '#f7768e',
  				text: '#c0caf5',
  				inputBg: '#414868',
  				buttonPrimary: '#7aa2f7',
  				buttonSecondary: '#3b4261'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			poppins: ["Poppins", "sans-serif"],
  			onest: ["Onest", "sans-serif"]
  		},
  		keyframes: {
  			flicker: {
  				'0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
  					opacity: '0.99',
  					filter: 'brightness(0.95)'
  				},
  				'20%, 24%, 55%': {
  					opacity: '0.4',
  					filter: 'brightness(1)'
  				}
  			},
  			spin: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			flicker: 'flicker 3s infinite',
  			spin: 'spin 1s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
