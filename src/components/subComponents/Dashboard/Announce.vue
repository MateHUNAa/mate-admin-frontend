<template>
     <div class="rounded-lg border-2 border-slate-400 text-card-foreground shadow-sm bg-slate-800  p-4"
          data-v0-t="card">
          <div class="flex flex-col space-y-1.5 p-6">
               <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight text-white">{{
                    config.Announce.TITLE}}</h3>
          </div>

          <div class="p-6 space-y-4">
               <div class="grid grid-cols-2 gap-4">
                    <div class="space-y-2">
                         <label
                              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                              for="time">
                              {{ config.Announce.TIME  }}
                         </label>
                         <input v-model="time"
                              class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white"
                              id="time" placeholder="5000" />
                    </div>
                    <div class="space-y-2">
                         <label
                              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                              for="header">
                              {{ config.Announce.HEADER  }}
                         </label>
                         <input v-model="header"
                              class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white"
                              id="header" placeholder="Announcement" />
                    </div>
               </div>

               <div class="space-y-2">
                    <label
                         class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                         for="text">
                         {{ config.Announce.TEXT  }}
                    </label>
                    <textarea v-model="text"
                         class="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-800/50 text-white"
                         id="text" placeholder=""></textarea>
               </div>
               <button @click="handleClick"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white w-full">
                    {{config.Announce.SENDBTN}}
               </button>
          </div>
     </div>
</template>
<script setup>

import { ref } from "vue";
import axios from 'axios';
import config from "../../../config.json"

const time = ref(5)
const header = ref("")
const text = ref("")

const handleClick = () => {
     if (!time.value || !header.value || !text.value) return // TODO: Notification

     if (time.value > 10) time.value = 10;
     axios.post("https://mate-admin/announceSend", JSON.stringify({ time: time.value, header: header.value, text: text.value }))

}

</script>