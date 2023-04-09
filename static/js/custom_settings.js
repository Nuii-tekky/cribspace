const body = document.getElementById("body")
const overlaycontainer = document.getElementById("confirm-overlay")
const confirmdiv = document.getElementById("confirm-div")
const logoutoverlaycontainer = document.getElementById("confirm-logout-overlay")
const logoutconfirmdiv = document.getElementById("confirm-logout-div")

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

window.onload = checkuserauthenticity

// Toggle effect when user image on navbar is clicked

function SettingsMenuToggle() {
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
  if (localStorage.getItem('theme') == 'light') {localStorage.setItem("theme", "dark") }
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

const QueryListToggle = () => {
  QueryList.classList.toggle("query-list-javascripted")
  small_info.classList.remove("small-info-javascripted")
  small_info.classList.add("small-info")
  QueryList.onmouseleave = () => {
    return QueryList.classList.toggle("query-list-javascripted")
  }
  return true
}

// toggle effect when typing into query box

const ShowInfoToggle = (id) => {
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
      uplbtn.classList.remove("upload-p-img")
      uplbtn.classList.add("upload-p-img-js")
    }
    else {
      upl_heading.textContent = `sorry you cant upload a ${extension} file `
      uplbtn.classList.remove("upload-p-img")
      uplbtn.classList.add("upload-p-img-js")
    }

  }
  else {
    upl_heading.textContent = `your file is okay click upload`
    uplbtn.classList.remove("upload-p-img-js")
    uplbtn.classList.add("upload-p-img")
  }
  return true
})

// handling confirm-div-btn hover effect

const yes_btn = document.getElementById("yes")
const no_btn = document.getElementById("no")


const MouseEnter = () => {
  yes_btn.classList.remove("yes")
  yes_btn.classList.add("yes-js")
  no_btn.classList.remove("no")
  no_btn.classList.add("no-js")
  return true
}
const MouseLeave = () => {
  yes_btn.classList.remove("yes-js")
  yes_btn.classList.add("yes")
  no_btn.classList.remove("no-js")
  no_btn.classList.add("no")
  return true
}

function hoverBtn(){
  yes_btn.onmouseenter = MouseEnter
  yes_btn.onmouseleave = MouseLeave
  no_btn.onmouseenter = MouseEnter
  no_btn.onmouseleave = MouseLeave
}

hoverBtn()

const scrollposition = () => {
  return window.scrollY
}
// overlay effect when user is prompted to confirm changes

let scrollposi_array = []

function overlayHandler(){
  let currentposition = scrollposition()
  scrollposi_array.push(currentposition)
  window.scroll(0, 0)
  overlaycontainer.classList.replace("confirm-overlay-js","confirm-overlay")
  confirmdiv.classList.replace("confirm-div-js","confirm-div")
  body.style.overflow = "hidden"
}

function logoutoverlay(){
  window.scroll(0,0)
  logoutoverlaycontainer.classList.replace("confirm-overlay-js","confirm-overlay")
  logoutconfirmdiv.classList.replace("confirm-div-js","confirm-div")
  body.style.overflow = "hidden"
}

// handling the overlay prompt message

function confirmchangesHandler(id){
  const option = document.getElementById(id)
  if (option.textContent === "cancel") {
    var lastvalue = scrollposi_array.length - 1
    window.scroll(0, scrollposi_array[lastvalue])
    overlaycontainer.classList.replace("confirm-overlay", "confirm-overlay-js")
    confirmdiv.classList.replace("confirm-div", "confirm-div-js")
    body.style.overflow = ""
  }
  else if (option.textContent === "yes") { window.location.reload() }
}

async function confirmlogouthandler(id){
  const option = document.getElementById(id)
  if (option.textContent === "cancel") {
    logoutoverlaycontainer.classList.replace("confirm-overlay", "confirm-overlay-js")
    logoutconfirmdiv.classList.replace("confirm-div", "confirm-div-js")
    body.style.overflow = ""
  }
  else{
    sessionStorage.removeItem("token")
    window.location.reload()
  }
}

function renderredirector() {
  window.location.replace(redirectendpoint)
}

function loadurl(url) {
  let endpoint = url
  window.location.replace(endpoint)
}

