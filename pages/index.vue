<script lang="ts" setup></script>

<template>
  <main class="Home">
    <section class="Home__hero">
      <NuxtImg
        class="Hero__img"
        src="/images/movies/peakpx.jpg"
        preload
        format="webp"
        alt=""
        sizes=""
      />

      <div class="Hero__awards"></div>

      <div class="Hero__detail">
        <div class="Hero__information">
          <h1 class="Hero__title"></h1>

          <p class="Hero__description"></p>
        </div>

        <div class="Hero__galeries"></div>
      </div>
    </section>

    <section class="Home__voted">
      <div class="Voted__headline">
        <h2>VOTED MOVIES</h2>

        <p>The movies that stole the spotlight!</p>
      </div>

      <ul class="VotedMovies">
        <li class="VotedMovies__item">
          <LazyMovieCard />
        </li>
      </ul>
    </section>

    <section class="Home__movies">
      <ul class="Movies">
        <li class="Movies__item">
          <LazyMovieCard />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss">
@use "./Home.styles.scss" as *;
</style>
