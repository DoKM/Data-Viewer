<script>
  



  import LineGraph from "./Graphs/LineGraph.svelte";
  export let data = [];

  export let readings = {};

  export let id;

 

  export let graphData = {
    name: "test",
    type: "line",
    graphs: [
      {
        displayName: "Test",
        name: "x",
      },
      {
        name: "y",
      },
      {
        displayName: "kaas",
        name: "z",
        colour: "z"
      }
    ],
    label: {
      auto: false,
      name: "z",
      defaultLength: 3
    }
  };

  let graph;
  export let inputData = {};

  $: {
    let graphsData = []
    let labels = [];
    if(graphData.label != undefined && graphData.label.auto != undefined && graphData.label.auto == false && graphData.label.name != undefined && readings[graphData.label.name] != undefined){
      labels = readings[graphData.label.name]
      console.log(labels)
    }


    graphData.graphs.forEach(graph => {
      let newGraph = {
        name: graph.displayName?graph.displayName:graph.name,
        data: readings[graph.name]
      }
      graphsData.push(newGraph)
    })

    inputData = {
      name: graphData.name,
      labels: {
        defaultLength: graphData.label.defaultLength,
        labelArray: labels,
      },
      data: graphsData,
    };
  }

  export let edit = () => {}
  
</script>

<div class="h-fit shadow-lg rounded-xl p-4 bg-white overflow-hidden border-b-2 mt-2 py-2 relative">
  <LineGraph bind:this={graph} {inputData} {id} {edit}/>
</div>
