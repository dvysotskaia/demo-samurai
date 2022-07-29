import profileReducer, { addPostAC, deletePostAC } from './profile-reducer';

 let state = {
   posts: [
     { id: 1, message: "Hi, how are you?", likesCount: 12 },
     { id: 2, message: "Hello!", likesCount: 1 },
   ],
 };
test("new post should be added", () => {
  // 1. start data
  let action = addPostAC('hello');
  // 2. action
  let newState = profileReducer(state, action);
  
  // 3. expect 
  expect(newState.posts.length).toBe(3);
});

test("new message shoud be correct", () => {
  // 1. start data
  let action = addPostAC("hello");
  // 2. action
  let newState = profileReducer(state, action);

  // 3. expect
  expect(newState.posts[2].message).toBe("hello");
});

test("after deleting length of messages should be decrement", () => {
  // 1. start data
  let action = deletePostAC(1);
  // 2. action
  let newState = profileReducer(state, action);

  // 3. expect
  expect(newState.posts.length).toBe(1);
});





