<template>
  <div v-if="showUI" class="transition-all">
    <div class="flex h-screen p-4 border-2 border-black inset-2 bg-slate-800">
      <!-- NAVBAR -->
      <div class="flex flex-col w-1/6 space-y-2 m-2 inset-2 p-1 text-white h-max">
        <button v-for="(button, index) in buttons" :key="index" @click="selectComponent(button.componentName)" :class="['w-full py-4 text-lg font-bold bg-slate-700 hover:bg-slate-600 ',
          {
            'border-2 border-green-500': currentComponent.value === button.componentName,
            'border-2 border-slate-300/60': currentComponent.value !== button.componentName,
          }]">
          {{ button.label }}
        </button>

      </div>

      <!-- MAIN -->
      <div class="flex-1 p-4 border-l-2 border-black">
        <component :is="currentComponent" :selected-player="selectedPlayer" :adminPlayer="adminPlayer"></component>
      </div>

      <!-- PLAYERS -->
      <div class="w-1/5 p-4 border-2 border-black">
        <div class="p-4 border-2 border-black mb-3 bg-slate-700">
          <h2 class="text-lg font-bold text-center text-white">PLAYERS</h2>
        </div>
        <div v-for="player in players" :key="player.id"
          class="p-4 border-2 border-black my-3 cursor-pointer bg-slate-700 hover:bg-slate-600"
          @click="selectPlayer(player)"
          :class="{ 'border-green-500': selectedPlayer && selectedPlayer.id === player.id }">
          <h2 class="text-lg font-bold text-white ">[{{ player.id }}] {{ player.name }}</h2>
        </div>
      </div>
    </div>


    <!-- Footer -->
    <footer class="relative border-top flex justify-center items-center mx-auto ml-7">
      <div class="absolute bottom-2 left-2 p-2 flex flex-row gap-5 border-t-4 border-white w-max">
        <p class="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-sm font-medium font-serif border border-slate-600/50">
          mhScripts</p>
        <p class="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-sm font-medium font-serif border border-slate-600/50">
          WIP</p>
        <p class="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-sm font-medium font-serif border border-slate-600/50">
          PREVIEW</p>

      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from "vue";

const buttons = [
  { label: 'DASHBOARD', componentName: 'Dashboard' },
  { label: 'GIVE', componentName: 'Give' },
  { label: 'TELEPORT', componentName: 'Teleport' },
  { label: 'GARAGE', componentName: 'Garage' },
  { label: 'Troll', componentName: 'Troll' }
];

const components = {
  Dashboard: defineAsyncComponent(() => import('./components/Dashboard.vue')),
  Give: defineAsyncComponent(() => import('./components/Give.vue')),
  Teleport: defineAsyncComponent(() => import('./components/Teleport.vue')),
  Garage: defineAsyncComponent(() => import('./components/Garage.vue')),
  Troll: defineAsyncComponent(() => import('./components/Troll.vue')),
};

const currentComponent = ref(components["Dashboard"]);
const selectComponent = (componentName) => {
  currentComponent.value = components[componentName];
};


const showUI = ref(true);
const players = ref([
  { id: 1, name: 'MateHUN', inventory: [{ item: "water", quantity: 1 }, { item: "weapon_pistol", quantity: 1 }, { item: "money", quantity: 100000 }, { item: "ammo-9", quantity: 1000 }] },
  { id: 2, name: 'Player 2', inventory: [{ item: "water", quantity: 5 }, { item: "weapon_assaultrifle", quantity: 1 }, { item: "money", quantity: 1000000 }, { item: "ammo-rifle2", quantity: 100 }] },
]);

const selectedPlayer = ref(null);
const selectPlayer = (player) => {
  selectedPlayer.value = player;
  console.log(`Selected player: ${player.name}`);
};


addEventListener("message", (event) => {
  const d = event.data;
});

addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    showUI.value = false; // Close the UI
  }
});
</script>