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
      this.groups.sort((x, y) => {
        let a = x.gname.toLowerCase();
        let b = y.gname.toLowerCase();
        if (assending) {
          return a < b ? 1 : -1;
        } else {
          return a < b ? -1 : 1;
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
      )
      .then(() => {
        this.groups.sort((a, b) => (a.gname > b.gname ? -1 : 1));
      });
  },
};
</script>

<style scoped>
table {
  margin-top: 10px;
}

table > tbody > tr > td:last-child {
  text-align: center;
}
form {
  margin: 0 auto;
}
.field {
  max-width: 50%;
}
@media only screen and (max-width: 850px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    border: 1px solid #ccc;
  }
  td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 200px;
    margin-left: 150px;
  }
  td:before {
    position: absolute;
    left: 6px;
    width: 200px;
    padding-right: 40px;
    white-space: nowrap;
    margin-left: -150px;
  }
  td:nth-of-type(1):before {
    content: "Group Name:";
  }
  td:nth-of-type(2):before {
    content: "Children in group:";
  }
  td:nth-of-type(3):before {
    content: "Distance(km):";
  }
  td:nth-of-type(4):before {
    content: "Edit Group:";
  }
  td:nth-of-type(5):before {
    content: "Delete:";
  }

  table > tbody > tr > td:last-child {
    text-align: left;
    column-span: all;
  }

  table > thead > tr > th:last-child {
    text-align: left;
  }

  input {
    max-width: 100%;
  }
}
</style>
