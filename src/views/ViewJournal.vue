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
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="center"><a class="delete is-medium"></a></td>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ViewJournal",
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
