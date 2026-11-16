// Intesa-Namesti – namesti javne skripte iz lastnega repozitorija na ta iPhone.
// Prenese samo kodo. Ne bere in ne pošilja bančnih transakcij.
const fm=FileManager.local();
const root=fm.documentsDirectory();
const base="https://raw.githubusercontent.com/Tony-ops1/MOJE-TRANSAKCIJE/main/scriptable/";
const names=["Intesa-Shrani","Intesa-Pregled","Intesa-Uredi"];
const existing=names.filter(n=>fm.fileExists(fm.joinPath(root,n+".js")));
const confirm=new Alert();
confirm.title="Moje transakcije";
confirm.message="Namestim tri skripte lokalno na ta iPhone. "+(existing.length?"Obstoječi skripti bodo zamenjani: "+existing.join(", ")+". ":"")+"Tvoje transakcije se ne izbrišejo.";
confirm.addAction("Namesti");confirm.addCancelAction("Prekliči");
if(await confirm.presentAlert()===0){
  const downloaded=[];
  try{
    for(const name of names){
      const req=new Request(base+name+".js");
      req.timeoutInterval=15;
      const code=await req.loadString();
      if(!code.includes("FileManager.local()")||code.length<300)throw new Error("Neveljavna vsebina "+name);
      downloaded.push([name,code]);
    }
    for(const [name,code] of downloaded){
      fm.writeString(fm.joinPath(root,name+".js"),code);
    }
    const success=new Alert();
    success.title="Namestitev je uspela";
    success.message="Skripti Intesa-Shrani, Intesa-Pregled in Intesa-Uredi so nameščeni. Zdaj v Bližnjicah nastavi sprožilec Obvestilo → Intesa, ki zažene Intesa-Shrani in mu preda besedilo obvestila.";
    success.addAction("V redu");await success.presentAlert();
  }catch(e){
    const error=new Alert();error.title="Napaka pri namestitvi";
    error.message=String(e)+"\nPreveri spletno povezavo in poskusi ponovno.";
    error.addAction("V redu");await error.presentAlert();
  }
}
Script.complete();
