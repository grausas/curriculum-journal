<template>
  <div class="fill-journal ">
    <div class="container">
      <h1 class="subtitle">Fill Group</h1>
      <form>
        <div class="field">
          <label class="label">Group name: </label>
          <div class="control">
            <div class="select">
              <select>
                <option>Select Group</option>
                <option>Example 1</option>
                <option>Example 2</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">Date: </label>
          <div class="control">
            <input class="input" type="date" placeholder="Date" />
          </div>
        </div>

        <div class="field">
          <label class="label">Children attended:</label>
          <div class="control">
            <input
              class="input"
              type="number"
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
            >
            </textarea>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button class="button is-success">
              <span>Fill Journal</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "FillJournal",
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
