<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
  withSearch?: boolean;
}>();
</script>

<template>
  <section class="container MovieList">
    <div class="MovieList__header">
      <div class="MovieList__headline">
        <h2>{{ title }}</h2>
        <p>
          {{ description }}
        </p>
      </div>

      <div class="MovieList__search" v-if="withSearch">
        <input type="text" placeholder="Search movies..." />
      </div>
    </div>

    <ul class="MovieList__lists">
      <li v-for="i in 20" :key="i" class="MovieList__item">
        <MovieCard />
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
@use "./MovieList.styles.scss" as *;
</style>
