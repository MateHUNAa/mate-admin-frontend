<template>
     <div class="flex w-full h-screen p-4 text-white">

          <!-- Owned Vehicles -->
          <div class="flex flex-col w-1/3 p-4 border mx-2">

               <div class="p-2 border my-2">
                    <h2 class="text-lg font-bold italic text-center">{{ config.Garage.OwnedVehicles }}</h2>
               </div>

               <div v-if="props.selectedPlayer">
                    <div v-for="(vehicle, idx) in vehicles" :key="idx"
                         :class="['flex flex-col p-2 border my-2 bg-slate-700/50 hover:bg-slate-600', { 'border-green-500': selectedVehicle === vehicle }]">
                         <div @click="selectVehicle(vehicle)" class="p-2">
                              <h3 class="text-lg font-bold">{{ vehicle.plate }}</h3>
                         </div>
                    </div>
               </div>

               <div v-else>
                    <div class="p-2 border my-2">
                         <h2 class="text-lg font-bold italic text-center">{{ config.Garage.NOPLAYER }}</h2>
                    </div>
               </div>
          </div>

          <!-- Right Column -->
          <div class="flex flex-col w-2/3 p-4 border mx-2">

               <div class="relative top-0 right-0 m-1 p-1">
                    <button v-if="selectedVehicle" @click="unselectVehicle"
                         class="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 text-lg font-bold bg-slate-700/50 rounded-sm">
                         X
                    </button>
               </div>

               <!-- Give Vehicle -->
               <div v-if="!selectedVehicle" class="flex flex-col justify-center items-center min-h-screen">
                    <input v-model="newVehicleModel" :placeholder="config.Garage.plVehicle"
                         class="flex h-10 w-full rounded-md bg-background max-w-60 px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-2 border-black text-lg font-bold mb-4 text-black" />
                    <button @click="giveVehicle"
                         class="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 hover:bg-slate-600 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border-2 border-black text-lg font-bold w-full max-w-60">
                         {{ config.Garage.GIVEVEHICLEBTN }}
                    </button>
               </div>

               <!-- Manage Player Owned Vehicles -->
               <div v-else>

                    <div class="flex flex-row gap-5 m-2 mt-4">
                         <h2 class="text-lg font-bold mb-4 bg-slate-700 rounded-md p-2 m-2 min-w-40">
                              <FontAwesomeIcon :icon="faCar" />
                              {{ config.Garage.SelectedVehicle }} <span class="text-md">{{ selectedVehicle.plate }}</span>
                         </h2>
                         <h2 class="text-lg font-bold mb-4 bg-slate-700 rounded-md p-2 m-2 min-w-40">
                              <FontAwesomeIcon :icon="faWarehouse" /> {{ config.Garage.Stored }}{{ selectedVehicle.stored ? "Yes" : "No"}}
                         </h2>
                         <h2 class="text-lg font-bold mb-4 bg-slate-700 rounded-md p-2 m-2 min-w-40">
                              <FontAwesomeIcon :icon="faCarBurst" /> {{ config.Garage.Impound }} {{
                              !selectedVehicle.stored ? "Yes" : "No" }}
                         </h2>

                    </div>

                    <div class="flex flex-col w-max gap-5">

                         <div class="flex flex-row mx-5 gap-8 m-2">
                              <button @click="removeVehicle(idx)"
                                   class="inline-flex items-center justify-center max-w-64 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 border-2 border-slate-600 text-lg font-bold mb-4">
                                   {{ config.Garage.btnRemoveVehicle }}
                              </button>
                              <button @click="storeVehicle" :disabled="selectedVehicle.stored"
                                   class="inline-flex items-center justify-center max-w-64 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 border-2 border-slate-600 text-lg font-bold mb-4">
                                   {{ config.Garage.btnStoreVehicle }}
                              </button>
                              <button @click="impoundVehicle" :disabled="selectedVehicle.impound"
                                   class="inline-flex items-center justify-center max-w-64 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 border-2 border-slate-600 text-lg font-bold">
                                   {{ config.Garage.btnImpoundVehicle }}
                              </button>
                         </div>

                         <div class="flex flex-col gap-5 mx-5 w-full">
                              <h2>{{ config.Garage.glovebox }}</h2>
                              <div
                                   class="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white">
                                   <pre v-html="formattedGloveBox" style="white-space: pre-wrap;"></pre>
                              </div>
                              <h2>{{ config.Garage.trunk }}</h2>
                              <div
                                   class="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white">
                                   <pre v-html="formattedTrunkBox" style="white-space: pre-wrap;"></pre>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons/faWarehouse';
