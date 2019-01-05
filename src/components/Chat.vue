<template>
	<div class="chat">
		<audio class="message__sound" ref="messagesound">
			<source src="../assets/sounds/message.mp3" type="audio/mpeg">
		</audio>
		
		<h2 class="chat__title">Say something ...</h2>

		<div class="chat__box">
			<ul class="chat__box--list" v-if="messages.length > 0">
				<li v-for="message in sortMessageByTime" :data-id="message.id" class="chat__box--list--item" :id="message.id">
					<img src="https://www.gravatar.com/avatar/00000000000000000000000000000000" alt="Gravatar.jpg" title="Generic user image" class="chat__box--list--item--avatar">
					<div class="chat__box--list--item--username">{{ message.name }}</div>
					<i class="fas fa-times chat__box--list--item--closebtn" @click="deleteMessage" title="Delete message"></i>
					<div class="chat__box--list--item--text">{{ message.message }}</div>
					<div class="chat__box--list--item--time"><time :datetime="message.time | formatDate">{{ message.time | formatDate }}</time></div>
				</li>
			</ul>
		</div>

		<div class="chat__input">
			<NewMessage :name="name"/> <!--Passing name of the user to this component-->
		</div>
	</div>
</template>

<script>

	import NewMessage from '@/components/NewMessage';
	import db from '@/firebase/init';

	export default {
		name: 'Chat',
		props: ['name'], //Parameters (props) that we accept in this component
		components: {
			NewMessage
		},
		data() {
			return {
				messages: [],
				changes: null,
				documentId: null,
				elementID: null,
				lastElementID: null
			}
		},

		filters: {
			//Format date
			formatDate(value) {
				//return moment(Number(value)).format('MMMM Do YYYY, h:mm:ss a'); //Format date
				return moment(Number(value)).fromNow();; //Format date (relative time)
			},
		},

		methods: {
			//Create message object and push to the message array
			renderMessagesList(docId, docData) {
				this.documentId = {id: docId}; //Create document ID object

				this.messages.push(Object.assign(this.documentId, docData)); //Assign document ID object to the message object and push to message array
			},

			//Delete message from DB
			deleteMessage(event) {
				this.documentId = event.target.parentElement.dataset.id; //Get document ID

				db.collection('messages').doc(this.documentId).delete(); //Delete message from DB
			},

			//Remove message object from messages array after message object is deleted from DB
			updateMessagesList(id) {
				if (id) {
					//Filter thrught message array and remove object with equal ID with deleted document id from DB
					this.messages = this.messages.filter(message => {
						return message.id != id;
					});
				}
				return;
			},

			//Play notification sound when message is recived
			playNotificationSound() {
				this.$refs.messagesound.play();
			},

			//Scroll the last message into client view
			scrollToMessage(id) {

				setTimeout(function() {
					document.getElementById(id).scrollIntoView();
				}, 0);
			}
		},

		computed: {
			//Sortmessages by time
			sortMessageByTime() {
				return this.messages.sort((obj1, obj2) => obj1.time - obj2.time);
			}
		},

		created() {

			db.collection('messages').onSnapshot((snapshot) => {

				this.changes = snapshot.docChanges();

				this.changes.forEach(change => {	

					if (change.type == 'added') {
						this.renderMessagesList(change.doc.id, change.doc.data());
						this.playNotificationSound();
						this.scrollToMessage(change.doc.id);
					} else if (change.type == 'modified') {
						console.log('modified')
					} else if (change.type == 'removed') {
						this.updateMessagesList(this.documentId);
					}
				});
			});
		},
	}
</script>

<style>
	.chat {
		grid-column: 2 / 3;
    grid-row: auto;
    justify-self: center;
    align-self: center;
    width: 100%;
	}

	.chat__title {
		width: 100%;
		margin: 3% auto;
		font-size: 2em;
		font-weight: 500;
		text-align: center;
		color: teal;
	}

	.chat__box {
		width: 100%;
		padding: 10px;
	}

	.chat__box--list {
		padding: 0;
		list-style-type: none;
	}

	.chat__box--list {
		width: 100%;
		max-height: 70vh;
		padding: 5px;
		overflow-y: scroll;
	}

	.chat__box--list--item {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
		margin-bottom: 3%;
		padding: 3px;
		border-bottom: 1px solid #eee;
	}

	.chat__box--list--item:nth-child(even) {
		width: 98%;
		margin-left: 2%;
		background-color: #F8F8F8;
	}

	.chat__box--list--item--avatar {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.chat__box--list--item--username {
		width: 85%;
		height: auto;
		font-size: 1.4em;
		font-weight: 500;
		color: teal;
	}

	.chat__box--list--item--text {
		width: 100%;
		margin-top: 1%;
		margin-bottom: 1%;
		font-size: 1.2em;
	}

	.chat__box--list--item--time {
		font-size: .7em;
		font-style: italic;
		color: #777;
	}

	.chat__box--list--item--closebtn {
		cursor: pointer;
		color: #444;
		transition: color 400ms ease-in-out;
	}

	.chat__box--list--item--closebtn:hover {
		color: crimson;
	}

	.chat__input {
		width: 100%;
		margin-top: 5%;
		border-top: 1px solid #eee;
	}

	/*Media query for responsive designe*/
	@media only screen and (max-width: 425px), (max-width: 375px), (max-width: 320px) {
		.chat {
			grid-column: 1 / 2;
		}

		.chat__box {
			padding: 5px;
		}

		.chat__box--list--item--username {
			width: 75%;
		}
	}

	@media only screen and (max-width: 768px) {
		.chat__box--list--item--username {
			width: 75%;
		}
	}
</style>
