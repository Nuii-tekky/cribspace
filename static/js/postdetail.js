"use strict";

const post_container = document.querySelector("#post-container");
const body_container = document.querySelector("#body-container");
const body = document.querySelector("#body")
const navbar = document.querySelector("#nav-bar");
const settingmenu = document.querySelector("#settings-menu");
const DarkBtn = document.querySelector("#dark-btn");
const QueryList = document.querySelector("#query-listing");
const small_info = document.querySelector("#info");
const caution = document.querySelector("#caution-text");
const logoutoverlaycontainer = document.querySelector("#confirm-logout-overlay")
const logoutconfirmdiv = document.querySelector("#confirm-logout-div")
const logoutaffirmbtn = document.querySelector("#log-affirm")
const mainpostbtn = document.querySelector("#submit-post");
const lovebtn = document.querySelector("#love");

const redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
const authendpoint = "http://127.0.0.1:8000/auth/authuser"
const getuserendpoint = "http://127.0.0.1:8000/api/getbasicuserdata"

window.onload = checkUserAuthenticity

// Toggle effect when user image on navbar is clicked

function settingsMenuToggle() {
  settingmenu.classList.toggle("settings-menu-javascripted");
  settingmenu.onmouseleave = () => {
    settingmenu.classList.toggle("settings-menu-javascripted");

  };
}

// Toggle the dark mode btn

DarkBtn.onclick = () => {
  DarkBtn.classList.toggle("btn-on")

  // adding the dark mode feature
  document.body.classList.toggle('dark-theme')

  // saving the theme to local storage
  if (localStorage.getItem('theme') == 'light') {localStorage.setItem("theme", "dark")}
  else { localStorage.setItem("theme", "light") }
}

if (localStorage.getItem('theme') == 'light') {
  DarkBtn.classList.remove('dark-btn-on')
  document.body.classList.remove('dark-theme')
}
else if (localStorage.getItem('theme') == 'dark') {
  DarkBtn.classList.add('dark-btn-on')
  document.body.classList.add('dark-theme')
}
else { localStorage.setItem("theme", "light") }


// Toggle effect  when search icon is clicked

function queryListToggle() {
  QueryList.classList.toggle("query-list-javascripted");
  small_info.classList.remove("small-info-javascripted");
  small_info.classList.add("info");
  QueryList.onmouseleave = () => {
    return QueryList.classList.toggle("query-list-javascripted");
  };

}

// toggle effect when typing into query box

function showInfoToggle(id) {
  const searchinput = document.getElementById(id);
  let value = searchinput.value;
  if (value === null || value === '' || value === undefined) {
    small_info.classList.remove("small-info-javascripted");
    small_info.classList.add("small-info");
    console.log("console is working");
  }
  else if (value.length >= 2) {
    small_info.classList.remove("info");
    small_info.classList.add("small-info-javascripted");
  }

}

// react btn functionality
lovebtn.onclick = () => {
  lovebtn.classList.toggle("hate")
  return true
}


function logoutOverlay() {
  window.scroll(0, 0)
  logoutoverlaycontainer.classList.replace("confirm-overlay-js", "confirm-overlay")
  logoutconfirmdiv.classList.replace("confirm-div-js", "confirm-div")
  body.style.overflow = "hidden"
}

function removeLogoutOverlay() {
  logoutoverlaycontainer.classList.replace("confirm-overlay", "confirm-overlay-js")
  logoutconfirmdiv.classList.replace("confirm-div", "confirm-div-js")
  body.style.overflow = ""
}

// Page onload workings 

async function checkUserAuthenticity() {
  if (!sessionStorage.getItem("token") || !sessionStorage.getItem("id_user")) {
    renderRedirector()
  }
  else {
    updateDom()
  }
}

async function fetchPage(pagename, is_logout) {
  let redirect = pagename
  let access = userToken()
  const request_params = {
    method: "GET",
    headers: {
      "Authorization": `Token ${access}`,
      "Requestredirect": `${redirect}`
    }
  }
  const response = await fetch(authendpoint, request_params)
  if (response.redirected) {
    let url = response.url
    loadUrl(url)
  }
  else {
    let data = await response.json()
    console.log(data)
  }
}

function removeToken() {
  sessionStorage.removeItem("token")
  window.location.reload()
}

function renderRedirector() {
  window.location.replace(redirectendpoint)
}

function loadUrl(url) {
  let endpoint = url
  window.location.href = `${endpoint}`
}

const userToken = () => {
  const token = sessionStorage.getItem("token")
  return token
}

const userId = () => {
  const userid = sessionStorage.getItem("id_user")
  return userid
}

