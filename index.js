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

async function getRepos(profile) {
  const res = await fetch(
    `${profile.repos_url}?client_id=${CLIENT_ID}&client_secrect=${CLIENT_SECRET}&per_page=10`
  );

  const repo = await res.json();
  return repo;
}

const Selector = (className) => document.querySelector(className);

document.getElementById("search").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("findByUsername").value;

  if (username.length > 0) {
    Selector(".loader").style.display = "block";
    Selector(".user-details").style.display = "none";

    const profile = await getUser(username);
    Selector(".loader").style.display = "none";

    if (profile.message === "Not Found") {
      Selector(".notFound").style.display = "block";
    } else {
      Selector(".notFound").style.display = "none";
      const repos = await getRepos(profile);
      Selector(".user-details").style.display = "flex";

      showProfile(profile);
      showRepos(repos);
    }
  }
});

function showRepos(repos) {
  let newHtml = "";
  for (let repo of repos) {
    newHtml += `
       <div class="repo">
       <div class="repo_name">
         <a href="${repo.html_url}">${repo.name}</a>
       </div>
       <p>
         <span class="circle"></span> ${repo.language}
         <ion-icon name="star-outline"></ion-icon> ${repo.watchers_count}
         <ion-icon name="git-branch-outline"></ion-icon> ${repo.forks_count}
       </p>
     </div>
      `;
  }
  document.querySelector(".repos").innerHTML = newHtml;
}

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
