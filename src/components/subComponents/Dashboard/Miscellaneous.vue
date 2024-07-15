<template>
     <div class="rounded-lg border-2 border-slate-400 text-card-foreground shadow-sm bg-slate-800  p-4"
          data-v0-t="card">
          <div class="flex flex-col space-y-1.5 p-6">
               <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{{ config.Self.TITLE }}
               </h3>
          </div>
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
               <!-- Actions -->
               <div class="space-y-2">
                    <div class="grid grid-cols-2 gap-2">
                         <button v-for="action in actions" :key="action"
                              class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-600 h-10 px-4 py-2 bg-slate-700 text-white"
                              @click="performAction(action)">
                              {{ action }}
                         </button>
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
import config from '../../../config.json'
// Action buttons data
const actions = ref([
     config.Self.Invisible,
     config.Self.Heal,
     config.Self.Armour,
     config.Self.Invincible,
     config.Self.AddWeapons,
     config.Self.RemoveWeapons
]);

// Perform action
const performAction = (action) => {
     switch (action) {
          case "Invisible":
               axios.post("https://mate-admin/client:invisible")
               break;
          case "Heal":
               axios.post("https://mate-admin/client:heal")
               break;
          case "Armour":
               axios.post("https://mate-admin/client:armour")
               break;
          case "Invincible":
               axios.post("https://mate-admin/client:invincible")
               break;
          case "Add Weapons":
               axios.post("https://mate-admin/client:addAllWeapons")
               break;
          case "Remove Weapons":
               axios.post("https://mate-admin/client:removeAllWeapons")
               break;
     }
};
</script>