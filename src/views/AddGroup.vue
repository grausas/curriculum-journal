<template>
  <div class="add-group ">
    <div class="container">
      <h1 class="subtitle">Add Group</h1>
      <form>
        <div class="field">
          <label class="label">Group name: </label>
          <div class="control">
            <input class="input " type="text" placeholder="Group name" />
          </div>
        </div>

        <div class="field">
          <label class="label">Children in group: </label>
          <div class="control">
            <input class="input" type="number" placeholder="Childrens" />
          </div>
        </div>

        <div class="field">
          <label class="label">Distance to group: </label>
          <div class="control">
            <input class="input" type="number" placeholder="Distance (km)" />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success">
              <span>Add Group</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddGroup",
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
