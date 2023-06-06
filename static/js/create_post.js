"use strict";
window.onload = checkUserAuthenticity

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

const logoutoverlaycontainer = document.querySelector("#confirm-logout-overlay")
const logoutconfirmdiv = document.querySelector("#confirm-logout-div")
const logoutaffirmbtn = document.querySelector("#log-affirm")

const redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
const authendpoint = "http://127.0.0.1:8000/auth/authuser"
const getuserendpoint = "http://127.0.0.1:8000/api/users/getbasicuserdata"


// Toggle effect when user image on navbar is clicked

function settingsMenuToggle() {
  settingmenu.classList.toggle("settings-menu-javascripted")
  settingmenu.onmouseleave = ()=> {
    settingmenu.classList.toggle("settings-menu-javascripted")
  }
}

// Toggle the dark mode btn

DarkBtn.onclick = ()=> {
  DarkBtn.classList.toggle("btn-on")
  document.body.classList.toggle('dark-theme')
  if (localStorage.getItem('theme') === 'light') { localStorage.setItem("theme", "dark") }
  else { localStorage.setItem("theme", "light") }
}

if (localStorage.getItem('theme') === 'light') {
  DarkBtn.classList.remove('dark-btn-on')
  document.body.classList.remove('dark-theme')
}
else if (localStorage.getItem('theme') === 'dark') {
  DarkBtn.classList.add('dark-btn-on')
  document.body.classList.add('dark-theme')
}
else { localStorage.setItem("theme", "light") }


// Toggle effect  when search icon is clicked

function queryListToggle() {
  QueryList.classList.toggle("query-list-javascripted");
  small_info.classList.remove("small-info-javascripted");
  small_info.classList.add("small-info");
  QueryList.onmouseleave = () => {
    QueryList.classList.toggle("query-list-javascripted");
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

// file input functionality

const file = document.querySelector("#file")
file.addEventListener("change", (e) => {
  // list of allowed file types
  const allowed_ext = ['img', 'png', 'jpg', 'jpeg', 'gif', 'svg']

  // get the selected files
  const [file_select] = e.target.files

  // get the filename and size from the constant created above
  const { name: Filename, size } = file_select

  // convert size in bytes to kilobytes>
  const Filesize = (size / 100).toFixed(2)

  // get the ex, tension of the file
  const regex = /[^.]+$/
  const extension = Filename.match(regex)

  // write complete file name to the div for such
  const FileNameandSize = `${Filename} | ${Filesize}kb `
  if (Filesize >= 40300 || allowed_ext.includes(`${extension}`) === false) {
    caution.textContent = 'please make sure you selected an image file'
    caution.classList.replace("caution","caution-red")
    mainpostbtn.classList.replace("post-send","string")
    document.querySelector("#filename").textContent = ''
  }
  else {
    document.querySelector("#filename").textContent = FileNameandSize
    mainpostbtn.classList.replace("string","post-send")
    caution.classList.replace("caution-red","caution")
    caution.textContent = "...your file is okay,click post"
  }
  return true
})


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
  let userid= userId()
  let response = await fetch(getuserendpoint, {
    method: "GET",
    headers: {
      "Authorization": token,
      "userid":userid,
      "Accept":"application/json"
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


async function updateDom(hardfetch = true) {
  if (hardfetch === true) {
    const profiledata = await userProfileData()
    const userdata = await userData()
    writeContentsToDom(profiledata,userdata)
  }
  else{
    // call on the cached response
  }
}

async function writeContentsToDom(profiledata,userdata) {
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
  domtitle.textContent = `${username} | createpost`
}

// logging out

function logoutHandler() {
  logoutOverlay()
  logoutaffirmbtn.addEventListener("click", () => {
    removeToken()
    window.location.reload()
  })
}
