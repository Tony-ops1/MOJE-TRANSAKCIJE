# MOJE-TRANSAKCIJE — preprosta HTML evidenca za Inteso

GitHub Pages gosti samo **HTML/CSS/JavaScript**. Podatki o transakcijah ostanejo v **lokalni shrambi Safarija** na tvojem iPhonu. Ni spletne baze, Scriptable ni več potreben.

## Odpri aplikacijo

https://tony-ops1.github.io/MOJE-TRANSAKCIJE/

## Samodejni prejem prek iOS 27 Bližnjic

V aplikaciji odpri **⚙️ Poveži Intesina obvestila** ali stran https://tony-ops1.github.io/MOJE-TRANSAKCIJE/namesti.html .

1. V Bližnjicah dodaj sprožilec **Notification (Obvestilo)** za Intesa Sanpaolo, če ga iPhone omogoča.
2. Dodaj dejanje **URL Encode** z vhodom **Notification → Body**.
3. Dodaj dejanje **Text**: `https://tony-ops1.github.io/MOJE-TRANSAKCIJE/#tx=` in takoj za znakom `=` vstavi rezultat prejšnjega dejanja.
4. Dodaj dejanje **Open URLs** z vhodom Text.
5. Shrani avtomatizacijo in preizkusi naslednje bančno obvestilo.

HTML stran iz fragmenta URL (`#tx=`) prebere obvestilo, izlušči znesek, vrsto in trgovca, ustvari lokalni zapis, nato fragment takoj odstrani iz naslovne vrstice. Fragment ni poslan strežniku z običajno HTTP zahtevo. **Kljub temu je posredovanje obvestila skozi URL občutljivejše kot izključno lokalen App Intent:** lahko se na kratko pojavi v naslovni vrstici ali zgodovini telefona, zato uporabnik prevzame to omejitev. Ne predajaj PIN-ov ali kod.

## Omejitve iPhona in zasebnost

- **GitHub Pages ne more neposredno brati obvestil ali pisati v lokalno shrambo, ko Safari ni odprt.** Za zapis mora Bližnjica odpreti stran v Safariju. Pri zaklenjenem telefonu iOS to lahko prepreči. Zato ni zagotovljen popolnoma neslišen zajem vsake transakcije.
- Spletna aplikacija, dodana na začetni zaslon, lahko uporablja *drugo* lokalno shrambo kot Safari. Zaradi enotne evidence uporabljaj **Safari**.
- Bančna obvestila niso nujno enaka končnim knjiženim transakcijam in ne povedo vedno vseh podatkov. Dvigi ATM niso samodejno izdatki.
- Če počistiš podatke Safarija, lahko izgubiš evidenco. Uporabi **Shrani kopijo** v HTML aplikaciji in shrani datoteko med datoteke iPhona.
- Ni bančnega gesla, PIN-a, dostopa do plačevanja ali prenosa podatkov na zunanji strežnik.
- Ne nalagaj bančnih podatkov v ta javni GitHub repozitorij.

## Kaj je narejeno

- Prepoznava zneskov, trgovcev (npr. Lidl), kartičnih plačil, bankomatov, nakazil in prilivov.
- Urejanje naziva trgovca z lokalnim pomnjenjem prihodnjih enakih trgovcev.
- Mesečni seštevek, filter transakcij, ročni vnos, lepljenje bančnih obvestil.
- Izvoz in obnova varnostne kopije v JSON.
- Preprečevanje neposredno podvojenih zapisov.

## Stari skripti

Mapa `scriptable/` vsebuje stare poskusne skripte iz prejšnje različice. **Za novo HTML evidenco jih ni treba namestiti.** Stara Scriptable shramba se ne prenese samodejno v Safari in ni del nove aplikacije.
