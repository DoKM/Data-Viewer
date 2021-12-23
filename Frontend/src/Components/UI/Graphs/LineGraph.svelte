<script>
  import { library } from "@fortawesome/fontawesome-svg-core";
  import {
    faBackward,
    faFastBackward,
    faFastForward,
    faForward,
    faMinus,
    faPlus,
    faCog
  } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
  } from "fontawesome-svelte";
  library.add(
    faBackward,
    faFastBackward,
    faForward,
    faFastForward,
    faPlus,
    faMinus,
    faCog
  );


  import Line from "svelte-chartjs/src/Line.svelte";
  export let inputData = {
    labels: {
      labelArray: [],
    },
    data: [],
  };

  export let data = {};
  export let labels = [];

  export let id;

  export let index = 0;
  export let width = 10;
  {
    console.log(inputData);
    if (inputData?.labels?.defaultLength != undefined) {
      width = inputData?.labels?.defaultLength;
    }
  }

  $: {
    if (inputData.data != undefined) {
      if (
        (inputData.data[0] != undefined &&
          inputData.data[0].data != undefined &&
          inputData.labels.labelArray.length < inputData.data[0].data.length) ||
        inputData.labels.labelArray.length == 0
      ) {
        let array = [];
        for (let i = 0; i < width; i++) {
          array.push(i + index + 1);
        }

        labels = array;
      } else {
        let array = [];
        for (let i = 0; i < width; i++) {
          array.push(
            inputData.labels.labelArray[i + index]
              ? inputData.labels.labelArray[i + index]
              : i + index
          );
        }
        labels = array;
      }
    }
  }

  $: {
    let datasets = [];

    if (inputData.data != undefined) {
      inputData.data.forEach((input) => {
        let shiftedData = [];
        if (input.data != undefined) {
          shiftedData = input.data.slice(index, index + width);
        }
        let dataset = {
          label: input.name,
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: shiftedData,
        };
        datasets = arrayPush(dataset, datasets);
      });
    }

    data = {
      labels: labels,
      datasets: datasets,
    };
  }

  function arrayPush(newData, oldArray) {
    return [...oldArray, newData];
  }

  function fastBackward() {
    index = 0;
  }

  function backward() {
    index--;
  }

  function forward() {
    index++;
  }

  function fastForward() {
    if (inputData?.data[0]?.data != undefined) {
      index = inputData?.data[0]?.data.length - width;
    }
  }

  $: {
    if (width < 1) {
      width = 1;
    } else if (
      inputData?.data[0]?.data?.length != undefined &&
      width > inputData?.data[0]?.data?.length
    ) {
      width = inputData?.data[0]?.data?.length;
    }
  }

  $: {
    if (index < 0) {
      index = 0;
    } else if (
      inputData?.data[0]?.data?.length != undefined &&
      index > inputData?.data[0]?.data?.length - width
    ) {
      index = inputData?.data[0]?.data?.length - width;
    }
  }

  export let edit = () => {}

</script>
{#if id != undefined}
  <span class="absolute right-0 top-0 pr-3 pt-3"><button on:click={()=>edit(id)}><FontAwesomeIcon icon={faCog} /></button></span>
{/if}
<div class="text-center font-bold">{inputData.name}</div>

<Line {data} />
<div class="content-center text-center">
  <button
    on:click={() => {
      fastBackward();
    }}><FontAwesomeIcon icon={faFastBackward} /></button
  >
  <button
    on:click={() => {
      backward();
    }}><FontAwesomeIcon icon={faBackward} /></button
  >
  <button
    on:click={() => {
      width--;
    }}><FontAwesomeIcon icon={faMinus} /></button
  >
  <span>{width}</span>
  <button
    on:click={() => {
      width++;
    }}><FontAwesomeIcon icon={faPlus} /></button
  >
  <button
    on:click={() => {
      forward();
    }}><FontAwesomeIcon icon={faForward} /></button
  >
  <button
    on:click={() => {
      fastForward();
    }}><FontAwesomeIcon icon={faFastForward} /></button
  >
  <!-- <input bind:value={width} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" type="number" /> -->
  <div>
    <span>Width:</span>
    <input
      type="range"
      class="
      form-range
      appearance-none
      w-full
      p-0
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none
      rounded-lg overflow-hidden bg-gray-400 h-1/2
      "
      min="1"
      max={inputData?.data[0]?.data?.length}
      step="1"
      bind:value={width}
    />
  </div>
  <div>
    <span>Index:</span>
    <input
      type="range"
      class="
      form-range
      appearance-none
      w-full
      p-0
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none
      rounded-lg overflow-hidden bg-gray-400 h-1/2
    "
      min="1"
      max={inputData?.data[0]?.data?.length - width}
      step="1"
      bind:value={index}
    />
  </div>
</div>
