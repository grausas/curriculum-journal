<template>
  <div class="view-journal">
    <h1 class="subtitle">Journal</h1>
    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
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
        <tr v-for="journal in journals" :key="journal.id">
          <td>{{ journal.date }}</td>
          <td>{{ journal.gname }}</td>
          <td>{{ journal.children }}</td>
          <td>{{ journal.attended }}</td>
          <td>{{ journal.distance }}</td>
          <td>{{ journal.extra }}</td>
          <td class="center"><a class="delete is-medium"></a></td>
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
    };
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
table > tbody > td:last-child {
  text-align: center;
}

a {
  background: green;
}
</style>
