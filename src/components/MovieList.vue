<template>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Nominations</th>
        <th>Wins</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="movie in movies" :key="movie.id">
        <td>{{movie.title}}</td>
        <td>{{movie.year}}</td>
        <td>{{movie.nominations}}</td>
        <td>{{movie.wins}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "movie-list",
  data() {
    return {
      movies: []
    }
  },
  created() {
    fetch("http://localhost:3000/movies")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.movies = data;
      })
  }
}
</script>

<style scoped>

</style>