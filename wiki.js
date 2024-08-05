const List = document.getElementById("list");
const Files = {};
const SubFiles = {};
const WhitespaceTags = ["PRE","H1","H2","H3","H4","H5","H6","LI"];
const WikiSubpages = {};

function RemoveNewlines(Element){
	if(WhitespaceTags.includes(Element.tagName)){
		let Next = Element.nextSibling;
		if(!Next||Next.tagName)return;
		Next.textContent=Next.textContent.replace(/^[\n\r]/,"")
	}
}

async function CheckHash(){
	window.SVars={};
	let Hash = window.location.hash;
	let RHash = Hash;
	if(Hash.length<1)Hash="#home";
	Hash = Hash.substring(1);
	if(Hash.length<1)Hash="home";
	let Split = Hash.split(":")
	Hash = Split[0];
	let Sub = Split[1];
	let Title = Files[Hash]||"Title";
	let Url = `https://raw.githubusercontent.com/FIREYAUTO/DistrictCascade/main/wikipages/${Hash}.txt`;
	if(Sub){
		Url = `https://raw.githubusercontent.com/FIREYAUTO/DistrictCascade/main/wikisubpages/${Hash}/${Sub}.txt`;
		console.log(SubFiles);
		Title = SubFiles[Hash][Sub]||"Title"
	}
	try{
		let Response = await fetch(Url);
		Response = await Response.text();
		Response = `# ${Title}\n${Response}\n\n\n\n`;
		if(window.WikiParse){
			let Side = document.getElementById("side");
			Side.innerHTML = window.WikiParse(Response);
			for(let C of Side.childNodes)
				RemoveNewlines(C);
		}
	}catch(E){
		console.error(E);
	}
	ClearActiveWikis();
	for(let C of List.childNodes)
		if(C.href&&C.href.match(new RegExp(`#${Hash}$`,""))){AddActiveWiki(C,Hash,Sub);break}
}

function AddActiveWiki(E,Hash,Sub){
	let SubPages = WikiSubpages[Hash];
	if(SubPages){
		console.log(SubPages,Hash);
		for(let Item of SubPages){
			let [Name,Link] = Item;
			Element = document.createElement("a");
			Element.href = `#${Hash}:${Link}`;
			Element.innerHTML = Name;
			Element.insertAfter(E);
		}
	}
	if(Sub)return;
	if(!E.classList.contains("active-wiki")){
		E.classList.add("active-wiki");
	}
}

function RemoveActiveWiki(E){
	if(E.classList.contains("active-wiki"))
		E.classList.remove("active-wiki");
}

function ClearActiveWikis(E){
	for(let C of List.childNodes)
		if(C==E)continue;
		else RemoveActiveWiki(C);
}

window.addEventListener("load",async()=>{
	try{
		let Response = await fetch(`https://raw.githubusercontent.com/FIREYAUTO/DistrictCascade/main/scripts/files.json`);
			Response = await Response.json();
		for(let Item of Response){
			let [Name,Link,SubPages] = Item;
			let Element;
			if(SubPages){
				console.log(Name,Link,SubPages);
				WikiSubpages[Link] = SubPages;
				let SubFile = {};
				SubFiles[Link] = SubFile;
				for(let I of SubPages){
					SubFile[I[1]] = I[0]
				}
			}
			if(Link===true){
				Element = document.createElement("span")
				Element.innerHTML = Name;
				Element.classList.add("list-category");
			}else{
				Element = document.createElement("a");
				Element.href = `#${Link}`;
				Element.innerHTML = Name;
				Files[Link]=Name;
			}
			List.appendChild(Element);
		}
	}catch(E){
		console.error(E);
	}
	CheckHash();
});
window.addEventListener("hashchange",CheckHash);