<template>
  <div class="grid__login">
    <h2 class="grid__login--title">Welcome to Chatty</h2>

    <form @submit.prevent="enterChat" class="grid__login--form">

      <label for="name" class="grid__login--form--label">Enter Your Username</label>
      <input type="text" name="name" v-model="name" class="grid__login--form--input" placeholder="Username" @keydown="feedback = null">

      <p v-if="feedback" class="grid__login--form--error">{{ feedback }}</p> <!--Output feedback if feedback is true-->
      <button class="grid__login--form--button" title="Enter Chatty"><i class="far fa-comments"></i></button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Welcome',
    data () {
      return {
        name: null,
        feedback: null,
      }
    },

    methods: {

      enterChat() {
        //Ako je korisnik unio ime u input polje
        if (this.name) {
          //Redirect to Chat component (name: 'Chat' from 'router/index.js')
          //name: this.name (name is reffered to props: ['name'] from Chat.vue)
          this.$router.push({ name: 'Chat', params: { name: this.name } });
        } else {
          this.feedback = 'You must enter the name to join.';
        }
      }
    }
  }
</script>

<style>
  .grid__login {
    grid-column: 2 / 3;
    grid-row: auto;
    justify-self: center;
    align-self: center;
    width: 60%;
    height: 400px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
    background-color: none;
  }

  .grid__login--title {
    width: 100%;
    font-size: 2em;
    font-weight: 500;
    text-align: center;
    color: teal;
  }

  .grid__login--form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  .grid__login--form--label {
    width: 100%;
    font-size: .8em;
    text-align: center;
    color: #777;
  }

  .grid__login--form--input {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #777;
    font-size: 1.5em;
    font-weight: 400;
    text-align: center;
    color: teal;
  }

  .grid__login--form--input:focus {
    border-color: teal;
  }

  .grid__login--form--input::placeholder {
    font-style: italic;
    color: teal;
  }

  .grid__login--form--error {
    width: 100%;
    font-size: .9em;
    text-align: center;
    color: crimson;
  }

  .grid__login--form--button {
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 50%;
    font-size: 1.5em;
    cursor: pointer;
    color: white;
    background-color: teal;
    animation: pulse 2s infinite;
  }

  .grid__login--form--button:focus {
    outline: none;
  }

  @keyframes pulse
  {
    0% {
        box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
    }

    100% {
        box-shadow: 0 0 0 25px rgba(0, 0, 0, 0);
    }
  }

  /*Media query for responsive designe*/
  @media only screen and (max-width: 425px), (max-width: 375px), (max-width: 320px) {
    #app {
      grid-template-columns: 1fr;
      grid-gap: 0;
    }

    .grid__login {
      grid-column: 1 / 2;
      width: 100%;
      height: 100%;
    }

    .grid__login--form {
      height: 100vh;
    }
  }

  @media only screen and (max-width: 768px), (max-width: 1024px) {
    .grid__login {
      width: 100%;
    }
  }
</style>
