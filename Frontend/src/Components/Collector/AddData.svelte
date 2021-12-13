<script>
    export let colums = ["test", "test", "test"]
    export let rows = [[]]

    function newColum(){
        colums = [...colums, "test"];
    }

    function newRow(){
        rows = [...rows, []]
    }
    function checkIfDupeName(index, array){
        for(let i = 0; i < array.length; i++){
            if(i != index && array[i] === array[index]){
                return true
            }
        }
        return false
    }

    function gatherInfo(){
        let data = []
        rows.forEach(row => {
            let object = {}
            for(let i = 0; i < colums.length; i++){
                object[colums[i]] = row[i]

            }
            data.push(object)
        })
        console.log(data)
    }

    function deleteColumn(i){
        colums = [...colums.slice(0, i), ...colums.slice(i + 1)];
        for(let index = 0; index < rows.length; index++){
            rows[index] = [...rows[index].slice(0, i), ...rows[index].slice(i + 1)]
        }
    }
</script>
<div>
    {colums}
</div>
<div class="overflow-x-auto overflow-y-auto">

    <table class="table-auto border-collapse w-full">
        <thead class="bg-gray-50">
            <tr>
                {#each colums as colum, index}
                    <th scope="col" class="text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                        <button on:click={()=> deleteColumn(index)}>X</button>
                    </th>
                {/each}
            </tr>
            <tr>
                {#each colums as colum, index}
                  
                  <th scope="col" class="text-left text-xs font-medium {checkIfDupeName(index, colums)?"text-red-500":"text-gray-500"} uppercase tracking-wider">
                    <input class="p-0" bind:value={colums[index]} type="text">
                  </th>
                  
                  
                {/each}
                
            </tr>
        </thead>
       
        <tbody class="bg-white divide-y divide-gray-200">
            {#each rows as row, index}
            <tr>
                {#each colums as colum, index2}
                <td class="whitespace-nowrap text-sm bg-gray-100 text-gray-600">
                    <input class="p-0" type="text" bind:value={rows[index][index2]}>
                </td>
                {/each}
            </tr>
            {/each}
            
    
        </tbody>
    
        
    </table>
    <button on:click={()=> newColum()}>New Colum</button>
    <button on:click={()=> newRow()}>
        new Row
    </button>
    <button on:click={()=> gatherInfo()}>
        test
    </button>
</div>