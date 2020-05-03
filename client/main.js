
import React from 'react'; // specify the module and then specify the library name
                            // meteor takes care of the rest
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor'; // named export from Meteor
import {UP_Collection_Access} from './../imports/api/user_posts.js';
import TitleBar from './../imports/ui/TitleBar.js';
import AddTopics from './../imports/ui/AddTopics.js';
import AddReply from './../imports/ui/AddReply.js';

const renderPosts =  (passed_posts) =>  {
  let formattedPosts = passed_posts.map((post) => {
    return (
      <p key={post._id}>
        {post.topic} have {post.votes, post.comments} likes[s] {''/* single space before button hack */}
        {/* below is a statement function */}
        <button onClick={() => {  // anonymous arrow function
          UP_Collection_Access.update({_id: post._id}, {$inc: {votes: 1}})
        }}>+1</button>
        <button onClick={() => {
          UP_Collection_Access.update({_id: post._id}, {$inc: {votes: -1}})
        }}>-1</button>
        <button onClick={() => {
          UP_Collection_Access.remove({_id: post._id})
        }}>X</button>

      </p>

    );
  });

  return formattedPosts;


};

/*const processCommentFunction = (event) => {
  event.preventDefault()
  let newComment = event.target.formCommentAttribute.value;
  if(newComment){
    event.target.formCommentAttribute.value = '';
    UP_Collection_Access.insert({

      comment: newComment

});
};
};*/
const processFormDataFunction = (event) => {
  event.preventDefault()
  let newTopic = event.target.formInputNameAttribute.value;
  if (newTopic){
    event.target.formInputNameAttribute.value = ''; // clear input box
    UP_Collection_Access.insert({
      topic: newTopic,
      votes: 0,

    });



  };
};


Meteor.startup(() =>  {

  // Tracker tracks queries and reruns code when queries change
  Tracker.autorun(() => {
    const allPostsInDB = UP_Collection_Access.find().fetch();
    let title = 'Facebook';
    let jsx = (
      <div>
      {/* this is static right now. Should be dynamic for universal use */}
      {/*<TitleBar/>*/}
      {/* <TitleBar title={title} /> title is now getting passed to our component*/}
      {/* prop value can be anything - string, number, function */}
      {/*<TitleBar/>  if there is no prop but a prop is required a warning will be thrown*/}
      <TitleBar title={title} moderator='newman'/>
        <form onSubmit={processFormDataFunction}>
          <input type='text' name='formInputNameAttribute' placeholder='Whats on your mind?'/>
          <button>Add Post</button>
        </form>

        <AddTopics />


       {renderPosts(allPostsInDB)}

       </div>
);


    ReactDOM.render(jsx, document.getElementById('content'));

  });




});
