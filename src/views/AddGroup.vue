<template>
  <div class="add-group ">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />
    <div class="container">
      <h1 class="subtitle">Add Group</h1>
      <form v-on:submit.prevent="addGroup">
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
          <label class="label">Distance to group: </label>
          <div class="control">
            <input
              class="input"
              id="distance"
              type="number"
              v-model="distance"
              placeholder="Distance (km)"
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
              <span>Add Group</span>
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
    addGroup() {
      firebase
        .firestore()
        .collection("groups")
        .add({
          gname: `${this.gname.charAt(0).toUpperCase() + this.gname.slice(1)}`,
          children: this.children,
          distance: this.distance,
        })
        .then(
          () => {
            this.loading = false;
            this.error = true;
            this.errorType = "is-success";
            this.errorMessage = "You have successfully added a group";
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
