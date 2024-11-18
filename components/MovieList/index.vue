<script lang="ts" setup>
import type { API_RESPONSE_TYPE, MOVIE_TYPE } from "~/lib/types";

defineProps<{
  data: API_RESPONSE_TYPE<MOVIE_TYPE[]>;
  title: string;
  description: string;
  currentPage: number;
  withSearch?: boolean;
}>();

const emit = defineEmits<{
  onSearch: [value: string];
  pageChanged: [value: number];
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
        <input
          type="text"
          placeholder="Search movies..."
          @input="($event) => emit('onSearch', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </div>

    <ul class="MovieList__lists">
      <li v-for="movie in data.data" :key="movie.id" class="MovieList__item">
        <MovieCard :data="movie" />
      </li>
    </ul>

    <Pagination
      @page-changed="emit('pageChanged', $event)"
      :current="currentPage"
      :total_pages="(data.total_pages as number)"
      :visible="5"
    />
  </section>
</template>

<style lang="scss">
@use "./MovieList.styles.scss" as *;
</style>
