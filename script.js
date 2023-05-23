'use strict';
const apiURL = 'https://api.github.com/users/';
console.log(apiURL);

// fetch(apiURL)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.log('Error:', error));

// Elements needed
const form = document.getElementById('form');
const submit = document.getElementById('submit');
const profileCard = document.querySelector('.card');
const avatar = document.getElementById('avatar');
const profileImg = document.querySelector('.profile-img');
const userName = document.getElementById('username');
const bio = document.getElementById('bio');
const data = document.querySelector('.data');
const repos = document.getElementById('repos');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const notFound = document.querySelector('.not-found');
const h3Elements = document.querySelectorAll('.data h3');

// Form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  const nameInput = document.getElementById('name-input').value;
  // console.log(nameInput);

  getUsers(nameInput);
  form.reset();
});

// Fetch from API
function getUsers(nameInput) {
  console.log(nameInput);

  fetch(apiURL + nameInput)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Check if the user exists
      if (data.message === 'Not Found') {
        notFound.classList.remove('hidden');
        console.log('User Not Found');
        profileCard.classList.add('hidden');
      } else {
        console.log('User Found');
        notFound.classList.add('hidden');
        displayUser(data);
      }
    })
    .catch(error => console.log('ERROR', error));
}

function displayUser(user) {
  console.log(userName);

  profileCard.classList.remove('hidden');
  // form.classList.add('hidden');

  userName.textContent = user.name;
  followers.querySelector('h3').textContent = `${user.followers} `;
  following.querySelector('h3').textContent = `${user.following} `;
  repos.querySelector('h3').textContent = `${user.public_repos} `;
  avatar.src = user.avatar_url;
  avatar.alt = user.name;
}
