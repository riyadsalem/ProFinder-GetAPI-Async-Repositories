// https://api.github.com/users/riyadsalem
/////////// https://api.github.com/users/riyadsalem/repos
// https://api.github.com/users/easylearningbd
// https://api.github.com/users/andrew

/*
fetch(`https://api.github.com/users/andrew`)
  .then((res) => res.json())
  .then((profile) => console.log(profile))
  .catch((err) => console.log(err));
*/

const CLIENT_ID = "04adb20f1da071ed167e";
const CLIENT_SECRET = "3b2ac7610e6857d7ae9863c40505786cf352ee70";

async function getUser(name) {
  const res = await fetch(
    `https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
  );
  const profile = await res.json();
  return profile;
}

document.getElementById("search").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("findByUsername").value;

  const profile = await getUser(username);

  console.log(profile);
});
