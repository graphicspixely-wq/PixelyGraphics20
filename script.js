const CONFIG={whatsapp:"94783120236",bank:{name:"Commercial Bank",accountName:"PixelyGraphics",accountNumber:"0000000000",branch:"Colombo"}};
const products=[
{id:"LG-001",category:"Logo",title:"Minimal Brand Mark",price:"Rs. 3,500",description:"A clean and memorable logo concept designed to give a brand a confident, modern identity.",image:"assets/artworks/logo-01.svg"},
{id:"SM-001",category:"Social Media Posts",title:"Modern Social Set",price:"Rs. 2,500",description:"A polished social media visual system for campaigns, announcements and brand content.",image:"assets/artworks/social-01.svg"},
{id:"FL-001",category:"Flyers",title:"Bold Business Flyer",price:"Rs. 2,500",description:"A sharp promotional flyer layout with strong hierarchy and easy-to-scan information.",image:"assets/artworks/flyer-01.svg"},
{id:"PO-001",category:"Posters",title:"Editorial Poster",price:"Rs. 3,000",description:"A striking poster composition made for events, promotions and creative campaigns.",image:"assets/artworks/poster-01.svg"},
{id:"BC-001",category:"Business Cards",title:"Premium Business Card",price:"Rs. 1,500",description:"A refined business card design that keeps your identity clean, professional and memorable.",image:"assets/artworks/business-card-01.svg"},
{id:"YT-001",category:"YouTube Thumbnails",title:"High Impact Thumbnail",price:"Rs. 1,500",description:"A click-focused YouTube thumbnail concept with strong typography and visual contrast.",image:"assets/artworks/youtube-01.svg"},
{id:"IN-001",category:"Invitations",title:"Elegant Invitation",price:"Rs. 2,500",description:"A sophisticated invitation design for celebrations, events and special occasions.",image:"assets/artworks/invitation-01.svg"},
{id:"BA-001",category:"Banners",title:"Campaign Banner",price:"Rs. 2,500",description:"A versatile banner design prepared for web, social media or promotional use.",image:"assets/artworks/banner-01.svg"},
{id:"AC-001",category:"Album Covers",title:"Monochrome Album",price:"Rs. 3,500",description:"A bold cover concept built around atmosphere, typography and visual storytelling.",image:"assets/artworks/album-01.svg"}];
let activeCategory="All",selectedProduct=null;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function toast(m){let t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function artwork(p){return `<div class="placeholder-art"><span>PIXELYGRAPHICS</span><strong>${p.category.split(" ")[0].toUpperCase()}</strong><small>${p.id}</small></div>`}
function renderFilters(){let cs=["All",...new Set(products.map(p=>p.category))];$("#filters").innerHTML=cs.map(c=>`<button class="${c===activeCategory?"active":""}" data-cat="${c}">${c}</button>`).join("");$$("[data-cat]").forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat;renderFilters();renderProducts()})}
function renderProducts(){let q=$("#searchInput").value.toLowerCase().trim();let list=products.filter(p=>(activeCategory==="All"||p.category===activeCategory)&&(!q||`${p.title} ${p.category} ${p.id}`.toLowerCase().includes(q)));$("#productGrid").innerHTML=list.map(p=>`<article class="product-card" data-id="${p.id}"><button class="fav">♡</button><div class="product-image">${artwork(p)}</div><div class="product-info"><small>${p.category}</small><h3>${p.title}</h3><div class="price-row"><span class="price">${p.price}</span><button class="view-btn" data-view="${p.id}">View ↗</button></div></div></article>`).join("");$("#emptyState").hidden=!!list.length;$$(".product-card").forEach(c=>c.onclick=e=>{if(!e.target.closest(".fav")&&!e.target.closest("[data-view]"))openProduct(c.dataset.id)});$$("[data-view]").forEach(b=>b.onclick=e=>{e.stopPropagation();openProduct(b.dataset.view)});$$(".fav").forEach(b=>b.onclick=e=>{e.stopPropagation();b.textContent=b.textContent==="♡"?"♥":"♡";toast(b.textContent==="♥"?"Added to favorites":"Removed from favorites")})}
function openProduct(id){selectedProduct=products.find(p=>p.id===id);$("#detailCategory").textContent=selectedProduct.category;$("#detailTitle").textContent=selectedProduct.title;$("#detailDescription").textContent=selectedProduct.description;$("#detailPrice").textContent=selectedProduct.price;$("#detailImage").innerHTML=artwork(selectedProduct);$("#productModal").classList.add("open")}
function closeModal(id){$("#"+id).classList.remove("open")}
$("#detailOrder").onclick=()=>{closeModal("productModal");$("#selectedSummary").textContent=`${selectedProduct.title} • ${selectedProduct.category} • ${selectedProduct.price} • ID: ${selectedProduct.id}`;$("#orderModal").classList.add("open")};
$("#detailShare").onclick=async()=>{let url=location.href.split("#")[0]+"#"+selectedProduct.id;if(navigator.share)await navigator.share({title:selectedProduct.title,text:`${selectedProduct.title} — PixelyGraphics`,url});else{await navigator.clipboard.writeText(url);toast("Design link copied")}};
$$("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));$$(".modal-backdrop").forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove("open")});
function message(d){return `PIXELYGRAPHICS — NEW ORDER

Hello PixelyGraphics,
I would like to place an order.

CUSTOMER DETAILS
Name: ${d.name}
WhatsApp: ${d.phone}
Email: ${d.email||"Not provided"}
Preferred Delivery Date: ${d.date||"Not specified"}

ORDER DETAILS
Design: ${selectedProduct.title}
Category: ${selectedProduct.category}
Product ID: ${selectedProduct.id}
Price: ${selectedProduct.price}

CUSTOM REQUIREMENTS
${d.requirements||"No additional requirements."}

PAYMENT
I will complete the bank payment and send the payment slip in this WhatsApp chat.

Thank you,
PixelyGraphics Customer`}
$("#orderForm").onsubmit=e=>{e.preventDefault();let d=Object.fromEntries(new FormData(e.target).entries());window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message(d))}`,"_blank")};
$("#copyBank").onclick=async()=>{let x=`Bank: ${CONFIG.bank.name}\nAccount Name: ${CONFIG.bank.accountName}\nAccount Number: ${CONFIG.bank.accountNumber}\nBranch: ${CONFIG.bank.branch}`;try{await navigator.clipboard.writeText(x);toast("Bank details copied")}catch{toast("Please copy the details manually")}};
$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");$("#themeBtn").textContent=document.body.classList.contains("dark")?"☾":"☼";localStorage.setItem("pg-theme",document.body.classList.contains("dark")?"dark":"light")};
if(localStorage.getItem("pg-theme")==="dark"){document.body.classList.add("dark");$("#themeBtn").textContent="☾"}
$("#searchInput").oninput=renderProducts;
$("#floatingWa").onclick=()=>window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hello PixelyGraphics, I would like to discuss a design project.")}`,"_blank");
$("#year").textContent=new Date().getFullYear();renderFilters();renderProducts();
