<script>
  import Line from "svelte-chartjs/src/Line.svelte";
  export let inputData = {
    labels: {
        labelArray:[],

    },
    data: [],
  };

  export let data = {};
  export let labels = []

  export let index = 0;
  export let width = 10
  
  $:{
    
    if(inputData.labels.labelArray.length != inputData.data[0].data.length || inputData.labels.labelArray.length == 0){
        let array = []
        for(let i = 0; i<width; i++){
            array.push(i+index)
        }
        labels = array;
    } else {
        let array = []
        for(let i =0; i < width; i++){
            array.push(inputData.labels.labelArray[i+index]?inputData.labels.labelArray[i+index]:i+index)
        }
        labels = array
    }
  }

  $: {
    let datasets = []
    inputData.data.forEach((input) => {
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
        data: input.data,
      };
      datasets = arrayPush(dataset)
    });

    data = {
      labels: labels,
      datasets: datasets
    }
   
  }

  function arrayPush(newData){
    return [...data, newData]
  }

  
</script>

<Line {data} />

