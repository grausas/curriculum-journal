<template>
  <div class="fill-journal ">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />
    <div class="container">
      <h1 class="subtitle">Fill Group</h1>
      <form v-on:submit.prevent="filljournal">
        <div class="field">
          <label class="label">Group name: </label>
          <div class="control">
            <div class="select">
              <select v-model="selectedGroup">
                <option value="" disabled>Select group</option>
                <option
                  v-for="groupList in groupsList"
                  :key="groupList.id"
                  :value="groupList"
                >
                  {{ groupList.gname }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Date: </label>
          <div class="control">
            <input
              class="input"
              type="date"
              v-model="date"
              placeholder="Date"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Children attended:</label>
          <div class="control">
            <input
              class="input"
              type="number"
              v-model="childrenattended"
              placeholder="Children attended"
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Extra info:</label>
          <div class="control">
            <textarea
              class="textarea has-fixed-size"
              placeholder="Extra info..."
              rows="2"
              v-model="extra"
            >
            </textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success" :class="loading && 'is-loading'">
              <span>Fill Journal</span>
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
  name: "FillJournal",
  components: { Notification },
  data() {
    return {
      selectedGroup: "",
      date: new Date().toISOString().substr(0, 10),
      childrenattended: "",
      extra: "",
      groupsList: [],
      error: false,
      errorType: "",
      errorMessage: "",
      loading: false,
    };
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.groupsList.push({
            id: doc.id,
            gname: doc.data().gname,
            children: doc.data().children,
            distance: doc.data().distance,
          });
        });
      });
  },
  methods: {
    filljournal() {
      firebase
        .firestore()
        .collection("journal")
        .add({
          selectedGroup: this.selectedGroup,
          childrenattended: this.childrenattended,
          date: this.date,
          extra: this.extra,
        })
        .then(
          () => {
            this.loading = false;
            this.error = true;
            this.errorType = "is-success";
            this.errorMessage = "You have successfully filled a group";
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
