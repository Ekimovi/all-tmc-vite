<script setup>
import { ref, computed, } from "vue";
import { storeToRefs } from "pinia";
import { useTmcStore } from "./store/tmcStore";
import ETable from "./components/e-table.vue";
import ETableAdd from "./components/e-table-add.vue";

const store = useTmcStore();

const { tmc, states, persons } = storeToRefs(store);

const showAddTable = ref(false)

</script>

<template>
  <e-table-add />
  <e-table />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
