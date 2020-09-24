<template>
  <div class="view-groups">
    <Notification
      v-if="error"
      v-on:close="error = false"
      :type="errorType"
      :message="errorMessage"
    />
    <h1 class="subtitle">View Groups</h1>
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
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
            <router-link :to="/editgroup/ + group.id">Edit</router-link>
          </td>
          <td>
            <a
              class="delete is-medium"
              @click="deleteGroup(group.id, index)"
            ></a>
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

.delete {
  background: red;
}
</style>
