function getStringBetween(str, start, end) {
  const result = str.match(new RegExp(start + "(.*)" + end));

  return result[1];
}

export function GetImgSrc(images, user) {
  let image =
    images.filter(
      (i) =>
        i.includes(`${user}`) &&
        getStringBetween(i, "2F", "alt").split("?")[0] === user
    )[0] === undefined
      ? "https://www.whatspaper.com/wp-content/uploads/2022/04/hd-naruto-baryon-mode-wallpaper-whatspaper-24.jpg"
      : images.filter(
          (i) =>
            i.includes(`${user}`) &&
            getStringBetween(i, "2F", "alt").split("?")[0] === user
        )[0];

  return image;
}
