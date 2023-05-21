"use strict";
window.onload = checkUserAuthenticity

const post_container = document.getElementById("post-container");
const body_container = document.getElementById("body-container");
const navbar = document.getElementById("nav-bar");
const settingmenu = document.getElementById("settings-menu");
const DarkBtn = document.getElementById("dark-btn");
const QueryList = document.getElementById("query-listing");
const small_info = document.getElementById("info");
const lefty = document.getElementById("features-left");
const righty = document.getElementById("features-right");
const top1 = document.getElementById("only");
const bottom = document.getElementById("only-2");
const lefty2 = document.getElementById("features-left-2");
const righty2 = document.getElementById("features-right-2");
const lefty3 = document.getElementById("features-left-3");
const righty3 = document.getElementById("features-right-3");
const logoutoverlaycontainer = document.querySelector("#confirm-logout-overlay")
const logoutconfirmdiv = document.querySelector("#confirm-logout-div")
const logoutaffirmbtn = document.querySelector("#log-affirm")

const redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
const authendpoint = "http://127.0.0.1:8000/auth/authuser"
const getuserendpoint = "http://127.0.0.1:8000/api/users/getbasicuserdata"



// Toggle effect when user image on navbar is clicked

function settingsMenuToggle() {
  settingmenu.classList.toggle("settings-menu-javascripted")
  settingmenu.onmouseleave = function () {
    settingmenu.classList.toggle("settings-menu-javascripted")
  }
}

// Toggle the dark mode btn

DarkBtn.onclick = function () {
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
    return QueryList.classList.toggle("query-list-javascripted")
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


// hover effect on intro boxes

function mouseEnterr(inp1, inp2) {
  inp1.classList.replace("features-left", "features-right")
  inp2.classList.replace("features-right", "features-left")
  return true
}

function mouseLeavee(inp1, inp2) {
  inp1.classList.replace("features-right", "features-left")
  inp2.classList.replace("features-left", "features-right")
  return true
}
function mouseEnterr2() {
  lefty2.classList.replace("features-right", "features-left")
  righty2.classList.replace("features-left", "features-right")
  lefty2.firstElementChild.classList.replace("title-2", "title")
  lefty2.lastElementChild.classList.replace("info-1", "info-2")
  righty2.firstElementChild.classList.replace("title", "title-2")
  righty2.lastElementChild.classList.replace("info-2", "info-1")
  return true
}

function mouseLeavee2() {
  lefty2.classList.replace("features-left", "features-right")
  lefty2.firstElementChild.classList.replace("title", "title-2")
  lefty2.lastElementChild.classList.replace("info-2", "info-1")
  righty2.classList.replace("features-right", "features-left")
  righty2.firstElementChild.classList.replace("title-2", "title")
  righty2.lastElementChild.classList.replace("info-1", "info-2")
  return true
}


function mouseEnterr3() {
  lefty3.classList.replace("features-left", "features-right")
  lefty3.firstElementChild.classList.replace("title", "title-2")
  lefty3.lastElementChild.previousElementSibling.classList.replace("info-2", "info-1")
  lefty3.lastElementChild.classList.replace("btn-w", "btn-d")

  righty3.classList.replace("features-right", "features-left")
  righty3.firstElementChild.classList.replace("title-2", "title")
  righty3.lastElementChild.previousElementSibling.classList.replace("info-1", "info-2")
  righty3.lastElementChild.classList.replace("btn-d", "btn-w")

  return true
}

function mouseLeavee3() {
  lefty3.classList.replace("features-right", "features-left")
  lefty3.firstElementChild.classList.replace("title-2", "title")
  lefty3.lastElementChild.previousElementSibling.classList.replace("info-1", "info-2")
  lefty3.lastElementChild.classList.replace("btn-d", "btn-w")


  righty3.classList.replace("features-left", "features-right")
  righty3.firstElementChild.classList.replace("title", "title-2")
  righty3.lastElementChild.previousElementSibling.classList.replace("info-2", "info-1")
  righty3.lastElementChild.classList.replace("btn-w", "btn-d")
  return true
}

top1.addEventListener("mouseenter", () => {
  top1.classList.replace("only", "only-js")
  top1.lastElementChild.classList.replace("info-2", "info-1")
  top1.firstElementChild.classList.replace("title", "title-2")
  mouseEnterr(lefty, righty)
})


top1.addEventListener("mouseleave", () => {
  top1.classList.replace("only-js", "only")
  top1.lastElementChild.classList.replace("info-1", "info-2")
  top1.firstElementChild.classList.replace("title-2", "title")
  mouseLeavee(lefty, righty)
})



bottom.addEventListener("mouseenter", () => {
  bottom.classList.replace("only-2", "only-2-js")
  bottom.lastElementChild.classList.replace("info-3", "info-2")
  bottom.firstElementChild.classList.replace("title-2", "title")
  mouseEnterr3()
})


bottom.addEventListener("mouseleave", () => {
  bottom.classList.replace("only-2-js", "only-2")
  bottom.lastElementChild.classList.replace("info-2", "info-3")
  bottom.firstElementChild.classList.replace("title", "title-2")
  mouseLeavee3()
})



lefty.addEventListener("mouseenter", () => { mouseEnterr(lefty, righty) })
lefty.addEventListener("mouseleave", () => { mouseLeavee(lefty, righty) })
righty.addEventListener("mouseenter", () => { mouseEnterr(lefty, righty) })
righty.addEventListener("mouseleave", () => { mouseLeavee(lefty, righty) })
lefty2.addEventListener("mouseenter", mouseEnterr2)
lefty2.addEventListener("mouseleave", mouseLeavee2)
righty2.addEventListener("mouseenter", mouseEnterr2)
righty2.addEventListener("mouseleave", mouseLeavee2)
lefty3.addEventListener("mouseenter", mouseEnterr3)
lefty3.addEventListener("mouseleave", mouseLeavee3)
righty3.addEventListener("mouseenter", mouseEnterr3)
righty3.addEventListener("mouseleave", mouseLeavee3)



// heavy lifting


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

const contentData = async () => {
  let endpoint = "http://127.0.0.1:8000/api/home/getaboutobjects"
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
    writeContentsToDom(profiledata, userdata, contentdata)
  }
  else {
    // call on the cached response
  }
}

async function writeContentsToDom(profiledata, userdata, contentdata) {
  const profileimgs = document.querySelectorAll(".profile-img")
  const usernamespots = document.querySelectorAll(".username")
  const domtitle = document.querySelector("#domtitle")

  const datacontent = await contentdata["details"]

  const contentparas = document.querySelectorAll(".content")

  const username = await userdata["details"]["username"]
  const profileimgurl = await profiledata["details"]["profileimage"]

  profileimgs.forEach((profileimg) => {
    profileimg.src = profileimgurl
  })

  usernamespots.forEach((usernameitem) => {
    usernameitem.textContent = `${username}`
  })

  domtitle.textContent = `${username} | CribSpace`

  datacontent.forEach((content) => {
    let contenttitle = content["title"]
    let contenttext = content['content']
    let true_el = document.querySelector(`#${contenttitle}`)
    true_el.textContent = contenttext
  }
  )

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