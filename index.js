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

  showProfile(profile);
  console.log(profile);
});

function showProfile(profile) {
  document.querySelector(".profile").innerHTML = `
<img
src="${profile.avatar_url}"
alt="letstrie"
/>
<p class="name">${profile.name}</p>
<p class="username login">${profile.login}</p>
<p class="bio">${profile.bio}</p>

<div class="followers-stars">
<p>
  <ion-icon name="people-outline"></ion-icon>
  <span class="followers"> ${profile.followers} </span> followers
</p>
<span class="dot">·</span>
<p><span class="following"> ${profile.following} </span> following</p>
</div>

<p class="company">
<ion-icon name="business-outline"></ion-icon>
${profile.company}
</p>
<p class="location">
<ion-icon name="location-outline"></ion-icon>${profile.location}
</p>
`;
}
