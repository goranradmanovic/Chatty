<template>
  <div class="message">
    <form @submit.prevent="addMessage" class="message__form">
      <i class="far fa-comment-alt message__form--icon"></i>
      <span class="message__form--typingdots" ref="typing-indicator" :class="(isTyping) ? 'typing' : '' "><span>.</span><span>.</span><span>.</span></span>

      <input type="text" class="message__form--input" placeholder="Hello World ... (press enter)" v-model="newMessage" @keydown="detectUserTyping">

      <button class="message__form--btn">Submit</button>
    </form>

    <i class="far fa-smile-wink emojis__btn" @click="openEmojiModal"></i>

    <div class="emojis" v-if="emojiOpen">
      <p v-for="emoji in emojis" :value="emoji" @click="getEmoji($event)" class="emojis__item">{{ emoji | decodeURIString }}</p>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase/init';

  export default {
    name: 'NewMessage',
    props: ['name'],

    data () {
      return {
       newMessage: null,
       collectionObject: {},
       isTyping: false,
       emojis: ['&#x1F600;', '&#x1F601;', '&#x1F602;', '&#x1F923;', '&#x1F603;', '&#x1F604;', '&#x1F605;', '&#x1F606;', '&#x1F609;', '&#x1F60A;', '&#x1F60B;', '&#x1F60E;','&#x1F60D;', '&#x1F618;', '&#x1F617;', '&#x1F619;', '&#x1F61A;', '&#x1F642;', '&#x1F917;', '&#x1F914;', '&#x1F644;', '&#x1F60F;', '&#x1F634;', '&#x1F632;'],
       emojiOpen: false,
      }
    },

    filters: {
      //Decode emoji hexa string
			decodeURIString(str) {
				return he.decode(str); //Decode string from DB with html enteties to properly display on the page
			}
		},

    methods: {
      //Add message to DB
      addMessage() {
        //Collection object
        this.collectionObject = {
          name: this.name,
          message: this.newMessage,
          time: Date.now(),
        }

        //Add new message to the DB
        db.collection('messages').add(this.collectionObject);

        this.newMessage = '';
        //this.$el.reset(); //Reset the form
      },

      //Detect when user is typing
      detectUserTyping(event) {
        // intercept the keydown event

          // if the RETURN/ENTER key is pressed, send the message
          if (event.keyCode === 13) {
            this.isTyping = false;
          } else {
            // else send the Typing Indicator signal
            this.isTyping = true;
          }
      },

      //Get user selected emoji
      getEmoji(event) {
        this.newMessage += event.target.textContent;
      },

      //Open emoji modal
      openEmojiModal() {
        this.emojiOpen = !this.emojiOpen;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .message {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15% auto;
  }

  .message__form {
    width: 95%;
  }

  .message__form--icon {
    font-size: 1.5em;
    color: teal;
  }

  .message__form--input {
    width: 90%;
    padding: 3px;
    font-size: 1.5em;
    border: none;
    border-bottom: 1px solid #777;
    color: #333;
  }

  .message__form--input:focus {
    outline: none;
    border-color: teal;
  }

  .message__form--input::placeholder {
    font-style: italic;
    color: teal;
  }

  .message__form--btn {
    display: none;
    width: 100px;
    margin: 20px auto;
    font-size: 1.2em;
    border-color: teal;
    border-style: solid;
    color: teal;
    background-color: white;
  }

  .message__form--typingdots, .typing {
    display: inline-block;
    width: 25px;
    height: 10px;
    margin: 0;
    transform: translate(-26px, -9px);
    font-size: 1.4em;
    font-weight: 600;
    font-style: italic;
    color: teal;
  }

  .typing span {
    display: inline-block;
    max-height: 10px;
    /**
     * Use the blink animation, which is defined above
     */
    animation-name: blink;
    /**
     * The animation should take 1.4 seconds
     */
    animation-duration: 1.4s;
    /**
     * It will repeat itself forever
     */
    animation-iteration-count: infinite;
    /**
     * This makes sure that the starting style (opacity: .2)
     * of the animation is applied before the animation starts.
     * Otherwise we would see a short flash or would have
     * to set the default styling of the dots to the same
     * as the animation. Same applies for the ending styles.
     */
    animation-fill-mode: both;
  }

  .typing span:nth-child(2) {
    /**
     * Starts the animation of the third dot
     * with a delay of .2s, otherwise all dots
     * would animate at the same time
     */
    animation-delay: .2s;
  }

  .typing span:nth-child(3) {
    /**
     * Starts the animation of the third dot
     * with a delay of .4s, otherwise all dots
     * would animate at the same time
     */
    animation-delay: .4s;
  }


  .emojis__btn {
    font-size: 1.5em;
    cursor: pointer;
    color: teal;
    transition: transform 400ms ease-in-out;
  }

  .emojis__btn:hover {
    transform: scale(1.1);
  }

  .emojis {
    position: absolute;
    left: 75%;
    z-index: 10;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 150px;
    height: 100px;
    padding: 3px;
    border: 1px solid #eee;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, .2);
    background-color: white;
    transition: all 400ms ease-in-out;
  }

  .emojis__item {
    cursor: pointer;
    transition: transform 400ms ease-in-out;
  }

  .emojis__item:hover {
    transform: scale(1.1);
  }

  .message__sound {
    display: none;
  }

  @keyframes blink {
    /**
     * At the start of the animation the dot
     * has an opacity of .2
     */
    0% {
      opacity: .2;
    }
    /**
     * At 20% the dot is fully visible and
     * then fades out slowly
     */
    20% {
      opacity: 1;
    }
    /**
     * Until it reaches an opacity of .2 and
     * the animation can start again
     */
    100% {
      opacity: .2;
    }
  }

  @media only screen and (max-width: 768px), (max-width: 1024px) {

    .message {
      align-items: flex-start;
    }

    .message__form--input {
      width: 80%;
    }

    .message__form--btn {
      display: block;
    }
  }

  /*Media query for responsive designe*/
  @media only screen and (max-width: 425px), (max-width: 375px), (max-width: 320px) {

    .message {
      flex-wrap: wrap;
      margin-bottom: 2%;
    }

    .message__form, .message__form--input {
      width: 100%;
      text-align: center;
    }

    .message__form--icon, .message__form--typingdots {
      display: none;
    }

    .message__form--btn {
      display: block;
    }

    .emojis__btn {
      margin-left: 2%;
    }

    .emojis {
      left: 10%;
    }
  }
</style>
