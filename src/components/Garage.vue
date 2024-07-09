<template>
     <div class="flex w-full h-screen p-4 text-white">

          <!-- Owned Vehicles -->
          <div class="flex flex-col w-1/3 p-4 border mx-2">

               <div class="p-2 border my-2">
                    <h2 class="text-lg font-bold italic text-center">OWNED VEHICLES</h2>
               </div>

               <div v-if="props.selectedPlayer">
                    <div v-for="(vehicle, idx) in vehicles" :key="idx"
                         :class="['flex flex-col p-2 border my-2 bg-slate-700/50 hover:bg-slate-600', { 'border-green-500': selectedVehicle === vehicle }]">
                         <div @click="selectVehicle(vehicle)" class="p-2">
                              <h3 class="text-lg font-bold">{{ vehicle.label }}</h3>
                         </div>
                    </div>
               </div>

               <div v-else>
                    <div class="p-2 border my-2">
                         <h2 class="text-lg font-bold italic text-center">Select User First</h2>
                    </div>
               </div>
          </div>

          <!-- Right Column -->
          <div class="flex flex-col w-2/3 p-4 border mx-2">

               <div class="relative top-0 right-0">
                    <button v-if="selectedVehicle" @click="unselectVehicle"
                         class="absolute top-2 right-2 inline-flex items-center justify-center h-8 w-8 text-lg font-bold bg-slate-700/50 rounded-sm">
                         X
                    </button>
               </div>

               <!-- Give Vehicle -->
               <div v-if="!selectedVehicle" class="flex flex-col justify-center items-center min-h-screen">
                    <input v-model="newVehicleModel" placeholder="Enter vehicle model"
                         class="flex h-10 w-full rounded-md bg-background max-w-60 px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-2 border-black text-lg font-bold mb-4 text-black" />
                    <button @click="giveVehicle"
                         class="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 hover:bg-slate-600 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border-2 border-black text-lg font-bold w-full max-w-60">
                         GIVE VEHICLE
                    </button>
               </div>

               <!-- Manage Player Owned Vehicles -->
               <div v-else>

                    <div class="flex flex-row gap-5 m-2 ">
                         <h2 class="text-lg font-bold mb-4 bg-slate-700 rounded-md p-2 m-2 min-w-40">
                              <FontAwesomeIcon :icon="faCar" />
                              Selected Vehicle: {{ selectedVehicle.label }}
                         </h2>
                         <h2 class="text-lg font-bold mb-4 bg-slate-700 rounded-md p-2 m-2 min-w-40">
                              <FontAwesomeIcon :icon="faWarehouse" /> Stored: {{ selectedVehicle.stored }}
                         </h2>
                         <h2 class="text-lg font-bold mb-4 bg-slate-700 rounded-md p-2 m-2 min-w-40">
                              <FontAwesomeIcon :icon="faCarBurst" /> Impound: {{ selectedVehicle.impound }}
                         </h2>

                    </div>

                    <div class="flex flex-col w-max gap-5">

                         <div class="flex flex-row mx-5 gap-8 m-2">
                              <button @click="removeVehicle"
                                   class="inline-flex items-center justify-center max-w-64 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 border-2 border-slate-600 text-lg font-bold mb-4">
                                   REMOVE VEHICLE
                              </button>
                              <button @click="storeVehicle" :disabled="selectedVehicle.stored"
                                   class="inline-flex items-center justify-center max-w-64 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 border-2 border-slate-600 text-lg font-bold mb-4">
                                   STORE VEHICLE
                              </button>
                              <button @click="impoundVehicle" :disabled="selectedVehicle.impound"
                                   class="inline-flex items-center justify-center max-w-64 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-700 text-white hover:bg-slate-600 h-10 px-4 py-2 border-2 border-slate-600 text-lg font-bold">
                                   IMPOUND VEHICLE
                              </button>
                         </div>

                         <div class="flex flex-col gap-5 mx-5 w-full">
                              <h2>GloveBox:</h2>
                              <div
                                   class="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white">
                                   <pre v-html="formattedGloveBox" style="white-space: pre-wrap;"></pre>
                              </div>
                              <h2>Trunk:</h2>
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

