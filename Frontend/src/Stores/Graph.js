import { writable } from 'svelte/store';

export const graph = writable({
    name: "New Graph",
    type: "line",
    graphs: [{}],
    label: {
        auto: true,
        defaultLength: 10,
        name: undefined
    }
})