<script lang="ts" setup>
const thumbnailInput = ref<HTMLInputElement>();
const movieInput = ref<HTMLInputElement>();

let timeout: NodeJS.Timeout;

const artists = useState<string[]>("artist-list", () => []);
const genres = useState<string[]>("genre-list", () => []);

const thumbnail_base64 = useState<string>("thumbnail", () => "");
const video_base64 = useState<string>("video", () => "");

const handleMultipleInput = (currentVal: string, key: string) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const separatorRegex = new RegExp(
      "(?<=^|,)\s*([a-zA-Z0-9._]+(?:[a-zA-Z0-9-_]+)?)",
      "g"
    );

    if (key === "genre") genres.value = currentVal.match(separatorRegex) || [];
    else artists.value = currentVal.match(separatorRegex) || [];
  }, 300);
};

const removeMultipleInput = (key: string, index: number) => {
  if (key === "genre") {
    const filteredGenres = [...genres.value];
    filteredGenres.splice(index, 1);

    handleMultipleInput(filteredGenres.join(","), "genre");
    genres.value = filteredGenres;
  } else {
    const filteredArtists = [...artists.value];
    filteredArtists.splice(index, 1);

    handleMultipleInput(filteredArtists.join(","), "artist");
    artists.value = filteredArtists;
  }
};

const base64Converter = async (file: File) => {
  const data = await new Promise<string>((resolve, reject) => {
    const fr = new FileReader();

    fr.onloadend = function () {
      resolve(fr.result as string);
    };

    fr.onerror = function () {
      reject();
    };

    fr.readAsDataURL(file);
  });

  return data;
};

const handleThumbnailChange = async (e: Event) => {
  const el = e.target as HTMLInputElement;
  if (el.files) thumbnail_base64.value = await base64Converter(el.files[0]);
};

const handleVideoChange = async (e: Event) => {
  const el = e.target as HTMLInputElement;
  if (el.files) video_base64.value = await base64Converter(el.files[0]);
};

const handleCreateMovie = async (e: Event) => {
  e.preventDefault();

  const el = e.target as HTMLFormElement;

  const fd = new FormData(el);

  const thumbnail = await base64Converter(fd.get("thumbnail") as File);
  const watch_url = await base64Converter(fd.get("movie") as File);

  await $fetch("/api/movies", {
    method: "POST",
    body: JSON.stringify({
      title: fd.get("title"),
      description: fd.get("description"),
      duration: fd.get("duration"),
      artists: artists.value,
      genres: genres.value,
      thumbnail,
      watch_url,
      watched_by: [],
      views: 0,
      user_ratings: [{ name: "", rating: 0 }],
      total_ratings: 0,
    }),
  });
};
</script>

<template>
  <main class="Cms">
    <section class="Cms__movies">
      <ul>
        <li>
          <div></div>
        </li>
      </ul>

      <form
        class="Cms__form"
        @submit="handleCreateMovie"
        enctype="multipart/form-data"
      >
        <input type="text" placeholder="Title" name="title" />
        <textarea id="" placeholder="Description" name="description"></textarea>
        <input type="text" placeholder="Duration" name="duration" />
        <div class="Form__multiple">
          <input
            type="text"
            @input="($event) => {
              handleMultipleInput(($event.target as HTMLInputElement).value, 'artist')
            }"
            placeholder="Artists Name (separate by comma)"
          />

          <div>
            <button
              type="button"
              v-for="(artist, idx) in artists"
              :key="artist + idx"
              @click="() => removeMultipleInput('artist', idx)"
            >
              <span>{{ artist }}</span>
              <IconTimes />
            </button>
          </div>
        </div>

        <div class="Form__multiple">
          <input
            type="text"
            placeholder="Genres (separate by comma)"
            @input="($event) => {
              handleMultipleInput(($event.target as HTMLInputElement).value, 'genre')
            }"
          />

          <div>
            <button
              type="button"
              v-for="(genre, idx) in genres"
              :key="genre + idx"
              @click="() => removeMultipleInput('genre', idx)"
            >
              <span>{{ genre }}</span>
              <IconTimes />
            </button>
          </div>
        </div>

        <div class="Form__grouped">
          <input
            ref="thumbnailInput"
            name="thumbnail"
            type="file"
            accept=".jpg, .jpeg, .png"
            @change="handleThumbnailChange"
          />
          <input
            ref="movieInput"
            name="movie"
            type="file"
            accept=".mp4"
            @change="handleVideoChange"
          />

          <div
            role="button"
            @click="thumbnailInput?.click()"
            class="Form__file Form__file--thumbnail"
          >
            <img v-if="thumbnail_base64" :src="thumbnail_base64" />
            <IconPlus />
            <span>Add Thumbnail</span>
          </div>

          <div
            role="button"
            @click="movieInput?.click()"
            class="Form__file Form__file--video"
          >
            <video v-if="video_base64" controls>
              <source :src="video_base64" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <IconPlus />
            <span>Add Movie</span>
          </div>
        </div>

        <button class="Form__sumbit" type="submit">Create Movie</button>
      </form>
    </section>

    <MovieList
      title="MOST VIEWED MOVIES"
      description="The top picks that are breaking viewership records."
      with-search
    />
  </main>
</template>

<style lang="scss">
@use "./Cms.style.scss" as *;
</style>
