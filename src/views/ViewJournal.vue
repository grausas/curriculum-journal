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
      Sort by date
    </button>
    <table class="table is-striped is-narrow">
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
      <tbody>
        <tr
          v-for="(journal, index) in filteredList"
          :key="index"
          v-bind="journal in journals"
        >
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
      this.journals.sort((x, y) => {
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
      )
      .then(() => {
        this.journals.sort((a, b) => (a.gname > b.gname ? -1 : 1));
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

input {
  width: 100%;
  max-width: 30%;
}

input:focus {
  background-color: rgb(198, 237, 250);
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
    content: "Date:";
  }
  td:nth-of-type(2):before {
    content: "Group name:";
  }
  td:nth-of-type(3):before {
    content: "Children in group:";
  }
  td:nth-of-type(4):before {
    content: "Children attended:";
  }
  td:nth-of-type(5):before {
    content: "Distance(km):";
  }
  td:nth-of-type(6):before {
    content: "Extra info:";
  }
  td:nth-of-type(7):before {
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
