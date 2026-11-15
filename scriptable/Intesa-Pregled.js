// Intesa-Pregled – prenese samo JAVNO HTML predlogo, podatki ostanejo na iPhonu.
const fm=FileManager.local(),root=fm.documentsDirectory();
const file=fm.joinPath(root,"intesa-transakcije.json"),cache=fm.joinPath(root,"intesa-vmesnik-cache.html");
const page="https://tony-ops1.github.io/MOJE-TRANSAKCIJE/";
const marker="<!--INTESA_DATA_SLOT-->";
let rows=[];try{if(fm.fileExists(file)){const data=JSON.parse(fm.readString(file));if(Array.isArray(data))rows=data}}catch(_){}
let html="";
try{
 const req=new Request(page);req.timeoutInterval=8;
 const fetched=await req.loadString();
 if(!fetched.includes(marker))throw new Error("Neveljavna HTML predloga");
 html=fetched;fm.writeString(cache,html);
}catch(_){
 try{if(fm.fileExists(cache)){const saved=fm.readString(cache);if(saved.includes(marker))html=saved}}catch(_){}
}
if(!html){
 const a=new Alert();a.title="Moje transakcije";
 a.message="Predloga še ni na voljo. Enkrat odpri spletno stran GitHub Pages ob vključeni internetni povezavi.";
 a.addAction("V redu");await a.presentAlert();Script.complete();
}else{
 // Varno vstavimo lokalne podatke samo v pomnilnik WebView; ne v naslov URL ali na GitHub.
 const safe=JSON.stringify(rows).replace(/&/g,"\\u0026").replace(/</g,"\\u003c").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");
 html=html.replace(marker,'<script>window.__INTESA_LOCAL__=true;window.__INTESA_ROWS__='+safe+';<\/script>');
 const web=new WebView();
 web.shouldAllowRequest=request=>{
   const u=request&&request.url?String(request.url):"";
   return u.startsWith("about:")||u.startsWith("data:")||u.startsWith("scriptable:");
 };
 await web.loadHTML(html);
 await web.present(false);
 Script.complete();
}