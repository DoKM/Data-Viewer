<script>
    import {link} from 'svelte-spa-router'
</script>

<nav class="bg-blue-900 shadow-lg h-10">
    <div class="container mx-auto">
        <div class="sm:flex">
            
            <a use:link={"/"}><span class="p-3 text-3xl font-bold text-white">Home</span></a>
            

            <!-- Menus -->
            <div class="p-3 ml-55">
                <ul class="text-xl text-white sm:self-center">
                    <slot name="nav"></slot>
                    
                </ul>
            </div>

        </div>
    </div>
</nav>