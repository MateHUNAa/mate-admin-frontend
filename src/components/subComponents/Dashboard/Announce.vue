<template>
     <div class="rounded-lg border-2 border-slate-400 text-card-foreground shadow-sm bg-slate-800  p-4"
          data-v0-t="card">
          <div class="flex flex-col space-y-1.5 p-6">
               <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-white">Announce
               </h3>
          </div>

          <div class="p-6 space-y-4">
               <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                         <label
                              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                              for="time">
                              Time (ms)
                         </label>
                         <input
                              class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white"
                              id="time" placeholder="10000" />
                    </div>
                    <div class="space-y-2">
                         <label
                              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                              for="header">
                              Header
                         </label>
                         <input
                              class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white"
                              id="header" placeholder="Announcement" />
                    </div>
               </div>

               <div class="space-y-2">
                    <label
                         class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                         for="text">
                         Text
                    </label>
                    <textarea
                         class="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white"
                         id="text" placeholder=""></textarea>
               </div>
               <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white w-full">
                    Send
               </button>
          </div>
     </div>
</template>
<script setup>

</script>
