<script lang="ts" setup>
const userStore = useUserStore();

// TODO: Update this when login completed
await useAsyncData("get_user", () => userStore.GET_USER(1));
</script>

<template>
  <NuxtRouteAnnouncer />

  <NuxtLayout>
    <HeaderComponent />
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
