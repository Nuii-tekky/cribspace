"use strict";
window.onload = checkUserAuthenticity

const body = document.querySelector("#body")
const overlaycontainer = document.querySelector("#confirm-overlay")
const confirmdiv = document.querySelector("#confirm-div")
const updateaffirmbtn = document.querySelector("#upt-affirm")
const updateunaffirmbtn = document.querySelector("#upt-unaffirm")
const logoutoverlaycontainer = document.querySelector("#confirm-logout-overlay")
const logoutconfirmdiv = document.querySelector("#confirm-logout-div")
const logoutaffirmbtn = document.querySelector("#log-affirm")

const upl_heading = document.querySelector("#upl-heading");
const post_container = document.querySelector("#post-container");
const body_container = document.querySelector("#body-container");
const DarkBtn = document.querySelector("#dark-btn");
const QueryList = document.querySelector("#query-listing");
const small_info = document.querySelector("#info");
const navbar = document.querySelector("#nav-bar");
const settingmenu = document.querySelector("#settings-menu");

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

DarkBtn.onclick = () => {
  DarkBtn.classList.toggle("btn-on")

  // adding the dark mode feature
  document.body.classList.toggle('dark-theme')

  // saving the theme to local storage
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
    console.log("console is working");
  }
  else if (value.length >= 2) {
    small_info.classList.remove("info");
    small_info.classList.add("small-info-javascripted");
  }
}

// profile pic upload

const file = document.querySelector("#file")
file.addEventListener("change", (e) => {
  // list of allowed file types
  const allowed_ext = ['img', 'png', 'jpg', 'jpeg', 'gif', 'svg']
  const vowels = ['a', 'e', 'i', 'o', 'u']

  // get the selected files
  const [file_select] = e.target.files

  // get the filename and size from the constant created above
  const { name: Filename, size } = file_select

  // get the extension of the file
  const regex = new RegExp('[^.]+$')
  const extension = Filename.match(regex)

  // write complete file name to the div for such
  const uplbtn = document.querySelector("#upload-p-img")
  if (allowed_ext.includes(`${extension}`) === false) {
    if (vowels.includes((`${extension}`).charAt(0)) === true) {
      upl_heading.textContent = `sorry you cant upload an ${extension} file `
      uplbtn.classList.replace("upload-p-img", "upload-p-img-js")
    }
    else {
      upl_heading.textContent = `sorry you cant upload a ${extension} file `
      uplbtn.classList.replace("upload-p-img", "upload-p-img-js")
    }
  }
  else {
    upl_heading.textContent = `your file is okay click upload`
    uplbtn.classList.replace("upload-p-img-js", "upload-p-img")
  }
  return true
})


// handling confirm-div-btn hover effect

function MouseEnter() {
  updateaffirmbtn.classList.replace("yes", "yes-js")
  updateunaffirmbtn.classList.replace("no", "no-js")
}

function MouseLeave() {
  updateaffirmbtn.classList.replace("yes-js", "yes")
  updateunaffirmbtn.classList.replace("no-js", "no")
}

function hoverBtn() {
  updateaffirmbtn.onmouseenter = MouseEnter
  updateaffirmbtn.onmouseleave = MouseLeave
  updateunaffirmbtn.onmouseenter = MouseEnter
  updateunaffirmbtn.onmouseleave = MouseLeave
}

hoverBtn()

// overlays for all the prompts

const scrollposition = () => {
  return window.scrollY
}

let scrollposi_array = []

function updateOverlay() {
  let currentposition = scrollposition()
  scrollposi_array.push(currentposition)
  window.scroll(0, 0)
  overlaycontainer.classList.replace("confirm-overlay-js", "confirm-overlay")
  confirmdiv.classList.replace("confirm-div-js", "confirm-div")
  body.style.overflow = "hidden"
}

