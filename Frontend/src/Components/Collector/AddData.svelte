<script>
	import API from './../../Services/Api.js';
    import {push, pop, replace} from 'svelte-spa-router'

    export let params = {}

    export let colums = ["test", "test", "test"]
    export let rows = [[]]

    $: {
        if(colums.includes("_id")){
            let index = colums.indexOf("_id")
            deleteColumn(index)
        }
        if(colums.length == 0){
            colums = ["new"]
        }
    }


    function newColum(){
        colums = [...colums, `new ${colums.length+1}`];
    }

    function newRow(){
        rows = [...rows, []]
    }
    function checkIfDupeName(index, array){
        if(array[index] == ""){
            return true;
        }
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
        return data
    }

    function deleteColumn(i){
        colums = [...colums.slice(0, i), ...colums.slice(i + 1)];
        for(let index = 0; index < rows.length; index++){
            rows[index] = [...rows[index].slice(0, i), ...rows[index].slice(i + 1)]
        }
    }
    function deleteRow(index){
        rows = [...rows.slice(0, index), ...rows.slice(index + 1)]
    }

    function validateKeys(){
        for(let i = 0; i < colums.length; i++){
            if(checkIfDupeName(i, colums)){
                return false
            }
        }
        return true
    }

    export function post(){
        if(validateKeys()){
            let data = gatherInfo()
            console.log(data)
            API.post(`/data/collector/${params.collector}/trip/${params.trip}`, data)
            reload()
            addDataWindow.hide()
        }
        
    }

    export let addDataWindow;
    export let reload = () => {}

    

</script>

<div class="overflow-x-auto overflow-y-auto">

    <table class="table-auto border-collapse w-full">
        <thead class="bg-gray-50">
            <tr>
                {#each colums as colum, index}
                    {#if colum != "_id"}
                    <th scope="col" class="text-left text-xs font-medium text-red-500 uppercase tracking-wider text-center">
                        <button on:click={()=> deleteColumn(index)}>X</button>
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
                    <th scope="col" class="text-left text-xs font-medium rounded  {checkIfDupeName(index, colums)?"border-2 bg-red-300 border-rose-500 text-red-500":"text-gray-500"} uppercase tracking-wider">
                        <input class="p-0 bg-transparent outline-none border-none" bind:value={colums[index]} type="text">
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
                    <input class="p-0 bg-transparent outline-none border-none" type="number" bind:value={rows[index][index2]}>
                </td>
                {/if}
                {/each}
                <td class="px-6 whitespace-nowrap bg-gray-200 text-right text-red-500 text-sm font-medium">
                    <button on:click={()=> deleteRow(index)}>X</button>
                </td>
            </tr>
            {/each}
            
    
        </tbody>
    
        
    </table>
    <button on:click={()=> newColum()}>New Colum</button>
    <button on:click={()=> newRow()}>
        new Row
    </button>

</div>