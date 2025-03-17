async function getQueryIndexJson(jsonUrl,val) {
    let pathName=null;
    if(val){
        pathName=jsonUrl;
    }
    else{
	pathName=new URL(jsonUrl);
}
    const res=await fetch(pathName);
    const json= await res.json();
    return json.data;
}
function getTitle(page){
    return page.title;
}




export default async function decorate(block) {
    const allArticles = block.querySelector('a[href$=".json"]');
    const artcilesJSON = await getQueryIndexJson(allArticles.href, null);
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.classList.add('breadcrumbs');
    const ol = document.createElement('ol');
    const currentPage = window.location.pathname.split('/');
    let pathArray = [];
    let currentPath = '';

    currentPage.forEach((item) => {
        if (item) { 
            currentPath += `/${item}`;
            pathArray.push(`${currentPath}/`);
        }
    });

    pathArray[1] = pathArray[1].replace(/\/$/, ''); 
    const allItems = [];

    pathArray.forEach((path, index) => {
        artcilesJSON.forEach(page => {
            if (page.path === path) {
                const li = document.createElement('li');
                if (index === pathArray.length - 1) {
                    li.textContent = getTitle(page);
                    li.classList.add('active');
                    li.setAttribute('aria-current', 'page');
                } else {
                    const a = document.createElement('a');
                    a.href = `https://main--eds-capstone--sreeakkala10.aem.live${page.path}`;
                    a.textContent = getTitle(page);
                    li.append(a);
                }
                allItems.push(li);
            }
        });
    });

    allItems.forEach(item => {
        ol.append(item);
    });

    const divToRemove = document.querySelector('.button-container');
    if (divToRemove) {
        divToRemove.remove();
    }
    block.textContent=``

    breadcrumbs.append(ol);
    block.append(breadcrumbs);
}
