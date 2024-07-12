<template>
     <div class="flex justify-center items-center min-h-screen">
          <div v-if="props.selectedPlayer" class="grid grid-cols-2 gap-8 p-8 border-2 border-black">
               <div v-for="(group, index) in buttonGroups" :key="index" class="flex flex-col items-center space-y-4">
                    <template v-for="(button, idx) in group.buttons" :key="idx">
                         <button v-if="!button.isInput" @click="handleClick(button.action, group.inputValue)"
                              :class="[buttonClass, { 'border-slate-600': selectedButton === button.label }, button.className]"
                              type="button">
                              {{ button.label }}
                         </button>
                         <input v-else :placeholder="button.label"
                              :class="[inputClass, { 'border-slate-600': selectedButton === button.label }]"
                              v-model="group.inputValue" />
                    </template>
               </div>
          </div>
          <div v-else>
               <h1 class="text-2xl font-bold text-white">{{ config.Give.NOPLAYER }}</h1>
          </div>
     </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';
import config from "../config.json"
const props = defineProps({
     selectedPlayer: Object,
     adminPlayer: Object
});

const buttonClass = 'inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border-2 border-black text-lg font-bold bg-slate-700 hover:bg-slate-600';
const inputClass = 'flex h-10 w-full rounded-md bg-slate-700 px-3 py-2 ring-offset-slate-700 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-2 border-black text-lg font-bold';

const buttonGroups = ref([
     {
          inputValue: "",
          buttons: [
               { label: config.Give.plItems, action: 'items', isInput: true },
               { label: config.Give.GIVE, action: 'give', isInput: false, className: "w-24" }
          ]
     },
     {
          inputValue: "",
          buttons: [
               { label: config.Give.plVehicle, action: 'vehicleModel', isInput: true },
               { label: config.Give.GIVE, action: 'giveVehicle', isInput: false, className: "w-24" }
          ]
     },
     {
          inputValue: 'WEAPON_',
          buttons: [
               { label: config.Give.plWeapon, action: 'weapons', isInput: true },
               { label: config.Give.GIVE, action: 'giveWeapons', isInput: false, className: "w-24" }
          ]
     },
     {
          buttons: [
               { label: config.Give.SKINMENU, action: 'skinMenu', isInput: false },
               { label: config.Give.PEDMENU, action: 'pedMenu', isInput: false },
               { label: config.Give.HANDCUFF, action: 'handcuff', isInput: false }
          ]
     }
]);

const selectedButton = ref(null);

const handleClick = (action, value) => {
     switch (action) {
          case "giveWeapons":
               if (!value || !value.toLowerCase().startsWith("weapon")) {
                    console.log(`[Failed]: Failed to give weapon to ${props.selectedPlayer.name} because the weapon model is not valid!`);
                    return;
               }
               axios.post("https://mate-admin/give:weapon", JSON.stringify({ weapon: value, target: props.selectedPlayer.id }))
               break;
          case "give":
               if (!value || value.toLowerCase().startsWith("weapon")) {
                    if (value) {
                         console.log(`[Failed]: Failed to give item to ${props.selectedPlayer.name} because the item is a weapon!`);
                    } else {
                         console.log(`[Failed]: Failed to give item to ${props.selectedPlayer.name} because the item is null`);
                    }
                    return;
               }
               axios.post("https://mate-admin/give:item", JSON.stringify({ item: value, target: props.selectedPlayer.id }))
               break;
          case "giveVehicle":
               if (!value) {
                    console.log(`[Failed]: Failed to give vehicle to ${props.selectedPlayer.name} because the model is null`);
                    return;
               }
               axios.post("https://mate-admin/give:vehicle", JSON.stringify({ vehicle: value, target: props.selectedPlayer.id }))

               break;

          case "skinMenu":
               axios.post("https://mate-admin/give:skinMenu", JSON.stringify({ target: props.selectedPlayer.id }))
               axios.post("https://mate-admin/:ForceHideUI")
               break;
          case "pedMenu":
               axios.post("https://mate-admin/give:pedMenu", JSON.stringify({ target: props.selectedPlayer.id }))
               axios.post("https://mate-admin/:ForceHideUI")
               break;
          case "handcuff":
               axios.post("https://mate-admin/give:handCuff", JSON.stringify({ target: props.selectedPlayer.id }))
               break;
     }
     selectedButton.value = action;
     console.log(`Action: ${action} SelectedPlayer: [${props.selectedPlayer.id}]${props.selectedPlayer.name} Value: ${value}`);
};
</script>