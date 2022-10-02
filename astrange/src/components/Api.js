export const getMess = () =>
  fetch("https://astrange-server.herokuapp.com/messages")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => jsonRes);

export const getPosts = () =>
  fetch("https://astrange-server.herokuapp.com/posts")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => jsonRes);

export const getUsers = () =>
  fetch("https://astrange-server.herokuapp.com/users")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => jsonRes);
