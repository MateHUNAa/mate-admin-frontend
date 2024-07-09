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
          <h1 class="text-3xl text-center font-bold mt-12"> Work In Progress</h1>
     </div>
</template>

<script setup>
const buttonClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-600 h-10 px-4 py-2 bg-slate-700 text-white';

const adminButtons = [
     {
          label: 'Delete all Vehicles',
          action: 'deleteVehicles'
     },
     {
          label: 'Delete all Objects',
          action: 'deleteObjects'
     },
     {
          label: 'Delete all Peds',
          action: 'deletePeds'
     },
     {
          label: 'Teleport to Waypoint',
          action: 'teleportWaypoint'
     },
];

function handleButtonClick(action) {
     switch (action) {
          case 'deleteVehicles':
               deleteAllVehicles();
               break;
          case 'teleportWaypoint':
               teleportToWaypoint();
               break;
          case 'deleteObjects':
               deleteAllObjects();
               break;
          case 'teleportCoords':
               teleportToCoords();
               break;
          case 'deletePeds':
               deleteAllPeds();
               break;
          case 'screenshotPlayer':
               screenshotPlayer();
               break;
          case 'kickPlayer':
               kickPlayer();
               break;
          case 'banPlayer':
               banPlayer();
               break;
          case 'freecam':
               // Handle freecam action
               break;
          default:
               break;
     }
}

// Mock functions for button actions (replace with actual logic)
function deleteAllVehicles() {
     console.log('Deleting all vehicles');
}

function teleportToWaypoint() {
     console.log('Teleporting to waypoint');
}

function deleteAllObjects() {
     console.log('Deleting all objects');
}

function teleportToCoords() {
     console.log('Teleporting to coordinates');
}

function deleteAllPeds() {
     console.log('Deleting all peds');
}

function screenshotPlayer() {
     console.log('Taking screenshot of player');
}

function kickPlayer() {
     console.log('Kicking player');
}

function banPlayer() {
     console.log('Banning player');
}
</script>