<template>
  <div class="overflow-auto">

    <div class="w-25 p-1" style="margin-top:5px">
      <b-form-input v-model="title" type="text" placeholder="Enter the movie title"></b-form-input>
      <div class="mt-2"></div>
      <b-form-input v-model="year" type="number" placeholder="Enter the year it was made"></b-form-input>
      <div class="mt-2"></div>
      <b-form-input v-model="nominations" type="number" placeholder="Enter how many nominations it got"></b-form-input>
      <div class="mt-2"></div>
      <b-form-input v-model="wins" type="number" placeholder="Enter how many wins it got"></b-form-input>
      <div class="mt-2"></div>
      <b-button v-on:click="addMovie" pill variant="success">Add a movie</b-button>
      <div class="mt-2"></div>
      <b-form-input v-model="id" type="number" placeholder="Movie Id"></b-form-input>
      <div class="mt-2"></div>
      <b-button v-on:click="deleteMovie" pill variant="danger">Delete</b-button>
    </div>
    <div class="w-50 p-3" style="margin-top:5px">

    <b-table bordered striped hover
        id="my-table"
        :items="movies"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        default>
    </b-table>
  </div>


    <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
    ></b-pagination>

  </div>
</template>

<script>
import axios from "axios";

const baseURL = "http://localhost:3000/movies/";

export default {
  name: "movie-list",
  data() {
    return {
      fields: [
        {
          key: 'id'
        },
        {
          key: 'title',
          sortable: true
        },
        {
          key: 'year',
          sortable: true
        },
        {
          key: 'nominations',
          sortable: true,
          // variant: 'danger'
        },
        {
          key: "wins",
          sortable: true,
        }
      ],
      perPage: 10,
      currentPage: 1,
      movies: [],
      title: "",
      year: "",
      nominations: "",
      wins: "",
      id: "",
    }
  },
  async created() {
    try {
      const res = await axios.get(baseURL);

      this.movies = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  computed: {
    rows() {
      return this.movies.length
    }
  },
  methods: {
    async addMovie() {
      const res = await axios.post(baseURL, {
        title: this.title,
        year: this.year,
        nominations: this.nominations,
        wins: this.wins
      });

      this.movies = [...this.movies, res.data];

      this.movies = "";
      this.title = "";
      this.year = "";
      this.nominations = "";
      this.wins = "";
    },
    async deleteMovie() {
      await axios.delete(baseURL + this.id);
      this.id = "";
      this.created();
    }
  }
};
</script>

<style scoped>

</style>