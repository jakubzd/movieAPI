<template>
  <div class="overflow-auto">

    <div class="w-25 p-1" style="margin-top:5px">
      <b-form-input v-model="title" type="text" placeholder="Enter the movie title" required ></b-form-input>
      <div class="mt-2"></div>
      <b-form-input v-model="year" type="number" placeholder="Enter the year it was made" required ></b-form-input>
      <div class="mt-2"></div>
      <b-form-input v-model="nominations" type="number" placeholder="Enter how many nominations it got" required ></b-form-input>
      <div class="mt-2"></div>
      <b-form-input v-model="wins" type="number" placeholder="Enter how many wins it got" required ></b-form-input>
      <div class="mt-2"></div>
      <b-button v-on:click="addMovie" pill variant="success">Add a movie</b-button>
      <b-button id="editButton" :disabled="isDisabled" v-on:click="editMovie" pill variant="success">Edit</b-button>
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
        selectable
        @row-clicked="onRowSelected"
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
        },
      ],
      perPage: 10,
      currentPage: 1,
      movies: [],
      title: "",
      year: "",
      nominations: "",
      wins: "",
      id: "",
      editable: false,
      selected: null,
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
    },
    isDisabled() {
      return !this.editable;
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
    async editMovie() {
      await this.editMovieInfo(this.selected);
    },
    async editMovieInfo(movie) {

      movie.title = this.title;
      movie.year = this.year;
      movie.nominations = this.nominations;
      movie.wins = this.wins;

      const res = await axios.put(baseURL + movie.id, {
        title: this.title,
        year: this.year,
        nominations: this.nominations,
        wins: this.wins
      });

      this.movies = [...this.movies, res.data];

      this.editable = !this.editable;
      this.title = "";
      this.year = "";
      this.nominations = "";
      this.wins = "";
    },
    async deleteMovie() {
      await axios.delete(baseURL + this.id)
        .then(() => {
          let z = this.movies.map(movies => movies.id).indexOf(this.id);
          this.movies.splice(z, 1);
        }).catch( error => {
          console.log(error);
          });
    },
    onRowSelected(movie) {
      console.log(movie.id)
      this.editable = !this.editable;
      this.selected = movie;
      this.title = movie.title;
      this.year = movie.year;
      this.nominations = movie.nominations;
      this.wins = movie.wins;
    },
  },
};
</script>

<style scoped>
  ::v-deep .sr-only{display:none !important}
</style>