import { writable } from "svelte/store";

export const trip = writable({
    name: "",
    date: "",
    location: ""
})