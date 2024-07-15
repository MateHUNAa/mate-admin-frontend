<template>
     <div class="flex justify-center items-center min-h-screen">
          <div v-if="props.selectedPlayer" class="border-[3px] border-slate-600 p-8">

               <div class="relative">
                    <h1 class="text-lg font-bold text-white absolute -top-12 right-[5rem]">{{ config.Teleport.TITLE }}</h1>
               </div>

               <div class="grid grid-cols-2 gap-4">
                    <button v-for="(button, index) in buttons" :key="index" @click="handleAction(button)"
                         class="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 border-2 border-black text-lg font-bold italic">
                         {{ button.toUpperCase() }}
                    </button>
               </div>
          </div>

          <div v-else>
               <h1 class="text-lg font-bold text-white">{{ config.Teleport.NOPLAYER}}</h1>
          </div>
     </div>
</template>

<script setup>
import axios from 'axios'
import config from "../config.json"
const props = defineProps({
     selectedPlayer: Object
})

const handleAction = (action) => {
     axios.post(`https://mate-admin/teleport`, JSON.stringify({ target: props.selectedPlayer.id, action: action }))
}

const buttons = [
     config.Teleport.Public,
     config.Teleport.Cloth,
     config.Teleport.Impound,
     config.Teleport.Ambulance,
     config.Teleport.Waypoint,
     config.Teleport.LSPD,
     config.Teleport.Bring,
     config.Teleport.Goto,
]

</script>