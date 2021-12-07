import { writable } from 'svelte/store';

export const collector = writable({
  name: "",
  owner: "",
  description: ""
})