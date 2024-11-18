<script lang="ts" setup>
const movieStore = useMovieStore();
const userStore = useUserStore();

const route = useRoute();

const videoRef = ref<HTMLVideoElement>();

const star_index = useState<number>("star_index", () => -1);
const selected_rating = useState<number>("selected_rating", () => -1);
const video_state = useState<"played" | "paused" | "idle">(
  "video_state",
  () => "idle"
);

const movie_id = parseInt(route.params.id as string);

const { refresh } = await useAsyncData("movie_detail", () =>
  movieStore.FETCH_MOVIE_DETAIL(movie_id)
);

watch(video_state, async () => {
  await nextTick();
  const video_el = videoRef.value;

  video_el?.play();
  video_el?.requestFullscreen();

  if (userStore.user) {
    userStore.UPDATE_USER(userStore.user.id as number, {
      last_views: [...userStore.user.last_views, movie_id],
    });
  }
});

const userVote = computed(() => {
  if (userStore.user) {
    return userStore.user.voted_movies.find(
      (vote) => vote.movie_id === movie_id
    );
  }

  return null;
});

const handleUserVote = async (type: "add" | "remove") => {
  if (!userStore.user || !movieStore.movie_detail) return;

  if (type === "add" && selected_rating.value > -1) {
    userStore.UPDATE_USER(userStore.user.id, {
      voted_movies: [
        ...userStore.user.voted_movies,
        {
          movie_id,
          rating: selected_rating.value,
        },
      ],
    });
    movieStore.UPDATE_MOVIE(movie_id, {
      user_ratings: [
        ...movieStore.movie_detail.user_ratings,
        { id: userStore.user.id, rating: selected_rating.value },
      ],
    });
  } else {
    userStore.UPDATE_USER(userStore.user.id, {
      voted_movies: userStore.user.voted_movies.filter(
        (vote) => vote.movie_id !== movie_id
      ),
    });
    movieStore.UPDATE_MOVIE(movie_id, {
      user_ratings: movieStore.movie_detail.user_ratings.filter(
        (user) => user.id !== userStore.user?.id
      ),
    });
  }

  selected_rating.value = -1;
  await refresh();
};

onBeforeUnmount(() => {
  video_state.value = "idle";
});
</script>

<template>
  <main class="container MovieDetail">
    <section class="MovieDetail__display">
      <h1 class="Display__title">{{ movieStore.movie_detail?.title }}</h1>
      <p class="Display__description">
        {{ movieStore.movie_detail?.description }}
      </p>

      <div class="Display__detail">
        <span
          ><LazyIconStar /> {{ movieStore.movie_detail?.total_ratings }}</span
        >
        <span><LazyIconEye /> {{ movieStore.movie_detail?.views }}</span>
        <span><LazyIconClock /> {{ movieStore.movie_detail?.duration }}</span>

        <div class="Vote" v-if="userStore.user">
          <div class="Vote__stars" @mouseleave="star_index = -1">
            <strong>Vote this movie</strong>

            <button
              type="button"
              class="Vote__star-btn"
              @mouseenter="star_index = i"
              @click="selected_rating = i"
              v-for="i in 5"
              :key="i"
              :data-selected="
                star_index >= i ||
                (!userVote ? selected_rating >= i : userVote.rating >= i)
              "
            >
              <LazyIconStar />
            </button>
          </div>

          <button
            v-if="!userVote"
            type="button"
            @click="() => handleUserVote('add')"
            class="Vote__submit"
          >
            VOTE
          </button>
          <button
            v-else
            type="button"
            @click="() => handleUserVote('remove')"
            class="Vote__cancel"
          >
            CANCEL VOTE
          </button>
        </div>
      </div>

      <div class="Display__thumbnail">
        <div v-if="video_state === 'idle'">
          <LazyNuxtImg
            class="Display__img"
            :src="movieStore.movie_detail?.thumbnail"
            preload
            format="webp"
            alt=""
            sizes="100vw lg:720px 2xl:1024px"
          />

          <button
            type="button"
            @click="video_state = 'played'"
            class="Display__play"
          >
            <LazyIconPlay />
          </button>
        </div>

        <video ref="videoRef" class="Display__video" v-else controls>
          <source :src="movieStore.movie_detail?.watch_url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@use "./Movies.styles.scss" as *;
</style>
