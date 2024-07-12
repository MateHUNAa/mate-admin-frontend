<template>
     <div class="rounded-lg border-2 border-slate-400 text-card-foreground shadow-sm bg-slate-800 p-4" data-v0-t="card">
          <div class="flex flex-col space-y-1.5 p-6">
               <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-white">{{ config.Inventory.TITLE }}</h3>
          </div>
          <div class="p-6 space-y-4">
               <div class="space-y-2">
                    <div v-if="selectedPlayer">
                         <p>{{ selectedPlayer.name }}{{ config.Inventory.XINVENTORY }}</p>
                         <div
                              class="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white">
                              <pre v-html="formattedPlayerInventory" style="white-space: pre-wrap;"></pre>
                         </div>
                    </div>
                    <div v-else>
                         <p>{{config.Inventory.NOPLAYER}}</p>
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
import { computed } from 'vue';
import config from "../../../config.json"
const props = defineProps({
     selectedPlayer: {
          type: Object,
          required: true
     }
});

const formattedPlayerInventory = computed(() => {
     if (!props.selectedPlayer || !props.selectedPlayer.inventory) {
          return "Inventory is empty";
     }

     return props.selectedPlayer.inventory.map(item => {
          const itemName = item.item.toLowerCase();
          const itemQuantity = item.quantity;
          let color = 'white';
          let fontWeight = 'normal';

          if (itemName.toLowerCase().startsWith('weapon_')) {
               color = 'red';
          } else if (itemName.startsWith('ammo-')) {
               color = 'orange';
          } else if (itemName.startsWith('money')) {
               color = 'green';
               if (itemQuantity >= 100000) {
                    color = 'yellow';
               }
               if (itemQuantity >= 1000000) {
                    color = 'red';
                    fontWeight = 'bolder';
               }
          }

          return `<span style="color: ${color}; font-weight: ${fontWeight};">${itemName}: ${itemQuantity}</span>`;
     }).join('<br/>');
});
</script>