const userData = async () => {
  let token = userToken()
  let getuserendpoint = "http://127.0.0.1:8000/api/getbasicuserdata"
  let response = await fetch(getuserendpoint, {
    method: "GET",
    headers: {
      "Authorization": token
    }
  })
  let responsedata = await response.json()
  return responsedata
}

const userProfileData = async () => {
  let id_access = userId()
  let endpoint = "http://127.0.0.1:8000/api/getprofiledata"
  let request_params = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "iduser": `${id_access}`
    }
  }
  let res = await fetch(endpoint, request_params)
  let res_data = await res.json()
  return res_data
}

const postid = () => {
  let postid = document.querySelector("#postid").textContent
  return postid
}


const postData = async () => {
  let id = postid()
  let endpoint = `http://127.0.0.1:8000/api/getpost/post-id=${id}`

  let request_params = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  }
  const res = await fetch(endpoint, request_params)
  const data = await res.json()
  return data
}

const postOwner = async userid => {
  let endpoint = `http://127.0.0.1:8000/api/getusername`
  let req_config = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "userid": `${userid}`
    }
  }

  let res = await fetch(endpoint, req_config)
  let data = await res.json()
  let username = data["details"]["username"]
  return username
}

const postOwnerImage = async userid => {
  let endpoint = `http://127.0.0.1:8000/api/getprofiledata`
  let req_config = {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "iduser": `${userid}`
    }
  }

  let res = await fetch(endpoint, req_config)
  let data = await res.json()
  let image = data["details"]["profileimage"]
  return image
}

async function updateDom() {
  const profiledata = await userProfileData()
  const userdata = await userData()
  const postdata = await postData()
  writeContentsToDom(profiledata, userdata, postdata)

}

async function writeContentsToDom(profiledata, userdata, postdata) {
  const username = await userdata["details"]["username"]
  const profileimgurl = await profiledata["details"]["profileimage"]

  const postownerid=await postdata["details"]["user"]

  const postowner = await postOwner(postownerid)
  const postownerprofile = await postOwnerImage(postownerid)
  const postdate = await postdata["details"]["created_at"]
  const posttext=await postdata["details"]["caption"]
  const postimage= await postdata["details"]["image"]
  const no_of_likes= await postdata["details"]["no_of_likes"]
  const no_of_comments= await postdata["details"]["no_of_comments"]

  // logged user config
  const profileimgs = document.querySelectorAll(".profile-img")
  const usernamespots = document.querySelectorAll(".username")

  profileimgs.forEach((profileimg) => {
    profileimg.src = profileimgurl
  })

  usernamespots.forEach((usernameitem) => {
    usernameitem.textContent = `${username}`
  })

  // creating the post container
  const postcontainer = document.querySelector("#postcontainer")

  const postdateobject = new PostDate()
  const postdateliteral = postdateobject.postdateliteral(postdate)

  if (postimage === null) {
    postcontainer.innerHTML = `
    <div class="write-post-user-profile">
      <a ><img src=${postownerprofile}></a>
      <div>
        <p id="postuser">${postowner}</p>
        <span >${postdateliteral}</span>
      </div>
    </div>
    <p class="post-text">${posttext}</p>`
  }
  else{
    postcontainer.innerHTML = `
    <div class="write-post-user-profile">
      <a ><img src=${postownerprofile}></a>
      <div>
        <p id="postuser">${postowner}</p>
        <span >${postdateliteral}</span>
      </div>
    </div>
    <p class="post-text">${posttext}</p>
    <a href=${postimage} target="_blank"><img src=${postimage} class="post-img"></a>`
    
  }

}

class PostDate {
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  checktimedigit(time) {
    if (time < 10) {
      return "0" + time
    }
    else {
      return time
    }
  }

  is_am(time) {
    if (time < 12 && time > 0) {
      return true
    }
    else {
      return false
    }
  }

  postdateliteral(backendtime) {
    let date = new Date(backendtime);
    let year = date.getFullYear();
    let month = date.getMonth();
    let true_month = this.months[month];
    let actualdate = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let meridien_state = input => {
      let meridian_string = "";
      this.is_am(input) ? meridian_string = "am" : meridian_string = "pm";
      return meridian_string;
    };
    let true_minute = this.checktimedigit(minute);
    const return_string = `${true_month} ${actualdate},${year} | ${hour}:${true_minute}${meridien_state(hour)}`;

    return return_string;
  }
}

// logging out

function logoutHandler() {
  logoutOverlay()
  logoutaffirmbtn.addEventListener("click", () => {
    removeToken()
    window.location.reload()
  })
}