<script lang="ts" setup></script>

<template>
  <main class="Home">
    <section class="Home__hero">
      <div class="Hero__img">
        <NuxtImg
          src="/images/movies/1356452.jpeg"
          preload
          format="webp"
          alt=""
          sizes="100vw lg:720px 2xl:1024px"
        />
      </div>

      <div class="Hero__detail">
        <div class="Hero__summary">
          <div class="Hero__information">
            <h1 class="Hero__title">Ghostbusters: Frozen Empire</h1>

            <p class="Hero__description">
              Peter Parker has finally managed to piece together the once-broken
              parts of his life, maintaining a balance between his relationship
              with Mary-Jane and his responsibility as Spider-Man.
            </p>
          </div>

          <div class="Hero__galeries">
            <div class="Gallery__display">
              <NuxtImg
                src="/images/movies/sample1.jpg"
                preload
                format="webp"
                alt=""
                sizes="100vw lg:480px"
              />

              <span>Peter Parker's Dead</span>
            </div>

            <button class="Gallery__watch">
              <span><IconPlay /></span>

              <span>
                <strong>WATCH MOVIE</strong>
                <span>2h 30m</span>
              </span>
            </button>
          </div>
        </div>

        <div class="Hero__awards">
          <div class="Awards__detail">
            <h2 class="Awards__counter">30</h2>
            <span class="Awards__name">Academy Awards</span>
          </div>

          <div class="Awards__detail">
            <h2 class="Awards__counter">122</h2>
            <span class="Awards__name">Academy Awards Nominations</span>
          </div>
        </div>
      </div>
    </section>

    <section class="Home__voted">
      <div class="Voted__headline">
        <h2>VOTED MOVIES</h2>

        <p>The movies that stole the spotlight!</p>
      </div>

      <ul class="VotedMovies">
        <li class="VotedMovies__item">
          <MovieCard />
        </li>
      </ul>
    </section>

    <section class="Home__movies">
      <ul class="Movies">
        <li class="Movies__item">
          <MovieCard />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="scss">
@use "./Home.styles.scss" as *;
</style>
