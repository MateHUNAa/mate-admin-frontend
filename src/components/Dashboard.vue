<template>
     <div class="grid grid-cols-1 gap-4 p-4 bg-slate-900/40 rounded-lg text-white md:grid-cols-2 lg:grid-cols-2">
          <announce />
          <admin />
          <inventory :selected-player="props.selectedPlayer" />
          <miscellaneous />
     </div>
</template>

<script setup>
import announce from './subComponents/Dashboard/Announce.vue'
import Admin from './subComponents/Dashboard/Admin.vue';
import Inventory from './subComponents/Dashboard/Inventory.vue';
import Miscellaneous from './subComponents/Dashboard/Miscellaneous.vue';

const props = defineProps({
     selectedPlayer: Object
})
</script>