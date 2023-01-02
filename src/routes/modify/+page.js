import { dev } from '$app/environment';
import items from '../../lib/json/generated_items.json';
import quests from '../../lib/json/generated_quests.json';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export function load() {
		return {
			title: 'Hello world!',
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
			items,
			quests
		};

	
}