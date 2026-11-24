# MOJE-TRANSAKCIJE – Intesa Sanpaolo

Zasebna HTML evidenca za iPhone. Koda je na GitHub Pages, transakcije pa ostanejo v lokalni datoteki na telefonu in v shrambi brskalnika po uvozu. **Na GitHub ne nalagaj datotek z dejanskimi bančnimi podatki.**

## Odpri aplikacijo

**https://tony-ops1.github.io/MOJE-TRANSAKCIJE/**

## Kako deluje trenutna različica

1. Bližnjica `INTESA TRANSAKCIJE` se sproži, ko aplikacija **ISPS** pošlje obvestilo.
2. Bližnjica sestavi `Naslov` in `Besedilo` ter ju z dejanjem **Dodaj na konec datoteke** poskusi dodati v `Na mojem iPhonu/INTESA/transakcije.txt`. Delovanje pri zaklenjenem iPhonu je treba preveriti.
3. V **Safariju** odpri HTML aplikacijo in pritisni **Uvozi transakcije.txt**.
4. V izbirniku Datoteke izberi **Na mojem iPhonu → INTESA → transakcije.txt**.
5. Aplikacija prikaže POS plačila, dvige, prilive in prenose. Popravi naziv trgovca, če je napačen.

### Uvoz in seštevanje

- Pri ponovnem uvozu nespremenjene datoteke se obvestila ne podvojijo.
- **Avtorizacija kartice** se označi kot avtorizacija in se ne prišteje med izdatke, če je pozneje na voljo končna transakcija. Tudi brez končne transakcije avtorizacija ni knjižena poraba.
- Več enakih odlivov brez časovnega žiga se označi za pregled, ne izbriše samodejno.
- **Prenosi sredstev** so ločeni od običajne porabe (tudi priliv in odliv istega prenosa).
- Če datum v obvestilu ni naveden, se za razvrstitev začasno uporabi dan uvoza in vrstica dobi opozorilo. Mesečni seštevki zato niso bančni izpisek.
- Spremembe imen trgovcev se shranijo lokalno. Datoteke se iz brskalnika **ne bere avtomatsko**: za nove zapise jo ponovno izberi.
- **Shrani kopijo** izvozi JSON, iz katerega je mogoče evidenco obnoviti.

### Če Bližnjice pokažejo »Datoteka z istim imenom že obstaja«

Napaka je v dejanju za zapis, ne v HTML aplikaciji. **Ne izbriši že obstoječe datoteke.** Najprej shrani kopijo `transakcije.txt` v aplikaciji Datoteke in preveri, da je dejanje zares **Dodaj na konec datoteke**, ne običajno **Shrani datoteko**. Če se napaka ponavlja, bo morda potreben drugačen način zapisovanja (na primer ločena datoteka za vsako obvestilo). Sam HTML na GitHubu težave pri zapisovanju ne more popraviti.

### Varnost in omejitve

- Ni dostopa do bančnega računa, gesel ali kartičnih kod.
- Podatki se ob uvozu obdelajo v brskalniku in shranijo lokalno v Safariju.
- Zaradi varnosti pri uvozu uporabljaj **Safari**, ne Chrome oziroma ločenega spletnega pogleda: lokalne shrambe so lahko ločene.
- Če zbrišeš podatke Safarija ali izgubiš telefon, lahko izgubiš evidenco. Redno izvozi varnostno kopijo.
- GitHub Pages ne more samodejno dostopati do datoteke na iPhonu, zlasti ne pri zaklenjenem zaslonu. Za res povsem samodejen prikaz bi potrebovali drugačno aplikacijo ali sinhronizacijo z izrecnim dovoljenjem.
- Ne spreminjaj ali odstranjuj starih zapisov iz `transakcije.txt` brez varnostne kopije.

Mapa `scriptable/` vsebuje stare poskusne skripte iz prejšnjega načrta; za trenutno HTML različico niso potrebni.
