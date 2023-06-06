"use strict"

window.onload=checkUserAuthenticity;

const post_container = document.querySelector("#post-container");
const body_container = document.querySelector("#body-container");
const navbar = document.querySelector("#nav-bar");
const settingmenu = document.querySelector("#settings-menu");
const DarkBtn = document.querySelector("#dark-btn");
const commentList = document.querySelector(".comments-div");
const QueryList = document.querySelector("#query-listing");
const small_info = document.querySelector("#info");
const caution = document.querySelector("#caution-text");
const mainpostbtn = document.querySelector("#submit-post");
const lovebtn = document.querySelector("#love");
const logoutoverlaycontainer = document.querySelector("#confirm-logout-overlay")
const logoutconfirmdiv = document.querySelector("#confirm-logout-div")
const logoutaffirmbtn = document.querySelector("#log-affirm")

const redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
const authendpoint = "http://127.0.0.1:8000/auth/authuser"
const getuserendpoint = "http://127.0.0.1:8000/api/users/getbasicuserdata"



// Toggle effect when user image on navbar is clicked

function settingsMenuToggle() {
  settingmenu.classList.toggle("settings-menu-javascripted")
  settingmenu.onmouseleave = () => {
    settingmenu.classList.toggle("settings-menu-javascripted")
  }
}

// Toggle the dark mode btn

DarkBtn.onclick = ()=> {
  DarkBtn.classList.toggle("btn-on")

  // adding the dark mode feature
  document.body.classList.toggle('dark-theme')

  // saving the theme to local storage
  if (localStorage.getItem('theme') == 'light') { localStorage.setItem(localStorage.setItem("theme", "dark")) }
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
  QueryList.classList.toggle("query-list-javascripted")
  small_info.classList.remove("small-info-javascripted")
  small_info.classList.add("info")
  QueryList.onmouseleave = () => {
   QueryList.classList.toggle("query-list-javascripted")
  }
}

/// toggle effect when typing into query box

function showInfoToggle(id) {
  const searchinput = document.getElementById(id)
  let value = searchinput.value
  if (value === null || value === '' || value === undefined) {
    small_info.classList.remove("small-info-javascripted")
    small_info.classList.add("small-info")
  }
  else if (value.length >= 2) {
    small_info.classList.remove("info")
    small_info.classList.add("small-info-javascripted")
  }
}


// Page onload workings 

const userToken = () => {
  const token = sessionStorage.getItem("token")
  return token
}

const logUserId = () => {
  const userid = sessionStorage.getItem("id_user")
  return userid
}

const foreignUserId = () => {
  const id= document.querySelector("#fuserid")
  return id.textContent
}

const foreignUsername = ()=>{
  const name= document.querySelector("#fusername")
  return name.textContent
}

const postData = async (postid) => {
  let endpoint = `http://127.0.0.1:8000/api/posts/getpost/post-id=${postid}`
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

const getUsername = async () => {
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

async function checkUserLikeStatus(postid) {
  const userid = userId()
  const endpoint = `http://127.0.0.1:8000/api/posts/has_liked/post-id=${postid}&user=${userid}`

  const res = await fetch(endpoint, { method: "GET", headers: { "Accept": "application/json" } })

  const data = await res.json()
  if (data["has_liked"] == true) {
    lovebtn.classList.add("love")
  }
  else { lovebtn.classList.add("hate") }
}

async function checkUserCommentStatus(postid) {
  const userid = userId()
  const endpoint = `http://127.0.0.1:8000/api/posts/has_commented/post-id=${postid}&user=${userid}`

  const res = await fetch(endpoint, { method: "GET", headers: { "Accept": "application/json" } })

  const data = await res.json()
  return data
}


async function updateDom() {
  const userid = userId()
  const foreignUserid=foreignUserId()
  const foreignusername= foreignUsername()
  const logprofiledata = await getProfileImage(userid)
  const userdata = await getUsername(userid)
  const commentstatus_res = await checkUserCommentStatus()
  await checkUserLikeStatus()
  writeContentsToDom(profiledata, userdata, postdata, commentstatus_res)
}

async function checkUserAuthenticity() {
  if (!sessionStorage.getItem("token") || !sessionStorage.getItem("id_user")) {
    renderRedirector()
  }
  else {
    updateDom()
  }
}

// logout workings


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

function logoutHandler() {
  logoutOverlay()
  logoutaffirmbtn.addEventListener("click", () => {
    removeToken()
    window.location.reload()
  })
}