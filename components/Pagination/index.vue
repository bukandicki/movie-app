<script lang="ts" setup>
const props = defineProps<{
  current: number;
  visible: number;
  total_pages: number;
}>();

const emit = defineEmits<{ pageChanged: [value: number] }>();

const visiblePages = computed(() => {
  const halfVisible = Math.floor(props.visible / 2);
  let start = Math.max(props.current - halfVisible, 1);
  let end = Math.min(start + props.visible - 1, props.total_pages);

  if (end - start + 1 < props.visible) {
    start = Math.max(end - props.visible + 1, 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const onPageChange = (page: number) => {
  if (page >= 1 && page <= props.total_pages) emit("pageChanged", page);
};
</script>

<template>
  <nav class="Pagination">
    <ul class="Pagination__wrapper">
      <li>
        <button
          @click="onPageChange(current - 1)"
          :disabled="current === 1"
          :class="[
            'Pagination__navigation',
            { 'Pagination__navigation--disabled': current === 1 },
          ]"
        >
          <IconChevronLeft />
        </button>
      </li>
      <li class="Pagination__pages" v-for="page in visiblePages" :key="page">
        <button
          @click="onPageChange(page)"
          :data-active="page === current"
          class="Pagination__page-btn"
        >
          {{ page }}
        </button>
      </li>
      <li>
        <button
          @click="onPageChange(current + 1)"
          :disabled="current === total_pages"
          :class="[
            'Pagination__navigation',
            { 'Pagination__navigation--disabled': current === total_pages },
          ]"
        >
          <IconChevronRight />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use "./Pagination.styles.scss" as *;
</style>
