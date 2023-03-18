const post_container = document.getElementById("post-container");
const body_container = document.getElementById("body-container");
const navbar         = document.getElementById("nav-bar"       );
const settingmenu    = document.getElementById("settings-menu" );
const DarkBtn        = document.getElementById("dark-btn"      );
const commentList    = document.querySelector (".comments-div" );
const QueryList      = document.getElementById("query-listing" );
const small_info     = document.getElementById("info"          );
const caution        = document.querySelector ("#caution-text" );
const mainpostbtn    = document.querySelector ("#submit-post"  );




// Toggle effect when user image on navbar is clicked

const SettingsMenuToggle = () => {
  settingmenu.classList.toggle("settings-menu-javascripted")
  settingmenu.onmouseleave = function(){
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
  small_info.classList.add("info")
  QueryList.onmouseleave = ()=> {
    return QueryList.classList.toggle("query-list-javascripted")
  }
  return true
}


// toggle effect when comment icon is clicked

const ShowCommentsToggle = () => {
  commentList.classList.toggle("comments-div-js")
  post_container.onmouseleave = ()=> {
    commentList.classList.remove("comments-div-js")
    return true
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




// file input functionality

const file = document.querySelector("#file")
file.addEventListener("change",(e)=>{
  // list of allowed file types
  const allowed_ext= ['img','png','jpg','jpeg','gif','svg']

  // get the selected files
  const [file_select] = e.target.files

  // get the filename and size from the constant created above
  const {name: Filename,size}= file_select

  // convert size in bytes to kilobytes>
  const Filesize= (size/100).toFixed(2)

  // get the extension of the file
  const regex= new RegExp('[^.]+$')
  const extension= Filename.match(regex)

  // write complete file name to the div for such
  const FileNameandSize= `${Filename} | ${Filesize}kb `
  if(Filesize >= 40300 || allowed_ext.includes(`${extension}`)=== false){
    caution.textContent= 'please make sure you selected an image file'
    caution.classList.remove("caution")
    caution.classList.add("caution-red")
    mainpostbtn.classList.remove("post-send")
    mainpostbtn.classList.add("string")
    document.querySelector("#filename").textContent = ''
  }
  else{
    document.querySelector("#filename").textContent = FileNameandSize  
    mainpostbtn.classList.remove("string")
    mainpostbtn.classList.add("post-send")
    caution.classList.remove("caution-red")
    caution.classList.add("caution")
    caution.textContent="...your file is okay,click post"
  }
  return true
})

