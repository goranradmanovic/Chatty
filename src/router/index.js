import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Chat from '@/components/Chat';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },

    {
    	path: '/chat',
    	name: 'Chat',
    	component: Chat,
      props: true, //Passing (parameter) props to this route
      //This function will fire before this component is loaded.
      //It has tree params. 'to' is information of route (component) that we going to,
      //'from' is where we come from, 'next' is function that we use to call where we want to go next. (beforeEnter: (to, from, next))
      beforeEnter: (to, from, next) => {
        //console.log(to.params.name);

        //If param. name exist, ect. if user is entered name on welcome screen
        //then allow user to go to Chat page
        if (to.params.name) {
          next(); //This function will take us to next component which is Chat
        } else {
          //Redirect user to welcome screen
          next({ name: 'Welcome'});
        }
      }
    }
  ]
});
