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
function getDate(page){
    const time=page.lastModified;
    const date = new Date(time * 1000);
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedDateUpper = formattedDate.toUpperCase();
    const finalFormattedDateArray=formattedDateUpper.split(' ');
    finalFormattedDateArray[1]=finalFormattedDateArray[1].replace(',','')
    finalFormattedDateArray[2]=finalFormattedDateArray[2].replace(',','')
    let finalFormattedDate=`${finalFormattedDateArray[0]},${finalFormattedDateArray[1]} ${finalFormattedDateArray[2]} ${finalFormattedDateArray[3]}`
    finalFormattedDate=finalFormattedDate.replace(',','')
    return finalFormattedDate;
}

function createHTML(json){
    const unorderedList=document.createElement('ul');
    const allItems=[];
    json.forEach(page=>{
        if(page.path.startsWith('/magazine/')&&page.path!='/magazine/'){
            const list=document.createElement('li');
            const link=document.createElement('a');
            const title=document.createElement('span');
            title.classList.add('pageTitle');
            const date=document.createElement('span');
            date.classList.add('pageDate');
            title.innerHTML=getTitle(page);
            date.innerHTML=getDate(page);
            link.append(title);
            link.append(date);
            link.href="https://main--eds-capstone--sreeakkala10.aem.live"+page.path;
            list.append(link);
            allItems.push(list);
        }
    })
    const modifiedDate= (list)=>{
        const date=list.querySelector('.pageDate').textContent.trim();
        return new Date(date);
    }
    allItems.sort((a, b) => modifiedDate(b) - modifiedDate(a));
    allItems.forEach(item=>{
        unorderedList.append(item);
    })
    return unorderedList;
}

export default async function decorate(block) {
    const allArticles=block.querySelector('a[href$=".json"]');
    const artcilesJSON= await getQueryIndexJson(allArticles.href,null);
    block.innerHTML='';
    const blockHTML= createHTML(artcilesJSON);
    block.append(blockHTML);
}