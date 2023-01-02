import { writable } from 'svelte/store';

export let step = writable(0);
export const saves = writable(["", "", "", ""]);