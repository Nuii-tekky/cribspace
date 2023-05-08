"use strict";
window.onload = checkUserAuthenticity

const post_container = document.querySelector("#post-container");
const body_container = document.querySelector("#body-container");
const navbar         = document.querySelector("#nav-bar"       );
const settingmenu    = document.querySelector("#settings-menu" );
const DarkBtn        = document.querySelector("#dark-btn"      );
const commentList    = document.querySelector (".comments-div" );
const QueryList      = document.querySelector("#query-listing" );
const small_info     = document.querySelector("#info"          );

const logoutoverlaycontainer = document.querySelector("#confirm-logout-overlay")
const logoutconfirmdiv = document.querySelector("#confirm-logout-div")
const logoutaffirmbtn = document.querySelector("#log-affirm")

const redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
const authendpoint = "http://127.0.0.1:8000/auth/authuser"
const getuserendpoint = "http://127.0.0.1:8000/api/getbasicuserdata"



// Toggle effect when user image on navbar is clicked

const settingsMenuToggle = () => {
  settingmenu.classList.toggle("settings-menu-javascripted")
  settingmenu.onmouseleave = function(){
    settingmenu.classList.toggle("settings-menu-javascripted")
    return true
  }
  return true
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
  QueryList.classList.toggle("query-list-javascripted");
  small_info.classList.remove("small-info-javascripted");
  small_info.classList.add("info");
  QueryList.onmouseleave = () => {
    QueryList.classList.toggle("query-list-javascripted");
  };
}

/// toggle effect when typing into query box

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
  return true;
}

function scrollHandler() {
  window.scroll(0, 5234);
  return true;
}
function scrollToTop(){
  window.scroll(0,0)
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
function removeToken() {
  sessionStorage.removeItem("token")
  window.location.reload()
}

function renderRedirector() {
  window.location.replace(redirectendpoint)
}

function loadUrl(url) {
  let endpoint = url
  window.location.href=`${endpoint}`
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

const contentData = async () => {
  let endpoint = "http://127.0.0.1:8000/api/getaboutobjects"
  let request_params = {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  }
  let res = await fetch(endpoint, request_params)
  let read_res = await res.json()
  return read_res
}

async function updateDom(hardfetch = true) {
  if (hardfetch === true) {
    const profiledata = await userProfileData()
    const userdata = await userData()
    const contentdata = await contentData()
    writeContentsToDom(profiledata, userdata)
  }
  else {
    // call on the cached response
  }
}

async function writeContentsToDom(profiledata, userdata) {
  const profileimgs = document.querySelectorAll(".profile-img")
  const usernamespots = document.querySelectorAll(".username")
  const domtitle = document.querySelector("#domtitle")

  const username = await userdata["details"]["username"]
  const profileimgurl = await profiledata["details"]["profileimage"]

  profileimgs.forEach((profileimg) => {
    profileimg.src = profileimgurl
  })

  usernamespots.forEach((usernameitem) => {
    usernameitem.textContent = `${username}`
  })

  domtitle.textContent = `${username} | Help&Support/feedback`

}

async function checkUserAuthenticity() {
  if (!sessionStorage.getItem("token") || !sessionStorage.getItem("id_user")) {
    renderRedirector()
  }
  else {
    updateDom()
  }
}

async function fetchPage(pagename) {
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

// logging out

function logoutHandler() {
  logoutOverlay()
  logoutaffirmbtn.addEventListener("click", () => {
    removeToken()
    window.location.reload()
  })
}