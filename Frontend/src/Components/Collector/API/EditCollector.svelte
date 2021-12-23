<script>
  import Modal from "./../../UI/Modal.svelte";
  import API from "./../../../Services/Api.js";

  export let collector = {};

  export let params = {};

  let model;

  export function show() {
    model.show();
  }

  export function hide() {
    model.hide();
  }

  async function update() {
    return new Promise((resolve, reject) => {
      try {
        API.put(`/collector/id/${params.collector}`, collector).then((res) => {
          model.hide();
          reload();
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async function remove() {
    return new Promise((resolve, reject) => {
      try {
        API.delete(`/collector/id/${params.collector}`);
        push(`/`);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  export let reload = () => {};
</script>

<Modal bind:this={model}>
  <span slot="title">Edit Collector {collector.name}</span>
  <span slot="content">
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-name"
        >
          Name
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          bind:value={collector.name}
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-name"
          type="text"
        />
      </div>
    </div>
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-owner"
        >
          Owner
        </label>
      </div>
      <div class="md:w-2/3">
        <input
          bind:value={collector.owner}
          class="w-full px-4 py-2 leading-tight text-gray-700 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
          id="inline-owner"
          type="text"
        />
      </div>
    </div>
    <div class="mb-6 md:flex md:items-center">
      <div class="md:w-1/3">
        <label
          class="block pr-4 mb-1 font-bold text-gray-500 md:text-right md:mb-0"
          for="inline-description"
        >
          Description
        </label>
      </div>
      <div class="md:w-2/3">
        <textarea
          bind:value={collector.description}
          class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
    <div class="md:flex md:items-center">
      <div class="md:w-1/3" />
      <div class="md:w-2/3" />
    </div>
  </span>
  <span slot="button">
    <button
      type="button"
      on:click={() => remove()}
      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Delete
    </button>
    <button
      type="button"
      on:click={() => update()}
      class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
      Edit
    </button>
  </span>
</Modal>
