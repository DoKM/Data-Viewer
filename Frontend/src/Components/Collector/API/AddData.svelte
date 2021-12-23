<script>
  import Modal from './../../UI/Modal.svelte';
  import API from "./../../../Services/Api.js";

  import {
    library
  } from "@fortawesome/fontawesome-svg-core";
  import {
    faTrash,
  } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
  } from "fontawesome-svelte";
  library.add(
    faTrash
  );

  import {
    push,
    pop,
    replace
  } from "svelte-spa-router";

  export let params = {};

  export let colums = ["test", "test", "test"];
  export let rows = [
    []
  ];

  $: {
    if (colums.includes("_id")) {
      let index = colums.indexOf("_id");
      deleteColumn(index);
    }
    if (colums.length == 0) {
      newColum()
    }
  }

  function newColum() {
    colums = [...colums, `new ${colums.length + 1}`];
  }

  function newRow() {
    rows = [...rows, []];
  }

  function checkIfDupeName(index, array) {
    if (array[index] == "") {
      return true;
    }
    for (let i = 0; i < array.length; i++) {
      if (i != index && array[i] === array[index]) {
        return true;
      }
    }
    return false;
  }

  function gatherInfo() {
    let data = [];
    rows.forEach((row) => {
      let object = {};
      for (let i = 0; i < colums.length; i++) {
        object[colums[i]] = row[i];
      }
      data.push(object);
    });
    return data;
  }

  function deleteColumn(i) {
    colums = [...colums.slice(0, i), ...colums.slice(i + 1)];
    for (let index = 0; index < rows.length; index++) {
      rows[index] = [...rows[index].slice(0, i), ...rows[index].slice(i + 1)];
    }
  }

  function deleteRow(index) {
    rows = [...rows.slice(0, index), ...rows.slice(index + 1)];
  }

  function validateKeys() {
    for (let i = 0; i < colums.length; i++) {
      if (checkIfDupeName(i, colums)) {
        return false;
      }
    }
    return true;
  }

  async function post() {
    return new Promise((resolve, reject) => {
        try {
          if (validateKeys()) {
            let data = gatherInfo();
            console.log(data);
            API.post(`/data/collector/${params.collector}/trip/${params.trip}`, data);
            reload();
            hide();
          } else {
            reject()
          }
        }catch(error){
          reject(error)
        }
    })
  }

  let modal;

  export function show() {
    modal.show();
  }

  export function hide() {
    modal.hide();
  }
  export let reload = () => {};
</script>

<Modal bind:this={modal}>
  <span slot="title">Create new Data</span>
  <span slot="content">
    <div class="overflow-x-auto overflow-y-auto">
      <table class="table-auto border-collapse w-full">
        <thead class="bg-gray-50">
          <tr>
            {#each colums as colum, index}
              {#if colum != "_id"}
                <th
                  scope="col"
                  class="text-xs font-medium text-red-500 uppercase tracking-wider text-center"
                >
                  <button on:click={() => deleteColumn(index)}><FontAwesomeIcon icon={faTrash}/></button>
                </th>
              {/if}
            {/each}
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>

        <tr>
          {#each colums as colum, index}
            {#if colum != "_id"}
              <th
                scope="col"
                class="text-left text-xs font-medium rounded  {checkIfDupeName(
                  index,
                  colums
                )
                  ? 'border-2 bg-red-300 border-rose-500 text-red-500'
                  : 'text-gray-500'} uppercase tracking-wider"
              >
                <input
                  class="p-0 bg-transparent outline-none border-none"
                  bind:value={colums[index]}
                  type="text"
                />
              </th>
            {/if}
          {/each}
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        {#each rows as row, index}
          <tr>
            {#each colums as colum, index2}
              {#if colum != "_id"}
                <td class="whitespace-nowrap text-sm bg-gray-100 text-gray-600">
                  <input
                    class="p-0 bg-transparent outline-none border-none"
                    type="text"
                    bind:value={rows[index][index2]}
                  />
                </td>
              {/if}
            {/each}
            <td
              class="px-6 whitespace-nowrap bg-gray-200 text-right text-red-500 text-sm font-medium"
            >
              <button on:click={() => deleteRow(index)}><FontAwesomeIcon icon={faTrash}/></button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded" on:click={() => newColum()}>New Colum</button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded" on:click={() => newRow()}>New Row </button>
  </div>
  </span>
  <span slot="button">
    <button
    type="button"
    on:click={() => post()}
    class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
    >
    Create
  </button>
</span>
</Modal>