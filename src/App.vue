<template>
  <div v-if="showUI" class="transition-all">
    <div class="flex h-screen p-4 border-2 border-black inset-2 bg-slate-800">
      <!-- NAVBAR -->
      <div class="flex flex-col w-1/6 space-y-2 m-2 inset-2 p-1 text-white h-max">
        <template v-for="(button, index) in buttons" :key="index">
          <div v-if="button.separator" class="border-t-2 border-slate-400 my-4"></div>
          <button v-else @click="selectComponent(button.componentName)" :disabled="button.disabled" :class="['w-full py-4 text-lg font-bold bg-slate-700',
            {
              'border-2 border-green-500': currentComponent.value === button.componentName,
              'border-2 border-slate-300/60': currentComponent.value !== button.componentName,
              'bg-slate-900/50': button.disabled,
              'hover:bg-slate-600': !button.disabled
            }]">
            {{ button.label }}
          </button>
        </template>
      </div>

      <!-- MAIN -->
      <div class="flex-1 p-4 border-l-2 border-black">
        <component :is="currentComponent" :selected-player="selectedPlayer" :adminPlayer="adminPlayer"></component>
      </div>

      <!-- PLAYERS -->
      <div class="w-1/5 p-4 border-2 border-black">
        <div class="p-4 border-2 border-black mb-3 bg-slate-700">
          <h2 class="text-lg font-bold text-center text-white">{{ config.Players.players }}</h2>
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
          BETA</p>
        <p class="p-2 bg-slate-700/50 hover:bg-slate-600 rounded-sm font-medium font-serif border border-slate-600/50">
          {{ version }}</p>

      </div>
    </footer>
  </div>
</template>


<script setup>
import { ref, defineAsyncComponent } from "vue";
import axios from "axios"
import config from './config.json'

const buttons = [
  { label: config.navbar.DASHBOARD, componentName: 'Dashboard', disabled: false },
  { label: config.navbar.GIVE, componentName: 'Give', disabled: false },
  { label: config.navbar.TELEPORT, componentName: 'Teleport', disabled: false },
  { label: config.navbar.GARAGE, componentName: 'Garage', disabled: false },
  { separator: true },
  { label: config.navbar.TROLL, componentName: 'Troll', disabled: true },
  { label: config.navbar.DEV, componentName: 'Dev', disabled: true },
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
const version = ref("NOT FOUND")
const players = ref([{id: 1, name: "asd", inventory: {}, trunk: {}, glovebox: {}}]);

const selectedPlayer = ref(null);
const selectPlayer = (player) => {
  selectedPlayer.value = player;
};


addEventListener("message", (event) => {
  const d = event.data;
  let e
  if (d.data) e = d.data

  if (d.type === "m-admin:panel:ForceHideUI") {
    showUI.value = false
  }

  if (d.type === "m-admin:panel:open") {
    showUI.value = true
    players.value = e
    version.value = d.version
  }
});

addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    showUI.value = false;
    axios.post("https://mate-admin/:closeUI")
  }
});
</script>