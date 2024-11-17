<script lang="ts" setup></script>

<template>
  <header class="Header">
    <div class="Header__brand">
      <strong>DMOVIES</strong>
    </div>

    <nav class="Header__nav">
      <ul>
        <li><NuxtLink href="/">MOVIES</NuxtLink></li>
      </ul>
    </nav>

    <div class="Header__search">
      <IconSearch />

      <input type="text" placeholder="Search Movies..." />
    </div>
  </header>
</template>

<style lang="scss">
@use "./HeaderComponent.styles.scss" as *;
</style>
