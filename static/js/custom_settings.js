const body = document.getElementById("body")
const overlaycontainer = document.getElementById("confirm-overlay")
const confirmdiv = document.getElementById("confirm-div")
const upl_heading = document.getElementById("upl-heading");
const post_container = document.getElementById("post-container");
const body_container = document.getElementById("body-container");
const DarkBtn = document.getElementById("dark-btn");
const QueryList = document.getElementById("query-listing");
const small_info = document.getElementById("info");
const navbar = document.getElementById("nav-bar");
const settingmenu = document.getElementById("settings-menu");


// Toggle effect when user image on navbar is clicked

const SettingsMenuToggle = () => {
  settingmenu.classList.toggle("settings-menu-javascripted")
  settingmenu.onmouseleave = function () {
    settingmenu.classList.toggle("settings-menu-javascripted")
    return true
  }
  return true
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

const hoverBtn = () => {
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

let scrollposi_array= []
const overlayHandler = () => {
  let currentposition= scrollposition()
  scrollposi_array.push(currentposition)
  window.scroll(0,0)
  overlaycontainer.classList.remove("confirm-overlay-js")
  overlaycontainer.classList.add("confirm-overlay")
  confirmdiv.classList.remove("confirm-div-js")
  confirmdiv.classList.add("confirm-div")
  body.style.overflow = "hidden"
  return true
}


// handling the overlay prompt message

const confirmHandler = (id) => {
  const option = document.getElementById(id)
  if (option.textContent === "Back") {
    var lastvalue= scrollposi_array.length - 1
    window.scroll(0,scrollposi_array[lastvalue])
    overlaycontainer.classList.remove("confirm-overlay")
    overlaycontainer.classList.add("confirm-overlay-js")
    confirmdiv.classList.remove("confirm-div")
    confirmdiv.classList.add("confirm-div-js")
    body.style.overflow = "scroll"
  }
  else if (option.textContent === "yes") { window.location.reload() }
}


