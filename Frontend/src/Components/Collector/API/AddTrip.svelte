<script>

    import Modal from "./../../UI/Modal.svelte";
    import API from "./../../../Services/Api.js";

    import {
        trip
    } from "./../../../Stores/Trip.js";

    export let params = {}

    let model;

    export function show() {
        model.show();
    }

    export function hide() {
        model.hide();
    }

    async function createTrip() {

        return new Promise((resolve, reject) => {
            try {
                API.post(`/trips/collector/${params.collector}`, $trip).then((res) => {
                    reload();
                    hide();
                    resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    export let reload = () => {};
</script>

<Modal bind:this={model}>
    <span slot="title">Create new Trip</span>
    <span slot="content">
        <div class="mb-6 md:flex md:items-center">
            <div class="md:w-1/3">
                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-name">
                    Name
                </label>
            </div>
            <div class="md:w-2/3">
                <input bind:value={$trip.name}
                    class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-name" type="text" placeholder="Trip #" />
            </div>
        </div>
        <div class="mb-6 md:flex md:items-center">
            <div class="md:w-1/3">
                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-date">
                    Date
                </label>
            </div>
            <div class="md:w-2/3">
                <input bind:value={$trip.date}
                    class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-date" type="datetime-local" />
            </div>
        </div>
        <div class="mb-6 md:flex md:items-center">
            <div class="md:w-1/3">
                <label class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0" for="inline-location">
                    Location
                </label>
            </div>
            <div class="md:w-2/3">
                <input bind:value={$trip.location}
                    class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-location" type="text" placeholder="Location" />
            </div>
        </div>

        <div class="md:flex md:items-center">
            <div class="md:w-1/3" />
            <div class="md:w-2/3" />
        </div>
    </span>
    <span slot="button">
        <button type="button" on:click={()=> createTrip()}
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border
            border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
            Create
        </button>
    </span>
</Modal>