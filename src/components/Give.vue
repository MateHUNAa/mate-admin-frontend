<template>
     <div class="flex justify-center items-center min-h-screen">
          <div class="grid grid-cols-2 gap-8 p-8 border-2 border-black">
               <div v-for="(group, index) in buttonGroups" :key="index" class="flex flex-col items-center space-y-4">
                    <template v-for="(button, idx) in group.buttons" :key="idx">
                         <button v-if="!button.isInput" @click="handleClick(button.action)"
                              :class="[buttonClass, { 'border-slate-600': selectedButton === button.label }, button.className]"
                              type="button">
                              {{ button.label }}
                         </button>
                         <input v-else :placeholder="button.label"
                              :class="[inputClass, { 'border-slate-600': selectedButton === button.label }]"
                              v-model="button.value" />
                    </template>
               </div>
          </div>
     </div>
</template>

<script setup>

import { ref, defineProps } from 'vue';

const props = defineProps({
     selectedPlayer: Object
})


const buttonClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border-2 border-black text-lg font-bold';
const inputClass = 'flex h-10 w-full rounded-md bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-2 border-black text-lg font-bold';

const buttonGroups = [
     {
          buttons: [
               { label: 'ITEMS', action: 'items', isInput: true },
               { label: 'GIVE', action: 'give', isInput: false, className: "w-24" }
          ]
     },
     {
          buttons: [
               { label: 'VEHICLE MODEL', action: 'vehicleModel', isInput: true },
               { label: 'GIVE', action: 'giveVehicle', isInput: false, className: "w-24" }
          ]
     },
     {
          buttons: [
               { label: 'WEAPONS', action: 'weapons', isInput: true, value: 'WEAPON_' },
               { label: 'GIVE', action: 'giveWeapons', isInput: false, className: "w-24" }
          ]
     },
     {
          buttons: [
               { label: 'SKIN MENU', action: 'skinMenu', isInput: false },
               { label: 'PED MENU', action: 'pedMenu', isInput: false },
               { label: 'HANDCUFF', action: 'handcuff', isInput: false }
          ]
     }
];


const selectedButton = ref(null)
const handleClick = (action) => {
     selectedButton.value = action;
     console.log(`Action: ${action} SelectedPlayer:           ${props.selectedPlayer.id}`)
}

</script>