const usertoken = () => {
  const token = sessionStorage.getItem("token")
  return token
}

const userid=()=>{
  const userid= sessionStorage.getItem("id_user")
  return userid
}

const fetchuserdata=async ()=>{
  let token= usertoken()
  let getuserendpoint= "http://127.0.0.1:8000/api/getbasicuserdata"
  let response= await fetch(getuserendpoint,{
    method:"GET",
    headers:{
      "Authorization": token
    }
  })
  let responsedata=await response.json()
  return responsedata
}

const fetchuserprofiledata=async()=>{
  let id_access= userid()
  let endpoint= "http://127.0.0.1:8000/api/getprofiledata"
  let request_params= {
    method:"GET",
    headers:{
      "Accept":"application/json",
      "iduser":`${id_access}`
    }
  }
  let res     = await fetch(endpoint,request_params)
  let res_data= await res.json()
  return res_data
}

async function updatedom(){
  const profiledata    = await fetchuserprofiledata()
  const userdata       = await fetchuserdata()

  const username       = await userdata["details"]["username"]
  const email          = await userdata["details"]["email"]
  const profileimgurl  = await profiledata["details"]["profileimage"]
  const bio            = await profiledata["details"]["bio"]
  const location       = await profiledata["details"]["location"]
  const occupation     = await profiledata["details"]["occupation"]
  const telephone      = await profiledata["details"]["telephone"]

  const profileimgs    = document.querySelectorAll(".profile-img")
  const usernamespots  = document.querySelectorAll(".username")

  const bioinput       = document.getElementById("bio-input")
  const usernameinput  = document.getElementById("username-input")
  const emailinput     = document.getElementById("email-input")
  const occupationinput= document.getElementById("occupation-input")
  const locationinput  = document.getElementById("location-input")
  const telephoneinput = document.getElementById("telephone-input")

  profileimgs.forEach((profileimg)=>{
    profileimg.src=profileimgurl
  })

  usernamespots.forEach((usernameitem)=>{
    usernameitem.textContent=`${username}`
  })

  usernameinput.placeholder=`${username}`
  emailinput.placeholder=`${email}`
  bioinput.placeholder=`${bio}`
  occupationinput.placeholder=`${occupation}`
  locationinput.placeholder=`${location}`
  telephoneinput.placeholder=`+234 ${telephone}`
}


async function checkuserauthenticity() {
  if (!sessionStorage.getItem("token") || !sessionStorage.getItem("id_user")){
    renderredirector()
  }
  else{
    updatedom()
  }
}

async function fetchpage(pagename,is_logout) {
  let redirect = pagename
  let access = usertoken()
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
    loadurl(url)
  }
  else {
    let data = await response.json()
    console.log(data)
  }
}


//   </form>
//   <button onclick="send()" id="submit-btn">Post image</button>
//   <h5 id="message">please make sure the image is less than 10mb</h5>


//   <script>
//     const image_input = document.getElementById("target_img")
//     const image_title = document.getElementById("img_title")
//     const message = document.getElementById("message")

//     async function send() {

//       let p_image = image_input.files[0];
//       let p_title = image_title.value;

//       console.log(p_image)
//       let form = new FormData()
//       form.append("title", Title(p_title));
//       form.append("img", p_image);
//       form.append("csrfmiddlewaretoken", "{{ csrf_token }}");
//       console.log(form)

//       let image_endpoint = "http://127.0.0.1:8000/api/upload-image"

//       const response = await fetch(
//         image_endpoint,
//         {
//           method: "POST",
//           headers: {
//             "hello": "hi python terminal"
//           },
//           body: form
//         },

//       )

//       const data = await response.json()

//       if (data["saved"] === "image saved") {
//         message.style.color = "yellowgreen"
//         message.textContent = "image uploaded successfully 🎷🎷🎷"
//       }
//       else if(data["saved"] === "image not saved"){
//         message.style.color = "rgb(255, 218, 9)"
//         message.textContent = "image upload failed "
//       }
//       else if(data["saved"]=== "object exists"){
//         message.style.color = "rgb(255, 218, 9)"
//         message.textContent = "Sorry that title already exists in our database"
//       }
//     }
