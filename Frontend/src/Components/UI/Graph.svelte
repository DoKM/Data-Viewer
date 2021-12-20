<script>
  import { library } from "@fortawesome/fontawesome-svg-core";
  import {
    faBackward,
    faFastBackward,
    faFastForward,
    faForward,
  } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
  } from "fontawesome-svelte";

  library.add(faBackward, faFastBackward, faForward, faFastForward);

  import LineGraph from "./Graphs/LineGraph.svelte";
  export let data = [];



  export let labels = [];

  export let graphData = {}

  export let indexes = 10

  
  function fastBackward(){
    graph.currentPos = 0;
  }

  function backward(){
    if(graph.currentPos <= 0 || (data == undefined && data[0] == undefined)){
      graph.currentPos =0
    } else if(graph.currentPos > data[0].length-indexes){
      graph.currentPos = data[0].length-indexes
    } else {
      graph.currentPos--;
    }
  }

  function forward(){
    if(datastuff != undefined && data[0] != undefined){

      if(graph.currentPos >= data[0].length-indexes){
        graph.currentPos = data[0].length-indexes
      } else {
        graph.currentPos++;
      }
    }
  }

  function fastForward(){
    if(datastuff != undefined && data[0] != undefined){
      graph.currentPos = data[0].length-indexes
    }
  }

  export let graph
  export let inputData = {
    labels: {
      labelArray = []
    }
  }

</script>

<div>
  <LineGraph bind:this={graph} inputData={inputData}></LineGraph>
  <div class="content-center">
    <button on:click={()=>{fastBackward()}}><FontAwesomeIcon icon={faFastBackward} /></button>
    <button on:click={()=>{backward()}}><FontAwesomeIcon icon={faBackward} /></button>
    <button on:click={()=>{forward()}}><FontAwesomeIcon icon={faForward} /></button>
    <button on:click={()=>{fastForward()}}><FontAwesomeIcon icon={faFastForward} /></button>
  </div>
</div>
