import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "AI-annotation",
	description:
		"AI-annotation: collaborative HTML Annotation for Human-AI Interaction Bridge the gap between humans and AI through intuitive annotations directly on your web interface.",
	head: [
		["link", { rel: "icon", href: "/logo.svg", type: "image/svg+xml" }],
		["meta", { name: "theme-color", content: "#646cff" }],
		["meta", { name: "og:type", content: "website" }],
		["meta", { name: "og:title", content: "ai-annotation" }],
		["meta", { name: "og:image", content: "/logo.svg" }],
		[
			"meta",
			{
				name: "og:description",
				content:
					"Teach AI Your Documentation Standards, Not the Other Way Around",
			},
		],
	],
	lastUpdated: true,
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		// logo: '/logo.svg',
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Guide", link: "/concept" },
			{ text: "MCP", link: "/mcp" },
			{ text: "Pricing", link: "/price" },
			{
				text: "Resources",
				items: [
					{ text: "Concept", link: "/concept" },
					{ text: "Guide", link: "/guide" },
					{ text: "MCP Reference", link: "/mcp" },
				],
			},
		],

		sidebar: [
			{
				text: "Introduction",
				items: [{ text: "Concept", link: "/concept" }],
			},
			{
				text: "Guide",
				items: [
					{ text: "Getting Started", link: "/guide" },
					{ text: "Usecase1", link: "/usecase" },
					{ text: "Usecase2", link: "/usecase2" },
					{ text: "MCP", link: "/mcp" },
				],
			},
			{
				text: "Advanced",
				items: [
					{ text: "Generate Annotation", link: "/advanced-annotation-generation" },
					{ text: "Generate Schema", link: "/advanced-schema" },
					{ text: "Workflow", link: "/advanced-workflow" },
				],
			},
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/ToyB0x/ai-annotation" },
			{ icon: "twitter", link: "https://twitter.com" },
			{ icon: "discord", link: "https://discord.com" },
		],

		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2025 ai-annotation Contributors",
		},

		search: {
			provider: "local",
		},

		outline: {
			level: "deep",
			label: "On this page",
		},

		carbonAds: {
			code: "your-carbon-code",
			placement: "your-carbon-placement",
		},
	},
});
