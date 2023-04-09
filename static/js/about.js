const post_container  = document.getElementById("post-container");
const body_container  = document.getElementById("body-container");
const navbar          = document.getElementById("nav-bar"       );
const settingmenu     = document.getElementById("settings-menu" );
const DarkBtn         = document.getElementById("dark-btn"      );
// const commentList     = document.querySelector (".comments-div" );
const QueryList       = document.getElementById("query-listing" );
const small_info      = document.getElementById("info"          );
const lefty           = document.getElementById("features-left" );
const righty          = document.getElementById("features-right");
const top1            = document.getElementById("only"          );
const bottom          = document.getElementById("only-2"        );  
const lefty2          = document.getElementById("features-left-2" );
const righty2         = document.getElementById("features-right-2");
const lefty3          = document.getElementById("features-left-3" );
const righty3         = document.getElementById("features-right-3");



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

/// toggle effect when typing into query box

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


// hover effect on intro boxes

function mouseenterr(inp1,inp2){
  inp1.classList.replace("features-left","features-right")
  inp2.classList.replace("features-right","features-left")
  return true
}

function mouseleavee(inp1,inp2){
  inp1.classList.replace("features-right","features-left")
  inp2.classList.replace("features-left","features-right")
  return true
}
function mouseenterr2(){
  lefty2.classList.replace("features-right","features-left")
  righty2.classList.replace("features-left","features-right")
  lefty2.firstElementChild.classList.replace("title-2","title")
  lefty2.lastElementChild.classList.replace("info-1","info-2")
  righty2.firstElementChild.classList.replace("title","title-2")
  righty2.lastElementChild.classList.replace("info-2","info-1")
  return true
}

function mouseleavee2(){
  lefty2.classList.replace("features-left","features-right")
  lefty2.firstElementChild.classList.replace("title","title-2")
  lefty2.lastElementChild.classList.replace("info-2","info-1")
  righty2.classList.replace("features-right","features-left")
  righty2.firstElementChild.classList.replace("title-2","title")
  righty2.lastElementChild.classList.replace("info-1","info-2")
  return true
}


function mouseenterr3(){
  lefty3.classList.replace("features-left","features-right")
  lefty3.firstElementChild.classList.replace("title","title-2")
  lefty3.lastElementChild.previousElementSibling.classList.replace("info-2","info-1")
  lefty3.lastElementChild.classList.replace("btn-w","btn-d")
  
  righty3.classList.replace("features-right","features-left")
  righty3.firstElementChild.classList.replace("title-2","title")
  righty3.lastElementChild.previousElementSibling.classList.replace("info-1","info-2")
  righty3.lastElementChild.classList.replace("btn-d","btn-w")
  
  return true
}

function mouseleavee3(){
  lefty3.classList.replace("features-right","features-left")
  lefty3.firstElementChild.classList.replace("title-2","title")
  lefty3.lastElementChild.previousElementSibling.classList.replace("info-1","info-2")
  lefty3.lastElementChild.classList.replace("btn-d","btn-w")


  righty3.classList.replace("features-left","features-right")
  righty3.firstElementChild.classList.replace("title","title-2")
  righty3.lastElementChild.previousElementSibling.classList.replace("info-2","info-1")
  righty3.lastElementChild.classList.replace("btn-w","btn-d")
  return true
}

top1.addEventListener("mouseenter",()=>{
  top1.classList.replace("only","only-js")
  top1.lastElementChild.classList.replace("info-2","info-1")
  top1.firstElementChild.classList.replace("title","title-2")
  mouseenterr(lefty,righty)
})


top1.addEventListener("mouseleave",()=>{
  top1.classList.replace("only-js","only")
  top1.lastElementChild.classList.replace("info-1","info-2")
  top1.firstElementChild.classList.replace("title-2","title")
  mouseleavee(lefty,righty)
})



bottom.addEventListener("mouseenter",()=>{
  bottom.classList.replace("only-2","only-2-js")
  bottom.lastElementChild.classList.replace("info-3","info-2")
  bottom.firstElementChild.classList.replace("title-2","title")
  mouseenterr3()
})


bottom.addEventListener("mouseleave",()=>{
  bottom.classList.replace("only-2-js","only-2")
  bottom.lastElementChild.classList.replace("info-2","info-3")
  bottom.firstElementChild.classList.replace("title","title-2")
  mouseleavee3()
})



lefty.addEventListener("mouseenter",()=>{mouseenterr(lefty,righty)})
lefty.addEventListener("mouseleave",()=>{mouseleavee(lefty,righty)})
righty.addEventListener("mouseenter",()=>{mouseenterr(lefty,righty)})
righty.addEventListener("mouseleave",()=>{mouseleavee(lefty,righty)})
lefty2.addEventListener("mouseenter",mouseenterr2)
lefty2.addEventListener("mouseleave",mouseleavee2)
righty2.addEventListener("mouseenter",mouseenterr2)
righty2.addEventListener("mouseleave",mouseleavee2)
lefty3.addEventListener("mouseenter",mouseenterr3)
lefty3.addEventListener("mouseleave",mouseleavee3)
righty3.addEventListener("mouseenter",mouseenterr3)
righty3.addEventListener("mouseleave",mouseleavee3)

