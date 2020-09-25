<template>
  <div class="view-groups">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />
    <h1 class="subtitle">View Groups</h1>
    <button class="button is-small is-success" @click="sortBy()">
      Sort
    </button>
    <table class="table is-striped is-narrow ">
      <thead>
        <tr>
          <th>Group Name</th>
          <th>Children in group</th>
          <th>Distance km</th>
          <th>Edit Group</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(group, index) in groups" :key="group.id">
          <td>
            {{ group.gname }}
          </td>
          <td>
            {{ group.children }}
          </td>
          <td>{{ group.distance + "km" }}</td>
          <td>
            <router-link
              class="button is-small is-success"
              :to="/editgroup/ + group.id"
              >Edit</router-link
            >
          </td>
          <td>
            <a
              class="button is-small is-danger"
              @click="deleteGroup(group.id, index)"
              >Delete</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import Notification from "../components/Notification";

export default {
  name: "ViewGroups",
  components: { Notification },
  data() {
    return {
      groups: [],
      gname: "",
      children: "",
      distance: "",
      error: false,
      errorType: "",
      errorMessage: "",
    };
  },
  methods: {
    deleteGroup(id, index) {
      this.groups.splice(index, 1);
      firebase
        .firestore()
        .collection("groups")
        .doc(id)
        .delete();
    },
    sortBy() {
      let assending = false;
      this.groups = this.groups.sort((x, y) => {
        let a = x.gname.toLowerCase();
        let b = y.gname.toLowerCase();
        if (assending) {
          return a > b ? 1 : -1;
        } else {
          return a > b ? -1 : 1;
        }
      });
      console.log(assending);

      assending = !assending;
    },
  },
  beforeMount() {
    firebase
      .firestore()
      .collection("groups")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) =>
          this.groups.push({
            id: doc.id,
            gname: doc.data().gname,
            children: doc.data().children,
            distance: doc.data().distance,
          })
        )
      );
  },
};
</script>

<style scoped>
table > tbody > tr > td:last-child {
  text-align: center;
}
form {
  margin: 0 auto;
}
.field {
  width: 50%;
}
</style>
