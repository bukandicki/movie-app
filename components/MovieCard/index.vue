<script lang="ts" setup></script>

<template>
  <NuxtLink href="/movies/1" class="MovieCard">
    <NuxtImg
      class="MovieCard__img"
      src="/images/movies/sample2.jpg"
      alt=""
      preload
      format="webp"
      sizes="100vw lg:480px 2xl:720px"
    />

    <h3 class="MovieCard__title">Ghostbusters: Frozen Empire Ghostbusters</h3>

    <div class="MovieCard__details">
      <span class="MovieCard__rating"><IconStar /> 4.2</span>

      <div>
        <span class="MovieCard__viewers"><IconEye /> 2</span>
        <span class="MovieCard__duration"><IconClock /> 2h 30m</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
@use "./MovieCard.styles.scss" as *;
</style>
