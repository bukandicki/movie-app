<script lang="ts" setup>
const videoRef = ref<HTMLVideoElement>();

const video_state = useState<"played" | "paused" | "idle">(
  "video_state",
  () => "idle"
);
const star_index = useState<number>("star_index", () => -1);
const selected_rating = useState<number>("selected_rating", () => -1);

watch(video_state, async () => {
  await nextTick();
  const video_el = videoRef.value;

  video_el?.play();
  video_el?.requestFullscreen();
});
</script>

<template>
  <main class="container MovieDetail">
    <section class="MovieDetail__display">
      <h1 class="Display__title">The Shawshank Redemption</h1>
      <p class="Display__description">
        Peter Parker has finally managed to piece together the once-broken parts
        of his life, maintaining a balance between his relationship with
        Mary-Jane and his responsibility as Spider-Man. But more challenges
        arise for our young hero. Peter's old friend Harry Osborn has set out
        for revenge against Peter; taking up the mantle of his late father's
        persona as The New Goblin, and Peter must also capture Uncle Ben's real
        killer, Flint Marko, who has been transformed into his toughest foe yet,
        the Sandman. All hope seems lost when suddenly Peter's suit turns
        jet-black and greatly amplifies his powers. But it also begins to
        greatly amplify the much darker qualities of Peter's personality that he
        begins to lose himself to. Peter has to reach deep inside himself to
        free the compassionate hero he used to be if he is to ever conquer the
        darkness within and face not only his greatest enemies.
      </p>

      <div class="Display__detail">
        <span><LazyIconStar /> 4.2</span>
        <span><LazyIconEye /> 200</span>
        <span><LazyIconClock /> 2h 32m</span>

        <div class="Vote">
          <div class="Vote__stars" @mouseleave="star_index = -1">
            <strong>Vote this movie</strong>

            <button
              class="Vote__star-btn"
              @mouseenter="star_index = i"
              @click="selected_rating = i"
              v-for="i in 5"
              :key="i"
              :data-selected="star_index >= i || selected_rating >= i"
            >
              <LazyIconStar />
            </button>
          </div>

          <button class="Vote__submit">VOTE</button>
          <button class="Vote__cancel">CANCEL VOTE</button>
        </div>
      </div>

      <div class="Display__thumbnail">
        <div v-if="video_state === 'idle'">
          <LazyNuxtImg
            class="Display__img"
            src="/images/movies/1356452.jpeg"
            preload
            format="webp"
            alt=""
            sizes="100vw lg:720px 2xl:1024px"
          />

          <button @click="video_state = 'played'" class="Display__play">
            <LazyIconPlay />
          </button>
        </div>

        <video ref="videoRef" class="Display__video" v-else controls>
          <source src="/movies/trailer1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@use "./Movies.styles.scss" as *;
</style>
