# Moje transakcije – Intesa Sanpaolo

HTML pregled bančnih obvestil za iPhone. **Brez spletne baze.** GitHub Pages gosti samo javni vmesnik, bančne transakcije pa Scriptable shranjuje lokalno na iPhonu.

## Enostavna namestitev

Na iPhonu v Safariju odpri https://tony-ops1.github.io/MOJE-TRANSAKCIJE/namesti.html .
Namestitvena stran omogoča kopiranje enega skripta, ki v Scriptable namesti vse tri skripte. Samo namestitev na telefon moraš potrditi v Scriptable; nobena spletna stran ne more brez dovoljenja namestiti Bližnjic ali spreminjati nastavitev iOS.

## Objava in uporaba

1. V GitHub repozitoriju odpri Settings → Pages.
2. Nastavi Build and deployment → Deploy from a branch → main → /(root) in shrani.
3. HTML: https://tony-ops1.github.io/MOJE-TRANSAKCIJE/
4. Namesti Scriptable na iPhone.
5. Iz mape scriptable/ kopiraj vse tri skripte v Scriptable in jih poimenuj natanko Intesa-Shrani, Intesa-Pregled in Intesa-Uredi.
6. V Bližnjicah ustvari avtomatizacijo ob Intesinem obvestilu, če tvoja različica iOS dovoljuje ta sprožilec in dostop do vsebine. Dodaj dejanje Text z naslovom in vsebino obvestila; nato dejanje Scriptable → Run Script, izberi Intesa-Shrani in predaj besedilo kot Parameter. Dovoli izvajanje brez odpiranja aplikacije, če je na voljo.
7. Za pregled zaženi Intesa-Pregled v Scriptable. Ta prenese samo javno HTML predlogo, doda lokalne podatke v pomnilniku WebView in prikaže evidenco. HTML se lahko uporablja iz lokalnega predpomnilnika, ko je bil prvič uspešno naložen.
8. Za popravek naziva trgovca uporabi gumb Uredi naziv ali zaženi Intesa-Uredi.

**Pomembno:** Sama stran GitHub Pages v Safariju ne more prebrati lokalnih podatkov Scriptable in je zato samo prazen javni predogled.

## Zasebnost

- Nikoli ne nalagaj intesa-transakcije.json, intesa-imena.json, bančnih izpiskov, fotografij obvestil ali osebnih podatkov v javni repozitorij.
- Skripti uporabljajo FileManager.local() in ne shranjujejo finančnih podatkov na GitHub.
- GitHub lahko vidi obisk javne strani, ne pa lokalno shranjenih transakcij.
- Ne vstavljaj bančnih podatkov v URL-je.
- Zajem obvestil je treba preizkusiti na iPhonu tudi med zaklenjenim zaslonom. Vsa obvestila se ne bodo nujno zabeležila.
- To ni bančni izpisek in ne prikazuje zagotovljeno pravilnega knjiženega stanja.
- Če je omogočena sistemska varnostna kopija iPhona, se lahko lokalni podatki vključijo vanjo.

## Test

Kot parameter skripta Intesa-Shrani pošlji naslednji testni primer:

    Odliv 1,23 EUR
    BANKA INTESA SANPAOLO D.D.: VI-PRIMER TRGOVINA, PRIMER KRAJA

Nato zaženi Intesa-Pregled. Pričakovani rezultat: Primer Trgovina in 1,23 EUR. Testni zapis ni prava transakcija, zato ga ne zamenjaj z dejanskim bančnim prometom.

Ni mogoče zagotoviti popolnega zajema brez testa dejanskih potisnih obvestil in nastavitev iOS.
