<template>
  <div class="view-journal">
    <h1 class="subtitle">Journal</h1>
    <div class="field">
      <div class="control">
        <input
          type="text"
          class="input"
          v-model="search"
          placeholder="Filter by group name..."
        />
      </div>
    </div>
    <button class="button is-small is-success" @click="sortBy()">
      Sort
    </button>
    <table class="table is-striped is-narrow ">
      <thead>
        <tr>
          <th>Date</th>
          <th>Group name</th>
          <th>Children in group</th>
          <th>Children attended</th>
          <th>Distance(km)</th>
          <th>Extra info</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody v-for="(journal, index) in filteredList" :key="index">
        <tr v-bind="journal in journals" :key="journal.id">
          <td>{{ journal.date }}</td>
          <td>{{ journal.gname }}</td>
          <td>{{ journal.children }}</td>
          <td>{{ journal.attended }}</td>
          <td>{{ journal.distance + "km" }}</td>
          <td>{{ journal.extra }}</td>
          <td>
            <a
              class="button is-small is-danger"
              @click="deleteJournal(journal.id, index)"
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

export default {
  name: "ViewJournal",
  data() {
    return {
      journals: [],
      search: "",
    };
  },
  computed: {
    filteredList() {
      return this.journals.filter((journal) => {
        return journal.gname.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    deleteJournal(id, index) {
      firebase
        .firestore()
        .collection("journal")
        .doc(id)
        .delete()
        .then(() => {
          this.journals.splice(index, 1);
        });
    },
    sortBy() {
      let assending = false;
      this.journals = this.journals.sort((x, y) => {
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
      .collection("journal")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          this.journals.push({
            gname: doc.data().selectedGroup.gname,
            distance: doc.data().selectedGroup.distance,
            children: doc.data().selectedGroup.children,
            id: doc.id,
            date: doc.data().date,
            attended: doc.data().childrenattended,
            extra: doc.data().extra,
          });
        })
      );
  },
};
</script>

<style scoped>
table > tbody > tr > td:last-child {
  text-align: center;
}

input {
  max-width: 30%;
}

input:focus {
  background-color: rgb(198, 237, 250);
}
</style>