function removeUpdateOverlay() {
  overlaycontainer.classList.replace("confirm-overlay", "confirm-overlay-js")
  confirmdiv.classList.replace("confirm-div", "confirm-div-js")
  let lastvalue = scrollposi_array.length - 1
  window.scroll(0, scrollposi_array[lastvalue])
  body.style.overflow = ""
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
  let userid = userId()
  let response = await fetch(getuserendpoint, {
    method: "GET",
    headers: {
      "Authorization": token,
      "userid": userid,
      "Accept": "application/json"
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

async function updateDom() {
  const profiledata = await userProfileData()
  const userdata = await userData()
  writeContentsToDom(profiledata, userdata)

}

async function writeContentsToDom(profiledata, userdata) {
  const profileimgs = document.querySelectorAll(".profile-img")
  const usernamespots = document.querySelectorAll(".username")
  const domtitle = document.querySelector("#domtitle")

  const bioinput = document.querySelector("#bio-input")
  const usernameinput = document.querySelector("#username-input")
  const emailinput = document.querySelector("#email-input")
  const occupationinput = document.querySelector("#occupation-input")
  const locationinput = document.querySelector("#location-input")
  const telephoneinput = document.querySelector("#telephone-input")

  const allinputs = document.querySelectorAll("input")

  const username = await userdata["details"]["username"]
  const email = await userdata["details"]["email"]
  const profileimgurl = await profiledata["details"]["profileimage"]
  const bio = await profiledata["details"]["bio"]
  const location = await profiledata["details"]["location"]
  const occupation = await profiledata["details"]["occupation"]
  const telephone = await profiledata["details"]["telephone"]

  profileimgs.forEach((profileimg) => {
    profileimg.src = profileimgurl
  })

  usernamespots.forEach((usernameitem) => {
    usernameitem.textContent = `${username}`
  })

  allinputs.forEach((inp) => {
    inp.value = ""
    inp.style.borderBottom = ""
  })

  bioinput.value = ""

  domtitle.textContent = `${username} | Account settings`

  usernameinput.placeholder = `${username}`
  emailinput.placeholder = `${email}`
  bioinput.placeholder = `${bio}`
  occupationinput.placeholder = `${occupation}`
  locationinput.placeholder = `${location}`
  telephoneinput.placeholder = `+234 ${telephone}`

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
    console.log(data)
  }
}


// updating details

function submitClickHandler(id) {
  const btn_el = document.querySelector(`#${id}`)
  const prev_el = btn_el.previousElementSibling
  const prev_el_val = prev_el.value
  if (prev_el_val !== undefined && prev_el_val !== "") {
    updateOverlay()
    updateaffirmbtn.onclick = () => {
      removeUpdateOverlay()
      sortInputValues(prev_el)
    }
  }
}

function uploadClickHandler() {
  const input_el = document.querySelector("#file")
  const input_el_val = input_el.files[0]
  if (input_el_val !== undefined && input_el_val !== null) {
    updateOverlay()
    updateaffirmbtn.addEventListener("click", () => {
      removeUpdateOverlay()
      submitProfileImage(input_el)
    })
  }
}

function sortInputValues(inp) {
  const input_el = inp
  if (input_el.type == "file") {
    submitProfileImage(input_el)
  }
  else {
    const input_el_val = input_el.value
    const input_el_name = input_el.name
    if (input_el_name == "username" || input_el_name == "email") {
      submitUserData(input_el_val, input_el_name)
    }
    else { submitProfileData(input_el_val, input_el_name) }
  }
}

const Title = input => {
  if (typeof (input) === "string") {
    let first_char = input.charAt(0)
    let updated_first_char = first_char.toUpperCase()
    let newString = input.replace(first_char, updated_first_char)
    return newString
  }
  else {
    console.log("fuck off")
  }
}

async function submitUserData(a1, a2) {
  let obj_key = a2
  let value = a1
  const userid = userId()

  if (obj_key == "username") {
    value = Title(a1)
  }

  const databody = {
    [obj_key]: value
  }

  let fieldname = obj_key

  let updateendpoint = `http://127.0.0.1:8000/api/users/updateuserdata/${userid}`
  let req_config = {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
      "fieldname": fieldname
    },
    body: JSON.stringify(databody)
  }

  const res = await fetch(updateendpoint, req_config)
  const res_data = await res.json()
  if (res_data["details"] === "info updated" && res_data["affectedfield"] === "") {
    removeUpdateOverlay()
    updateDom()
  }
  else if (res_data["details"] === "object exists") {
    removeUpdateOverlay()
    showInputError(res_data)
  }
  else {
    removeUpdateOverlay()
    tryagain(res_data)
  }

}

async function showInputError(inp) {
  let field = inp["affectedfield"]
  let inputel = document.querySelector(`[name=${field}]`)
  let inputval = inputel.value

  inputel.style.borderBottom = "0.0625rem solid red"
  inputel.value = ""
  inputel.placeholder = `sorry, ${inputval} already exists`
}

async function tryagain(inp) {
  let field = inp["affectedfield"]
  let inputel = document.querySelector(`[name=${field}]`)
  let inputval = inputel.value

  inputel.style.borderBottom = "0.0625rem solid red"
  inputel.value = ""
  inputel.placeholder = `sorry, try something else`

}

async function submitProfileData(a1, a2) {
  let obj_key = a2
  let value = a1
  const userid = userId()

  const databody = {
    [obj_key]: value
  }

  let updateendpoint = `http://127.0.0.1:8000/api/profiles/updateprofile/${userid}`
  let req_config = {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json",
      "is-image": false,
    },
    body: JSON.stringify(databody)
  }

  const res = await fetch(updateendpoint, req_config)
  const res_data = await res.json()
  console.log(res_data)
  if (res_data["details"] === "profile updated") {
    updateDom()
  }
  else {
    removeUpdateOverlay()
  }
}

async function submitProfileImage(inp) {
  const input_el = inp
  const inputfile = input_el.files[0]
  const userid = userId()

  const databody = new FormData()
  databody.append("profileimage", inputfile)

  const config = {
    method: "PUT",
    headers: {
      "is-image": true
    },
    body: databody
  }

  let updateendpoint = `http://127.0.0.1:8000/api/profiles/updateprofile/${userid}`
  const res = await fetch(updateendpoint, config)
  const res_data = await res.json()
  if (res_data["details"] === "profile updated") {
    updateDom()
  }
  else {
    removeUpdateOverlay()
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

