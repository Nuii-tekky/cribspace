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
const commentinput = document.querySelector("#comment-input")


const redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
const authendpoint = "http://127.0.0.1:8000/auth/authuser"
const getuserendpoint = "http://127.0.0.1:8000/api/users/getbasicuserdata"

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
  if (localStorage.getItem('theme') == 'light') { localStorage.setItem("theme", "dark") }
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
  }
  else if (value.length >= 2) {
    small_info.classList.remove("info");
    small_info.classList.add("small-info-javascripted");
  }

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
  let endpoint = "http://127.0.0.1:8000/api/profiles/getprofiledata"
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

const postId = () => {
  let postid = document.querySelector("#postid").textContent
  return postid
}

const postData = async () => {
  let id = postId()
  let endpoint = `http://127.0.0.1:8000/api/posts/getpost/post-id=${id}`
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

const getUsername = async userid => {
  let endpoint = `http://127.0.0.1:8000/api/users/getusername`
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

const getProfileImage = async userid => {
  let endpoint = `http://127.0.0.1:8000/api/profiles/getprofiledata`
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

function commentInputState(allow){
  if (allow == true) {
    commentinput.placeholder = "comment here...."
    commentinput.removeAttribute("readonly")
  }
  else {
    commentinput.placeholder = "sorry,you cant comment more than once.."
  }
}

async function checkUserLikeStatus() {
  const userid = userId()
  const postid = postId()
  const endpoint = `http://127.0.0.1:8000/api/posts/has_liked/post-id=${postid}&user=${userid}`

  const res = await fetch(endpoint, { method: "GET", headers: { "Accept": "application/json" } })

  const data = await res.json()
  if (data["has_liked"] == true) {
    lovebtn.classList.add("love")
  }
  else { lovebtn.classList.add("hate") }
}

async function checkUserCommentStatus() {
  const userid = userId()
  const postid = postId()
  const endpoint = `http://127.0.0.1:8000/api/posts/has_commented/post-id=${postid}&user=${userid}`

  const res = await fetch(endpoint, { method: "GET", headers: { "Accept": "application/json" } })

  const data = await res.json()
  return data
}

async function updateDom() {
  const profiledata = await userProfileData()
  const userdata = await userData()
  const postdata = await postData()
  const commentstatus_res = await checkUserCommentStatus()
  checkUserLikeStatus()
  writeContentsToDom(profiledata, userdata, postdata, commentstatus_res)
}

async function writeContentsToDom(profiledata, userdata, postdata, commentstatus_res) {
  const username = await userdata["details"]["username"]
  const profileimgurl = await profiledata["details"]["profileimage"]

  const postownerid = await postdata["details"]["user"]

  const postowner = await getUsername(postownerid)
  const postownerprofile = await getProfileImage(postownerid)
  const postdate = await postdata["details"]["created_at"]
  const posttext = await postdata["details"]["caption"]
  const postimage = await postdata["details"]["image"]
  const no_of_likes = await postdata["details"]["no_of_likes"]
  const no_of_comments = await postdata["details"]["no_of_comments"]

  const user_commented = await commentstatus_res["has_commented"]

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

  const postdateobject = new PostDate(postdate)
  const postdateliteral = postdateobject.postdateliteral()

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
  else {
    postcontainer.innerHTML = `
    <div class="write-post-user-profile">
      <a ><img src=${postownerprofile}></a>
      <div>
        <p id="postuser">${postowner}</p>
        <span >${postdateliteral}</span>
      </div>
    </div>
    <p class="post-text">${posttext}</p>
    <a href=${postimage} target="_blank"><img src=${postimage} class="post-img"></a>
    `

  }

  // like and comments count

  const postcountpara = document.querySelector("#no-likes")
  const commentcountpara = document.querySelector("#no-comments")
  postcountpara.textContent = no_of_likes
  commentcountpara.textContent = no_of_comments

  // comment section
  const tocomment = document.querySelector("#toshowcomment")
  if (user_commented == false && no_of_comments == 0) {
    tocomment.classList.replace("hidetext", "showtext")
    commentInputState(false)
  }
  else if(user_commented == false && no_of_comments > 0) {
    tocomment.classList.replace("showtext", "hidetext")
    commentInputState(false)
  }
  else{
    tocomment.classList.replace("showtext", "hidetext")
    commentInputState(true)
  }

}

class PostDate {
  constructor(backendtime){
    this.backendtime=backendtime
  }

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

  postdateliteral() {
    let date = new Date(this.backendtime);
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

// react btn functionality
lovebtn.onclick =  () => {
  let classslist = lovebtn.classList
  if (classslist[0] == "love") {
    lovebtn.classList.replace("love", "hate")
  }
  else {
    lovebtn.classList.replace("hate", "love")
  }
  createLikeObject()
}

async function createLikeObject() {
  const userid = userId()
  const postid = postId()

  const endpoint = `http://127.0.0.1:8000/api/posts/likepost/post-id=${postid}&user=${userid}`

  const req_config = {
    method: "POST",
    headers: {
      "Accept": "application/json"
    }
  }

  const res = await fetch(endpoint, req_config)
  const data = await res.json()
  updateLikeCountPhase2(data["like_count"],)

}

function updateLikeCountPhase2(num) {
  let number = num
  let likepara = document.querySelector("#no-likes")
  likepara.textContent = number
}

async function loadComments() {
  null
}

async function sendComment() {
  const value = commentinput.value;

  commentinput.value = ""
  if (value !== "" && value !== undefined) {
    const postid = postId()
    const userid = userId()
    const endpoint = `http://127.0.0.1:8000/api/posts/commentpost/post-id=${postid}&user=${userid}`

    const data = JSON.stringify({ "comment_text": value })
    const req_config = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      },
      body: data
    }
    const res = await fetch(endpoint, req_config)
    const res_data = await res.json()
    if (res_data["details"] == "object created") {
      loadComments()
    }
  }
}

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
// logging out

function logoutHandler() {
  logoutOverlay()
  logoutaffirmbtn.addEventListener("click", () => {
    removeToken()
    window.location.reload()
  })
}