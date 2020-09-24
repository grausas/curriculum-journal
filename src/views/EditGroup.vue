<template>
  <div class="edit-group ">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />
    <div class="container">
      <h1 class="subtitle">Edit Group</h1>
      <form v-on:submit.prevent="editGroup()">
        <div class="field">
          <label class="label">Group name: </label>
          <div class="control">
            <input
              class="input "
              id="gname"
              type="text"
              v-model="gname"
              placeholder="Group name"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Children in group: </label>
          <div class="control">
            <input
              class="input"
              id="children"
              type="number"
              v-model="children"
              placeholder="Childrens"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Distance: </label>
          <div class="control">
            <input
              class="input"
              id="distance"
              type="number"
              v-model="distance"
              placeholder="Distance"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button
              class="button is-success"
              :class="loading && 'is-loading'"
              type="submit"
            >
              <span>Edit Group</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../components/Notification";

export default {
  name: "AddGroup",
  components: { Notification },
  data() {
    return {
      gname: "",
      children: "",
      distance: "",
      error: false,
      errorType: "",
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    editGroup() {
      firebase
        .firestore()
        .collection("groups")
        .doc(this.$route.params.id)
        .set({
          gname: this.gname,
          children: this.children,
          distance: this.distance,
        })
        .then(
          () => {
            this.loading = false;
            this.error = true;
            this.errorType = "is-success";
            this.errorMessage = "You have successfully edited a group";
          },
          (error) => {
            this.error = true;
            this.errorType = "is-danger";
            this.errorMessage = error.message;
            this.loading = false;
          }
        );
    },
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        this.gname = doc.data().gname;
        this.children = doc.data().children;
        this.distance = doc.data().distance;
      });
  },
};
</script>

<style scoped>
form {
  margin: 0 auto;
}
.field {
  width: 50%;
}
</style>
