export const getMess = (user) =>
  fetch(`/messages/${user}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => jsonRes);

export const getPosts = () =>
  fetch("/posts")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((jsonRes) => jsonRes);
