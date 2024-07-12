<template>
     <div class="rounded-lg border-2 border-slate-400 text-card-foreground shadow-sm bg-slate-800 p-4" data-v0-t="card">
          <div class="flex flex-col space-y-1.5 p-6">
               <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-white">Commands</h3>
          </div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
               <button v-for="(button, index) in adminButtons" :key="index" :class="buttonClass + button.className"
                    @click="handleButtonClick(button.action)">
                    {{ button.label }}
               </button>
          </div>
          <!-- <h1 class="text-3xl text-center font-bold mt-12"> Work In Progress</h1> -->
     </div>
</template>

<script setup>
import axios from 'axios'
import config from '../../../config.json'
const buttonClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-600 h-10 px-4 py-2 bg-slate-700 text-white';

const adminButtons = [
     {
          label: config.Commands.DELETEALLVEHICLES,
          action: 'deleteVehicles'
     },
     {
          label: config.Commands.DELETEALLOBJECTS,
          action: 'deleteObjects'
     },
     {
          label: config.Commands.DELETEALLPEDS,
          action: 'deletePeds'
     },
     {
          label: config.Commands.TELEPORTTOWAYPOINT,
          action: 'teleportWaypoint'
     },
];

function handleButtonClick(action) {
     switch (action) {
          case 'teleportWaypoint':
               axios.post("https://mate-admin/client:tpm")
               break;
          case 'deleteVehicles':
               axios.post("https://mate-admin/client:cleanupVehicles")
               break;
          case 'deleteObjects':
               axios.post("https://mate-admin/client:cleanupObjects")
               break;
          case 'deletePeds':
               axios.post("https://mate-admin/client:cleanupPeds")
               break;
          default:
               break;
     }
}

</script>