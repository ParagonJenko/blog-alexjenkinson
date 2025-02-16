export interface Theme {
	primary: string;
	secondary: string;
	text: string;
	accent: string;
	border: string;
	background: string;
	font: string;
	headerFont: string;
	backgroundImage?: string;
	overlayColor?: string;
	specialAccent?: string;
	textShadow?: string;
}

// Define available theme names
export type ThemeName = 'fallout' | 'tarkov' | 'dos';

// Theme configurations
const themes: Record<ThemeName, Theme> = {
	fallout: {
		primary: '#390c06',
		secondary: '#1a130d',
		text: '#ffb784',
		accent: '#d13026',
		border: '#4f2b1b',
		background: '#1a130d',
		font: '"Share Tech Mono", monospace',
		headerFont: '"VT323", monospace',
		backgroundImage: 'url("/fallout-bg.jpeg")',
		overlayColor: 'rgba(57, 12, 6, 0.3)',
		specialAccent: '#ffd700',
		textShadow: '0 0 8px rgba(255, 183, 132, 0.6)',
	},
	tarkov: {
		primary: '#2a2a2a',
		secondary: '#1c1c1c',
		text: '#c7c7c7',
		accent: '#bf9b30',
		border: '#454545',
		background: '#0f0f0f',
		font: '"Roboto Condensed", sans-serif',
		headerFont: '"Russo One", sans-serif',
		backgroundImage: 'url("/tarkov-bg.jpeg")',
		overlayColor: 'rgba(191, 155, 48, 0.05)',
		specialAccent: '#d4af37',
	},
	dos: {
		primary: '#001100', // Dark green background
		secondary: '#001100', // Dark green for secondary
		text: '#33ff33', // Bright phosphor green
		accent: '#33ff33', // Same bright green for accents
		border: '#33ff33', // Green borders
		background: '#001100', // Dark green background
		font: '"Perfect DOS VGA 437", "IBM Plex Mono", Consolas, monospace',
		headerFont: '"Perfect DOS VGA 437", "IBM Plex Mono", Consolas, monospace',
		backgroundImage: 'url("/dos-bg.jpg")',
		overlayColor: 'rgba(0, 17, 0, 0.97)',
		specialAccent: '#11ff11', // Slightly different green for highlights
		textShadow: '0 0 2px rgba(51, 255, 51, 0.4)', // Subtle green glow
	},
};

// Helper functions
export const getTheme = (name: ThemeName): Theme => themes[name];
export const getAllThemeNames = (): ThemeName[] =>
	Object.keys(themes) as ThemeName[];
export const getDefaultTheme = (): Theme => themes.fallout;

// Export individual themes for backward compatibility
export const falloutTheme = themes.fallout;
export const tarkovTheme = themes.tarkov;
export const dosTheme = themes.dos;