import { faCarBurst, faCar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import config from "../config.json"
const props = defineProps({
     selectedPlayer: Object
})

const vehicles = computed(() => {
     return props.selectedPlayer.vehicles
})
const selectedVehicle = ref(null);
const newVehicleModel = ref("");

const selectVehicle = (vehicle) => {
     selectedVehicle.value = vehicle;
};

const unselectVehicle = () => {
     selectedVehicle.value = null
}

const formattedTrunkBox = computed(() => {
     if (!selectedVehicle.value || !selectedVehicle.value.trunk) return "";

     let gloveBoxItems;

     try {
          gloveBoxItems = JSON.parse(selectedVehicle.value.trunk);
     } catch (err) {
          console.error("Error parsing trunk JSON: ", err);
          return "";
     }

     return gloveBoxItems.map(item => {
          const itemName = item.name.toLowerCase() || item.item.toLowerCase();
          const itemQuantity = item.count || item.quantity;
          if (!itemName || itemQuantity === undefined) {
               console.warn("Invalid item structure:", item);
               return "";
          }

          let color = 'white';
          let fontWeight = 'normal';

          if (itemName.startsWith('weapon_')) {
               color = 'red';
          } else if (itemName.startsWith('ammo-')) {
               color = 'orange';
          } else if (itemName.startsWith("money")) {
               color = 'green';
               if (itemQuantity >= 100000) {
                    color = `yellow`;
               }
               if (itemQuantity >= 1000000) {
                    color = `red`;
                    fontWeight = "bolder";
               }
          }

          return `<span style="color: ${color}; font-weight: ${fontWeight};">${itemName}: ${itemQuantity}</span>`;
     }).join('<br/>');
});
const formattedGloveBox = computed(() => {
     if (!selectedVehicle.value || !selectedVehicle.value.glovebox) return "";

     let gloveBoxItems;

     try {
          gloveBoxItems = JSON.parse(selectedVehicle.value.glovebox);
     } catch (err) {
          console.error("Error parsing glovebox JSON: ", err);
          return "";
     }

     return gloveBoxItems.map(item => {
          const itemName = item.name || item.item;
          const itemQuantity = item.count || item.quantity;
          if (!itemName || itemQuantity === undefined) {
               console.warn("Invalid item structure:", item);
               return "";
          }

          let color = 'white';
          let fontWeight = 'normal';

          if (itemName.startsWith('weapon_')) {
               color = 'red';
          } else if (itemName.startsWith('ammo-')) {
               color = 'orange';
          } else if (itemName.startsWith("money")) {
               color = 'green';
               if (itemQuantity >= 100000) {
                    color = `yellow`;
               }
               if (itemQuantity >= 1000000) {
                    color = `red`;
                    fontWeight = "bolder";
               }
          }

          return `<span style="color: ${color}; font-weight: ${fontWeight};">${itemName}: ${itemQuantity}</span>`;
     }).join('<br/>');
});

const giveVehicle = () => {
     axios.post("https://mate-admin/garage:giveVehicle", JSON.stringify({ target: props.selectedPlayer.id, model: newVehicleModel.value }))
}

const removeVehicle = (idx) => {
     if (selectedVehicle.value) {
          axios.post('https://mate-admin/garage:removeVehicle', JSON.stringify({ target: props.selectedPlayer.id, plate: selectedVehicle.value.plate }))
     }
}

const storeVehicle = () => {
     if (selectedVehicle.value) {
          axios.post('https://mate-admin/garage:storeVehicle', JSON.stringify({ target: props.selectedPlayer.id, plate: selectedVehicle.value.plate }))
          selectedVehicle.value.stored = true
     }
}

const impoundVehicle = () => {
     if (selectedVehicle.value) {
          axios.post('https://mate-admin/garage:impoundVehicle', JSON.stringify({ target: props.selectedPlayer.id, plate: selectedVehicle.value.plate }))
          selectedVehicle.value.stored = false
     }
}
</script>
