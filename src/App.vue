<script setup>
import TheHeader from '@/components/common/TheHeader.vue';
import TheFooter from '@/components/common/TheFooter.vue';
// import TheNavbar from './components/common/TheNavbar.vue';
// import { useLoginStore } from '@/stores/login';
// import { fetchData } from '@/Util/fetch';
// fetchData();
// const store = useLoginStore();
// store.increment();
</script>

<template>
  <TheHeader
    :backgroundColor="'#000'"
    :userDropdownLinks="userDropdownLinks"
    v-model:isExpanded="isExpanded"
  >
    <template #system>專案名稱</template>
    <template #userName>Wayne T. Huang</template>
  </TheHeader>
  <!-- <TheNavbar :backgroundColor="'var(--color-green5)'" :sidebarLinks="sidebarLinks" /> -->
  <main>
    <router-view />
  </main>
  <TheFooter></TheFooter>
</template>

<style lang="scss" scoped>
main {
  padding: 1rem;
  flex-grow: 1;

  .container {
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 10px 20px #0000000d;
  }
}
</style>
