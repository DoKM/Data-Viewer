<script>
    import Line from "svelte-chartjs/src/Line.svelte"
    export let datastuff = []
    $: console.log(datastuff)

    export let dataLine;
    export let labels = []
    // {
    //     if(datastuff.length != 0){
    //         labels = []
    //         for(let i =0; i< datastuff[0].length;i++){
    //             labels[i] = i
    //         }
    //     }
    // }

    $: {
        
        

        dataLine = {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [
      {
        label: "My First dataset",
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
        data: datastuff[0]
      },
      {
        label: "My Second dataset",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(184, 185, 210, .3)",
        borderColor: "rgb(35, 26, 136)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(35, 26, 136)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220, 1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: datastuff[1]
      }
    ]
  }
    }
</script>

<Line data={dataLine}></Line>