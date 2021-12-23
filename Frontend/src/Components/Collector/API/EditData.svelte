<script>
  import Modal from './../../UI/Modal.svelte';
  import API from "./../../../Services/Api.js";

  import {
    push,
    pop,
    replace
  } from "svelte-spa-router";

  import {
    library
  } from "@fortawesome/fontawesome-svg-core";
  import {
    faTrash
  } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
  } from "fontawesome-svelte";
  library.add(faTrash);

  export let params = {};

  export let colums = ["test", "test", "test"];
  export let reading = [];
  export let row = [];

  export let dataId = "";

  $: {
    if (reading != null) {
      dataId = reading["_id"];
    }
    if (colums.includes("_id")) {
      let index = colums.indexOf("_id");
      deleteColumn(index);
    }
    if (colums.length == 0) {
      newColum()
    }
  }
  
  export function loadRow(stuff){
    reading = stuff
    row = [];
    for (let i = 0; i < colums.length; i++) {
      row[i] = reading[colums[i]];
    }
  }

  function newColum() {
    colums = [...colums, `new ${colums.length + 1}`];
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
    let object = {};
    for (let i = 0; i < colums.length; i++) {
      object[colums[i]] = row[i];
    }

    return object;
  }

  function deleteColumn(i) {
    colums = [...colums.slice(0, i), ...colums.slice(i + 1)];
    console.log(row);
    row = [...row.slice(0, i), ...row.slice(i + 1)];
  }

  function validateKeys() {
    for (let i = 0; i < colums.length; i++) {
      if (checkIfDupeName(i, colums)) {
        return false;
      }
    }
    return true;
  }


  async function update() {
    return new Promise((resolve, reject) => {
      try {
        if (validateKeys()) {
          let data = gatherInfo();
          console.log(data)

          API.put(
            `/data/collector/${params.collector}/trip/${params.trip}/id/${dataId}`,
            data
          );
          hide();
          reload();
        } else {
          reject()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  async function remove() {
    return new Promise((resolve, reject) => {
      try {
        API.delete(
          `/data/collector/${params.collector}/trip/${params.trip}/id/${dataId}`
        );
        modal.hide();
        reload();
      } catch (error) {
        reject(error)
      }
    })
  }


  let modal;
  
  export function show() {
    modal.show();
    // loadRow()
  }

  export function hide() {
    modal.hide();
  }
  export let reload = () => {};
</script>
<Modal bind:this={modal}>
  <span slot="title">Edit Data</span>
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
          </tr>
        </thead>

        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            {#each colums as colum, index}
              {#if colum != "_id"}
                <td class="whitespace-nowrap text-sm bg-gray-100 text-gray-600">
                  <input
                    class="p-0 bg-transparent outline-none border-none"
                    type="number"
                    bind:value={row[index]}
                  />
                </td>
              {/if}
            {/each}
          </tr>
        </tbody>
      </table>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-2 px-4 rounded" on:click={() => newColum()}>New Colum</button>
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