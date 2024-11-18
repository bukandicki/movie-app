<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

const movieStore = useMovieStore();
const userStore = useUserStore();

const { result: slide_space } = useCalc("slide-space", 40);
const { result: slide_offset } = useCalc("slide-offset", 112);

await useAsyncData("fetch_movies", () => movieStore.FETCH_MOVIES(), {
  watch: [movieStore.movie_filter],
});

const handleSearchMovies = (value: string) => {
  movieStore.movie_filter.page = 1;
  movieStore.movie_filter.limit = 10;
  movieStore.movie_filter.search = value;
};
</script>

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

      <div class="container Hero__detail">
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

            <button type="button" class="Gallery__watch">
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

    <section class="Home__voted" v-if="userStore.user">
      <div class="Voted__headline">
        <h2>VOTED MOVIES</h2>

        <p>
          Discover the top-rated movies handpicked by viewers like you. Dive
          into stories that have captured hearts and imaginations.
        </p>
      </div>

      <ClientOnly>
        <swiper
          :space-between="slide_space"
          :slides-offset-after="slide_offset"
          slides-per-view="auto"
          class="VotedMovies"
        >
          <swiper-slide
            v-for="movie in movieStore.movies.data.filter((movie) =>
              userStore.user?.voted_movies.some(
                (voted) => voted.movie_id === movie.id
              )
            )"
            :key="movie.id"
            class="VotedMovies__item"
          >
            <MovieCard :data="movie" />
          </swiper-slide>
        </swiper>
      </ClientOnly>
    </section>

    <section class="Home__recently" v-if="userStore.user">
      <div class="container Recently__headline">
        <h2>RECENTLY WATCHED</h2>

        <p>Catch up on the movies you’ve just seen and relive the moments.</p>
      </div>

      <ClientOnly>
        <swiper
          :space-between="slide_space"
          :slides-offset-before="slide_offset"
          slides-per-view="auto"
          class="VotedMovies"
        >
          <swiper-slide
            v-for="movie in movieStore.movies.data.filter((movie) =>
              userStore.user?.last_views.includes(movie.id)
            )"
            :key="movie.id"
            class="VotedMovies__item"
          >
            <MovieCard :data="movie" />
          </swiper-slide>
        </swiper>
      </ClientOnly>
    </section>

    <MovieList
      title="FEATURED FILMS"
      description="Browse through an extensive collection of films, from iconic
          masterpieces to hidden gems, guaranteed to leave a lasting impression."
      with-search
      :data="movieStore.movies"
      :current-page="movieStore.movie_filter.page"
      @page-changed="movieStore.movie_filter.page = $event"
      @on-search="handleSearchMovies"
    />
  </main>
</template>

<style lang="scss">
@use "./Home.styles.scss" as *;
</style>
