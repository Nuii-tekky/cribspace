const body = document.getElementById("body")
const overlaycontainer = document.getElementById("confirm-overlay")
const confirmdiv = document.getElementById("confirm-div")
const logoutoverlaycontainer = document.getElementById("confirm-logout-overlay")
const logoutconfirmdiv = document.getElementById("confirm-logout-div")
const updateaffirmbtn= document.getElementById("upt-affirm")
const logoutaffirmbtn= document.getElementById("log-affirm")

const upl_heading = document.getElementById("upl-heading");
const post_container = document.getElementById("post-container");
const body_container = document.getElementById("body-container");
const DarkBtn = document.getElementById("dark-btn");
const QueryList = document.getElementById("query-listing");
const small_info = document.getElementById("info");
const navbar = document.getElementById("nav-bar");

const settingmenu = document.getElementById("settings-menu");
const redirectendpoint = "http://127.0.0.1:8000/auth/redirector"
const authendpoint = "http://127.0.0.1:8000/auth/authuser"
const getuserendpoint = "http://127.0.0.1:8000/api/getbasicuserdata"

window.onload = checkUserAuthenticity

// Toggle effect when user image on navbar is clicked

function settingsMenuToggle() {
  settingmenu.classList.toggle("settings-menu-javascripted")
  settingmenu.onmouseleave = function () {
    settingmenu.classList.toggle("settings-menu-javascripted")
    return true
  }
}

// Toggle the dark mode btn

DarkBtn.onclick = function () {
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

const queryListToggle = () => {
  QueryList.classList.toggle("query-list-javascripted")
  small_info.classList.remove("small-info-javascripted")
  small_info.classList.add("small-info")
  QueryList.onmouseleave = () => {
    return QueryList.classList.toggle("query-list-javascripted")
  }
  return true
}

// toggle effect when typing into query box

const showInfoToggle = (id) => {
  const searchinput = document.getElementById(id)
  let value = searchinput.value
  if (value === null || value === '' || value === undefined) {
    small_info.classList.remove("small-info-javascripted")
    small_info.classList.add("small-info")
    console.log("console is working")
  }
  else if (value.length >= 2) {
    small_info.classList.remove("info")
    small_info.classList.add("small-info-javascripted")
  }
  return true
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
  const uplbtn = document.getElementById("upload-p-img")
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

const yes_btn = document.getElementById("yes")
const no_btn = document.getElementById("no")


function MouseEnter() {
  yes_btn.classList.remove("yes")
  yes_btn.classList.add("yes-js")
  no_btn.classList.remove("no")
  no_btn.classList.add("no-js")
  return true
}
function MouseLeave() {
  yes_btn.classList.remove("yes-js")
  yes_btn.classList.add("yes")
  no_btn.classList.remove("no-js")
  no_btn.classList.add("no")
  return true
}

function hoverBtn() {
  yes_btn.onmouseenter = MouseEnter
  yes_btn.onmouseleave = MouseLeave
  no_btn.onmouseenter = MouseEnter
  no_btn.onmouseleave = MouseLeave
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

function removeLogoutOverlay(){
  overlaycontainer.classList.replace("confirm-overlay", "confirm-overlay-js")
  confirmdiv.classList.replace("confirm-div", "confirm-div-js")
  let lastvalue = scrollposi_array.length - 1
  window.scroll(0, scrollposi_array[lastvalue])
  body.style.overflow = ""
}

// updating details

function submitClickHandler(id){
  const btn_el = document.querySelector(`#${id}`)
  const prev_el= btn_el.previousElementSibling
  const prev_el_val= prev_el.value
  if(prev_el_val !== undefined && prev_el_val !== ""){
    updateOverlay()
    updateaffirmbtn.addEventListener("click",()=>{
      sortInputValues(prev_el)
    })
  }
  else{removeUpdateOverlay()}
}

function sortInputValues(inp){
  const input_el= inp
  if(input_el.type == "file"){
    submitFile(input_el)
  }
  else{
    const input_el_val= input_el.value
    const input_el_name= input_el.name
    submitData(input_el_val,input_el_name)
  }
}

function submitData(a1,a2){
  const key= a2
  const value=a1

  const databody= {
    key:value
  }

  let 
}

// Page onload workings 
function removeToken(){
  sessionStorage.removeItem("token")
  window.location.reload()
}

function renderRedirector() {
  window.location.replace(redirectendpoint)
}

function loadUrl(url) {
  let endpoint = url
  window.location.replace(endpoint)
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

async function updateDom() {
  const profiledata = await userProfileData()
  const userdata = await userData()

  const username = await userdata["details"]["username"]
  const email = await userdata["details"]["email"]
  const profileimgurl = await profiledata["details"]["profileimage"]
  const bio = await profiledata["details"]["bio"]
  const location = await profiledata["details"]["location"]
  const occupation = await profiledata["details"]["occupation"]
  const telephone = await profiledata["details"]["telephone"]

  const profileimgs = document.querySelectorAll(".profile-img")
  const usernamespots = document.querySelectorAll(".username")
  const domtitle = document.getElementById("domtitle")

  const bioinput = document.getElementById("bio-input")
  const usernameinput = document.getElementById("username-input")
  const emailinput = document.getElementById("email-input")
  const occupationinput = document.getElementById("occupation-input")
  const locationinput = document.getElementById("location-input")
  const telephoneinput = document.getElementById("telephone-input")

  profileimgs.forEach((profileimg) => {
    profileimg.src = profileimgurl
  })

  usernamespots.forEach((usernameitem) => {
    usernameitem.textContent = `${username}`
  })

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

