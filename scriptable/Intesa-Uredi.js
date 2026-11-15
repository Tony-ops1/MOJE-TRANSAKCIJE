// Intesa-Uredi – ime trgovca popravi lokalno. Znesek in datum ostaneta.
const fm=FileManager.local(),root=fm.documentsDirectory();
const file=fm.joinPath(root,"intesa-transakcije.json"),aliasesFile=fm.joinPath(root,"intesa-imena.json");
const read=(p,fallback)=>{try{return fm.fileExists(p)?JSON.parse(fm.readString(p)):fallback}catch(_){return fallback}};
const rows=read(file,[]);
if(!Array.isArray(rows)||!rows.length){
 const a=new Alert();a.title="Moje transakcije";a.message="Za zdaj ni transakcij.";a.addAction("V redu");await a.presentAlert();
}else{
 let target=null;const id=(args.queryParameters||{}).tx;
 if(id)target=rows.find(r=>String(r.id)===String(id));
 if(!target){
  const recent=rows.slice(0,25),a=new Alert();a.title="Uredi naziv";a.message="Izberi transakcijo.";
  recent.forEach(r=>a.addAction(String(r.description||"Transakcija").slice(0,32)+" · "+Number(r.amount||0).toFixed(2)+" €"));
  a.addCancelAction("Prekliči");
  const selected=await a.presentSheet();
  if(selected>=0&&selected<recent.length)target=recent[selected];
 }
 if(target){
  const a=new Alert();a.title="Spremeni naziv";a.message=target.merchantKey?"Popravek velja tudi za prihodnja plačila istega trgovca.":"Spremeni se samo naziv te transakcije.";
  a.addTextField("Naziv",target.description||"");a.addAction("Shrani");a.addCancelAction("Prekliči");
  if(await a.presentAlert()===0){
   const changed=String(a.textFieldValue(0)||"").replace(/\s+/g," ").trim().slice(0,70);
   if(changed){
    if(target.merchantKey){
     const key=target.merchantKey;
     rows.forEach(r=>{if(r.merchantKey===key)r.description=changed});
     const aliases=read(aliasesFile,{});aliases[key]=changed;
     fm.writeString(aliasesFile,JSON.stringify(aliases));
    }else target.description=changed;
    fm.writeString(file,JSON.stringify(rows));
    const done=new Alert();done.title="Shranjeno";done.message="Naziv: "+changed;done.addAction("V redu");await done.presentAlert();
   }
  }
 }
}
Script.complete();