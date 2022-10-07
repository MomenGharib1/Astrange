import axios from "axios";

export function IncreaseLikes(post, e, Item) {
  let counter = document.querySelector(
    `#${post.userName}${post.content
      .replace(/[^a-zA-Z0-9ا-ي]+/gi, "")
      .split("")
      .join("")}`
  );
  let isLiked = post.likes.filter((p) => p.name === Item);
  if (isLiked.length === 0) {
    post.likes = post.likes.concat({
      name: Item,
    });
    counter.textContent++;
    e.currentTarget.style.color = "rgb(205, 71, 71)";
    const likedPost = { ...post };
    likedPost.id = post._id;
    axios.post("/liked", likedPost);
  } else if (isLiked.length === 1) {
    e.currentTarget.style.color = "#464343";
    counter.textContent--;
    post.likes = post.likes.filter((l) => l.name !== Item);
    const unLikedPost = { ...post };
    unLikedPost.id = post._id;
    axios.post("/unliked", unLikedPost);
  }
}