const props = defineProps({
     selectedPlayer: Object
})

const vehicles = ref([
     { model: "adder", label: "Adder", stored: false, impound: true, gloveBox: [{ item: "water", quantity: 5 }, { item: "weapon_rifle", quantity: 1 }, { item: "ammo-9", quantity: 100 }, { item: "money", quantity: 100000000 }], trunk: [] },
     { model: "p20", label: "P20", stored: true, impound: false, gloveBox: [{ item: "water", quantity: 1 }], trunk: [{ item: "water", quantity: 5 }, { item: "weapon_pistol", quantity: 1 }, { item: "ammo-rifle2", quantity: 100 }, { item: "money", quantity: 100000 }] },
]);
const selectedVehicle = ref(null);
const newVehicleModel = ref("");

const selectVehicle = (vehicle) => {
     selectedVehicle.value = vehicle;
     console.log(`Selected vehicle: ${vehicle.label}`);
};

const unselectVehicle = () => {
     selectedVehicle.value = null
}

const formattedTrunkBox = computed(() => {
     if (!selectedVehicle.value || !selectedVehicle.value.trunk) return "";

     return selectedVehicle.value.trunk.map(item => {
          const itemName = item.item;
          const itemQuantity = item.quantity;
          let color = 'white';
          let fontWeight = 'normal'

          if (itemName.startsWith('weapon_')) {
               color = 'red';
          } else if (itemName.startsWith('ammo-')) {
               color = 'orange';
          } else if (itemName.startsWith("money")) {
               color = 'green'
               if (itemQuantity >= 100000) {
                    color = `yellow`
               }
               if (itemQuantity >= 1000000) {
                    color = `red`
                    fontWeight = "bolder"
               }
          }

          return `<span style="color: ${color}; font-weight: ${fontWeight};">${itemName}: ${itemQuantity}</span>`;
     }).join('<br/>');
});
const formattedGloveBox = computed(() => {
     if (!selectedVehicle.value || !selectedVehicle.value.gloveBox) return "";

     return selectedVehicle.value.gloveBox.map(item => {
          const itemName = item.item;
          const itemQuantity = item.quantity;
          let color = 'white';
          let fontWeight = 'normal'

          if (itemName.startsWith('weapon_')) {
               color = 'red';
          } else if (itemName.startsWith('ammo-')) {
               color = 'orange';
          } else if (itemName.startsWith("money")) {
               color = 'green'
               if (itemQuantity >= 100000) {
                    color = `yellow`
               }
               if (itemQuantity >= 1000000) {
                    color = `red`
                    fontWeight = "bolder"
               }
          }

          return `<span style="color: ${color}; font-weight: ${fontWeight};">${itemName}: ${itemQuantity}</span>`;
     }).join('<br/>');
});

// TODO: Under
const spawnVehicle = (vehicle) => {
     console.log(`Spawning vehicle: ${vehicle.model}`);
};

const giveVehicle = () => {
     console.log(`Giveing vehicle to ${props.selectedPlayer.name}: ${newVehicleModel.value}`)
}

const removeVehicle = () => {
     if (selectedVehicle.value) {
          console.log(`Removeing vehicle from ${props.selectedPlayer.name} : ${selectedVehicle.value.model}`)
     }
}

const storeVehicle = () => {
     if (selectedVehicle.value) {
          console.log(`Storeing vehicle: ${selectedVehicle.value.model}`)
     }
}

const impoundVehicle = () => {
     if (selectedVehicle.value) {
          console.log(`Imbound vehicle: ${selectedVehicle.value.model} Owner: ${props.selectedPlayer.name}`)
     }
}
</script>
