<template>
  <div id="app">
    <hello-world/>
    <movie-list/>
  </div>
</template>

<script>
import MovieList from "@/components/MovieList";
import "bootstrap/dist/css/bootstrap.css"

export default {
  name: 'App',
  components: {
    MovieList
  }
};
</script>

