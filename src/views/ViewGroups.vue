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
          <th>Children in groups</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.id">
          <td>
            {{ group.gname }}
          </td>
          <td>
            {{ group.children }}
          </td>
          <td>
            {{ group.distance }}
          </td>
          <!-- <td>
            <router-link :to="/editstudent/ + group.id">Edit</router-link>
          </td> -->
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
  beforeMount() {
    //   firebase
    //     .firestore()
    //     .collection("groups")
    //     .doc(this.$route.params.id)
    //     .get()
    //     .then((doc) => {
    //       this.gname = doc.data().gname;
    //       this.children = doc.data().children;
    //       this.distance = doc.data().distance;
    //     });
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
  // methods: {
  //   editGroup() {
  //     firebase
  //       .firestore()
  //       .collection("groups")
  //       .doc(this.$route.params.id)
  //       .set({
  //         gname: this.gname,
  //         children: this.children,
  //         distance: this.distance,
  //       })
  //       .then(
  //         () => {
  //           this.error = true;
  //           this.errorType = "is-success";
  //           this.errorMessage = "You have successfully added a group";
  //         },
  //         (error) => {
  //           this.error = true;
  //           this.errorType = "is-danger";
  //           this.errorMessage = error.message;
  //         }
  //       );
  //   },
  // },
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
