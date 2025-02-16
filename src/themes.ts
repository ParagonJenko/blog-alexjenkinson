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
export type ThemeName = 'fallout' | 'astrology' | 'tarkov' | 'dos';

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
	astrology: {
		primary: '#c4afec',
		secondary: '#2180c7',
		text: '#fffcfc',
		accent: '#fbab75',
		border: '#1a3dea',
		background: '#0a1428',
		font: '"Quicksand", sans-serif',
		headerFont: '"Cinzel", serif',
		backgroundImage: 'url("/astrology-bg.jpg")',
		overlayColor: 'rgba(26, 61, 234, 0.1)',
		specialAccent: '#fbab75',
		textShadow: '0 0 12px rgba(196, 175, 236, 0.8)',
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
		primary: '#000080',
		secondary: '#000057',
		text: '#C0C0C0',
		accent: '#FFFFFF',
		border: '#808080',
		background: '#000080',
		font: '"IBM Plex Mono", "Courier New", monospace',
		headerFont: '"IBM Plex Mono", "Courier New", monospace',
		backgroundImage: 'url("/dos-bg.jpg")',
		overlayColor: 'rgba(0, 0, 128, 0.3)',
		specialAccent: '#FFFF00',
		textShadow: '0 0 2px rgba(192, 192, 192, 0.8)',
	},
};

// Helper functions
export const getTheme = (name: ThemeName): Theme => themes[name];
export const getAllThemeNames = (): ThemeName[] =>
	Object.keys(themes) as ThemeName[];
export const getDefaultTheme = (): Theme => themes.fallout;

// Export individual themes for backward compatibility
export const falloutTheme = themes.fallout;
export const astrologyTheme = themes.astrology;
export const tarkovTheme = themes.tarkov;
export const dosTheme = themes.dos;
