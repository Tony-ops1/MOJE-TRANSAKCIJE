// Intesa-Shrani – prejme besedilo obvestila iz Apple Bližnjic.
// Zapisuje samo v FileManager.local() na iPhonu.
const fm=FileManager.local(),root=fm.documentsDirectory();
const dataFile=fm.joinPath(root,"intesa-transakcije.json");
const aliasesFile=fm.joinPath(root,"intesa-imena.json");
const received=new Date();
const raw=args.shortcutParameter;
const input=typeof raw==="string"?raw:String(raw==null?"":raw);
const tidy=s=>String(s||"").replace(/\s+/g," ").trim();
const read=(path,fallback)=>{try{return fm.fileExists(path)?JSON.parse(fm.readString(path)):fallback;}catch(_){return fallback;}};
function sumHash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return String(h>>>0)}
function getAmount(s){
 const m=s.match(/(?:^|[^\w\d])((?:\d{1,3}(?:[.\s]\d{3})+|\d+)(?:[,.]\d{2}))\s*(?:EUR\b|€)/i);
 if(!m)return null;
 let n=m[1].replace(/\s/g,"");
 n=n.lastIndexOf(",")>n.lastIndexOf(".")?n.replace(/\./g,"").replace(",","."):n.replace(/,/g,"");
 const v=Number(n);return Number.isFinite(v)&&v>0&&v<100000000?Math.round(v*100)/100:null;
}
function getDate(s){
 const m=s.match(/\b(\d{1,2})\.(\d{1,2})\.(20\d{2})\s+(\d{1,2}):(\d{2})(?::(\d{2}))?/);
 if(!m)return received.toISOString();
 const d=new Date(+m[3],+m[2]-1,+m[1],+m[4],+m[5],+(m[6]||0));
 return isNaN(d)?received.toISOString():d.toISOString();
}
function getMerchant(s){
 const t=tidy(s);
 let m=t.match(/\bprejemnik\s+([^.;]+)/i);
 if(!m)m=t.match(/(?:^|:)\s*(?:VI|MC|MA|VISA|MASTERCARD)\s*-\s*([^,;]+)/i);
 if(!m)return null;
 let name=tidy(m[1]).replace(/\s+(?:SLOVENIJA\s+)?D\s*\.?\s*O\s*\.?\s*O\s*\.?\s*K?\s*\.?$/i,"").trim();
 if(!name||name.length>100)return null;
 const upper=name.toLocaleUpperCase("sl-SI");
 const map=[[/\bLIDL\b/,"Lidl"],[/\bHOFER\b/,"Hofer"],[/\bMERCATOR\b/,"Mercator"],[/\bSPAR\b/,"Spar"],[/\bPETROL\b/,"Petrol"]];
 for(const [pattern,alias] of map)if(pattern.test(upper))return {key:upper.replace(/[^0-9A-ZČŠŽ]/g,""),name:alias};
 name=name.toLocaleLowerCase("sl-SI").replace(/(^|[\s-])([a-zčšžđć])/g,(_,p,c)=>p+c.toLocaleUpperCase("sl-SI"));
 return {key:upper.replace(/[^0-9A-ZČŠŽ]/g,""),name};
}
function classify(s,merchant){
 const low=s.toLocaleLowerCase("sl-SI");
 if(/nov dokument|arhiv|prijav|gesl|koda za|potrditven|verifikac|enkratn|\bpin\b|varnostn/.test(low))return null;
 if(/bankomat|\batm\b|dvig.{0,40}gotovin/.test(low))return "atm";
 if(/priliv|prejet.{0,40}(nakazil|plačil)|dobropis/.test(low))return "priliv";
 if(/prenos sredstev|lastni.{0,20}račun|med račun/.test(low))return "prenos";
 if(/\bpos\b|nakup|trgovin|plačilo s kartico|placilo s kartico/.test(low))return "pos";
 if(merchant&&(/\bvi-|\bmc-|\bma-|prejemnik/i.test(s)||/kartic|transakcij/.test(low)))return "pos";
 if(/odliv|nakazil|nalog|plačilo predračuna|plačilo računa/.test(low))return "odliv";
 if(/kartic|transakcij/.test(low))return "kartica";
 return null;
}
const amount=getAmount(input),merchant=getMerchant(input),kind=classify(input,merchant);
if(amount===null||!kind){
 Script.setShortcutOutput("Prezrto: brez prepoznane transakcije");
}else{
 const rows=read(dataFile,[]),aliases=read(aliasesFile,{});
 const list=Array.isArray(rows)?rows:[];
 const fingerprint=sumHash(tidy(input).toLocaleLowerCase("sl-SI"));
 const duplicate=list.some(r=>r.fingerprint===fingerprint&&Math.abs(received-new Date(r.receivedAt||r.date))<20000);
 if(duplicate){Script.setShortcutOutput("Ponovljeno obvestilo");}
 else{
  const defaultName={pos:"Plačilo s kartico",atm:"Dvig gotovine",priliv:"Priliv",odliv:"Bančni odliv",prenos:"Prenos sredstev",kartica:"Kartična transakcija – preveri"};
  const row={id:String(received.getTime())+"-"+Math.floor(Math.random()*1e9),date:getDate(input),receivedAt:received.toISOString(),kind,amount,
   description:(merchant&&aliases[merchant.key])||(merchant&&merchant.name)||defaultName[kind],merchantKey:merchant?merchant.key:null,
   fingerprint,source:"intesa-obvestilo",review:kind==="kartica"};
  list.unshift(row);fm.writeString(dataFile,JSON.stringify(list));
  Script.setShortcutOutput("Shranjeno: "+row.description+" "+amount.toFixed(2)+" EUR");
 }
}
Script.complete();