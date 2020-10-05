<template>
  <div class="login">
    <h2 class="subtitle">Sign in with email</h2>
    <Notification
      v-if="error"
      v-on:close="error = false"
      type="is-danger"
      :message="errorMessage"
    />
    <form v-on:submit.prevent="login">
      <div class="field">
        <label class="label">Email:</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder="mail@mail.com"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password:</label>
        <div class="control has-icons-left">
          <input
            class="input"
            v-model="password"
            type="password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button
            class="button is-primary"
            :class="loading && 'is-loading'"
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Notification from "../components/Notification";

export default {
  name: "Login",
  components: { Notification },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => this.$router.push("/viewjournal"),
          (error) => {
            this.error = true;
            this.errorMessage = error.message;
            this.loading = false;
          }
        );
    },
  },
};
</script>
<style scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

form {
  width: 30%;
  border: 1px solid rgba(0, 0, 0, 0.24);
  padding: 20px;
  border-radius: 20px;
}

form > .field:last-child {
  text-align: center;
}

@media only screen and (max-width: 850px) {
  form {
    width: 80%;
  }
}
</style>
