<script lang="ts" setup>
import type { MOVIE_TYPE } from "~/lib/types";

defineProps<{ data: MOVIE_TYPE }>();
</script>

<template>
  <NuxtLink :href="`/movies/${data.id}`" class="MovieCard">
    <NuxtImg
      class="MovieCard__img"
      :src="data.thumbnail"
      alt=""
      preload
      format="webp"
      sizes="100vw lg:480px 2xl:720px"
    />

    <h3 class="MovieCard__title">{{ data.title }}</h3>

    <div class="MovieCard__details">
      <span class="MovieCard__rating"
        ><IconStar /> {{ data.total_ratings }}</span
      >

      <div>
        <span class="MovieCard__viewers"><IconEye /> {{ data.views }}</span>
        <span class="MovieCard__duration">
          <IconClock /> {{ data.duration }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
@use "./MovieCard.styles.scss" as *;
</style>
