/* Step 1: using axios, send a GET request to the following URL 
          (replacing the palceholder with your Github name):
          https://api.github.com/users/<your name>
*/
// axios.get('https://api.github.com/users/rashmipoddar')
//   .then(response => {
//     // console.log(`Response received from the api call: ${response}`);
//     console.log('Response received from the github api', response);
//     console.log(response);
//     const githubUser = cardCreator(response.data);
//     cards.prepend(githubUser);
//   })
//   .catch(error => {
//     console.log(`Error when getting data from api call: ${error}`);
//   })

/* Step 2: Inspect and study the data coming back, this is YOUR 
  github info! You will need to understand the structure of this 
  data in order to use it to build your component function 

  Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
          create a new component and add it to the DOM as a child of .cards
*/

const cards = document.querySelector('.cards');



/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ['YenniLee', 'Gavin-Dreyer', 'Techne3', 'DannyManzietti', 'Developer3027'];
// const baseUrl = 'https://api.github.com/users/';
// followersArray.forEach(follower => {
//   axios.get(`${baseUrl}${follower}`)
//   .then(response => {
//     // console.log(`Response received from the api call: ${response}`);
//     // console.log(response);
//     const githubUser = cardCreator(response.data);
//     cards.appendChild(githubUser);
//   })
//   .catch(error => {
//     console.log(`Error when getting data from api call: ${error}`);
//   })
// })



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardCreator(dataObj) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardImg = document.createElement('img');
  cardImg.src = dataObj.avatar_url;
  card.appendChild(cardImg);

  const innerCard = document.createElement('div');
  innerCard.classList.add('card-info');
  card.appendChild(innerCard);

  const user = document.createElement('h3');
  user.classList.add('name');
  user.textContent = dataObj.name;
  innerCard.appendChild(user);

  const userName = document.createElement('p');
  userName.classList.add('username');
  userName.textContent = dataObj.login;
  innerCard.appendChild(userName);

  const userLocation = document.createElement('p');
  userLocation.textContent = `Location: ${dataObj.location}`;
  innerCard.appendChild(userLocation);
  
  const userProfile = document.createElement('p');
  userProfile.textContent = 'Profile: ';
  innerCard.appendChild(userProfile);
  
  const userProfileLink = document.createElement('a');
  userProfileLink.href = dataObj.html_url;
  userProfileLink.textContent = dataObj.html_url;
  userProfile.appendChild(userProfileLink);

  const userFollowers = document.createElement('p');
  userFollowers.textContent = `Followers: ${dataObj.followers}`;
  innerCard.appendChild(userFollowers);
  
  const userFollowing = document.createElement('p');
  userFollowing.textContent = `Following: ${dataObj.following}`;
  innerCard.appendChild(userFollowing);

  const userBio = document.createElement('p');
  userBio.textContent = `Bio: ${dataObj.bio}`;
  innerCard.appendChild(userBio);

  return card;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


// Stretch Goal

axios.get('https://api.github.com/users/rashmipoddar')
  .then(response => {
    // console.log(`Response received from the api call: ${response}`);
    // console.log('Response received from the github api', response);
    // console.log(response);
    const githubUser = cardCreator(response.data);
    cards.prepend(githubUser);
    const userFollowers = response.data.followers_url;
    // console.log(`The followers url is ${userFollowers}`);
    return userFollowers;
  })
  .then(userFollowers => {
    axios.get(userFollowers)
      .then(followersResponse => {
        console.log(followersResponse);
        let followersLink = followersResponse.data.map(followers => followers.url);
        followersLink.forEach(followerLink => {
          axios.get(`${followerLink}`)
          .then(followerResponse => {
            const follower = cardCreator(followerResponse.data);
            cards.appendChild(follower);
          })
          .catch(error => {
            console.log(`Error when getting data from user's follwers api call: ${error}`);
          })
        })
      })
  })
  .catch(error => {
    console.log(`Error when getting data from api call: ${error}`);
  })