 
const post_container = document.querySelector("#post-container");
const body_container = document.querySelector("#body-container");
const navbar         = document.querySelector("#nav-bar"       );
const settingmenu    = document.querySelector("#settings-menu" );
const DarkBtn        = document.querySelector("#dark-btn"      );
const commentList    = document.querySelector (".comments-div" );
const QueryList      = document.querySelector("#query-listing" );
const small_info     = document.querySelector("#info"          );
const caution        = document.querySelector ("#caution-text" );
const mainpostbtn    = document.querySelector ("#submit-post"  );
const lovebtn        = document.querySelector("#love"          );



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

// react btn functionality
lovebtn.onclick=()=>{
  lovebtn.classList.toggle("hate")
  return true
}




