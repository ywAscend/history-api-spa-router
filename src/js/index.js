import { URL,http} from './api/http'
let contentDom = document.getElementById("contentDetail")
let currentPage,oldPage;

const eventInit = () => {
    let nav = document.getElementById("navContent")
    nav.onclick = e => {
        oldPage = currentPage
        console.log('oldpage',oldPage)
        currentPage = e.target.getAttribute('data')
        console.log('currentpage',currentPage)
        if(oldPage!==currentPage){
            history.pushState({newPage:currentPage},null,`?page=${currentPage}`)
            toggleClass(currentPage)
            addContent({page:currentPage})
        }
    }
}


const addContent = async ({page=0}={}) => {
    let {name} = await http(URL,page)
    contentDom.innerText = name
}

const toggleClass = (currentPage) => {
    let domList = document.getElementsByTagName("li")
    for(let i =0;i<domList.length;i++){
        if( i == currentPage ) continue
        domList[i].classList.remove('active')
    }
    domList[currentPage].classList.toggle('active')
}
//首次加载初始化
const Init =  () => {
    history.replaceState({newPage:0},null,'?page=0')
    toggleClass(0)
    addContent()
}

const popstateInit = () => {
    window.onpopstate = (event)=>{
        let {newPage} = event.state
        console.log(newPage)
        toggleClass(newPage)
        //发起http请求,改变页面
        addContent({page:newPage})
    }
}

const pageInit = () => {
    popstateInit()
    eventInit()
    Init()
}

pageInit()
