# Optimalizace webu Travelio

Repozitář: https://github.com/bartosmichal15/travelio-optimalizace
Web na GitHub Pages: https://bartosmichal15.github.io/travelio-optimalizace/

## Měření původního webu

DevTools → Network, Disable cache zapnuté, obnovení stránky.

3 největší soubory:

| Soubor | Typ | Velikost |
|---|---|---|
| hero-travel.png | png | 4,9 MB |
| turkey.jpg | jpeg | 1,9 MB |
| madeira.jpg | jpeg | 1,8 MB |

Celkem přeneseno (Transferred): **10,8 MB**, 9 požadavků.

Screenshot: `screenshots/pred.png`

## Nalezené problémy a co jsem s nimi udělal

1. **Hero obrázek byl PNG 4500×3000 px a měl skoro 5 MB.** Na webu se zobrazuje maximálně na šířku obrazovky, takže jsem ho zmenšil na 1920 px a převedl do WebP.
2. **Obrázky destinací měly 1800–2500 px**, i když se na stránce zobrazují jen asi 280 px široké. Zmenšil jsem je na 800 px a převedl do WebP.
3. **Obrázky neměly lazy loading ani rozměry.** Kartám jsem přidal `loading="lazy"` a všem obrázkům `width` a `height`, aby prohlížeč věděl, kolik místa má nechat.
4. **JavaScript se načítal v `<head>` bez `defer`**, takže blokoval vykreslení stránky. Přidal jsem `defer`.
5. **V JS byl nepoužívaný kód** (proměnná `animationSpeed` a funkce `formatPrice`), tak jsem ho smazal. If/else u tlačítka jsem zkrátil.
6. **CSS bylo rozdělené do dvou souborů**, přitom `extra.css` měl jen pár řádků. Spojil jsem ho do `style.css`, takže je o jeden požadavek méně.
7. **Duplicitní a nepoužívané CSS** – `.about-title` a `.contact-title` byly definované dvakrát, `.destination-title` jen nastavoval barvu a `.newsletter-box` se na stránce vůbec nepoužíval. Duplicity jsem sloučil do `.section-title` a nepoužívané pravidlo smazal.
8. **Inline styly v HTML** (`style="..."` u úvodního textu, otevírací doby a patičky) jsem přesunul do CSS tříd.
9. **Nesémantické HTML** – hlavička, patička i hlavní obsah byly jen `div`, hlavní nadpis byl `<div><b>`, nadpisy sekcí taky `div`. Změnil jsem to na `header`, `main`, `section`, `article`, `footer`, `h1` a `h2`.
10. **Chybějící / špatné alt texty** – Itálie neměla `alt` vůbec a Řecko mělo `alt="obrazek"`. Doplnil jsem popisy.

## Porovnání obrázků

| Obrázek | Formát před | Velikost před | Formát po | Velikost po | Rozlišení po | Úspora |
|---|---|---|---|---|---|---|
| hero-travel (hero) | PNG | 4,88 MB | WebP | 41,9 kB | 1920×1280 | 99 % |
| turkey | JPG | 1,94 MB | WebP | 9,5 kB | 800×533 | 99 % |
| madeira | JPG | 1,79 MB | WebP | 14,0 kB | 800×533 | 99 % |
| greece | JPG | 1,44 MB | WebP | 14,5 kB | 800×533 | 99 % |
| italy | JPG | 738 kB | WebP | 9,7 kB | 800×533 | 98 % |

Obrázky jsou kreslené (hodně plynulých přechodů barev), proto je WebP zmenšil tak hodně.

## Porovnání před a po

| Metrika | Před | Po | Rozdíl |
|---|---|---|---|
| Největší soubor | hero-travel.png – 4,9 MB | hero-travel.webp – 42 kB | o 4,8 MB méně |
| Celkem Transferred | 10,8 MB | 106 kB | o 10,7 MB méně (asi 99 %) |
| Další největší soubor | turkey.jpg – 1,9 MB | greece.webp – 15 kB | o 1,9 MB méně |
| Počet požadavků | 9 | 8 | -1 (extra.css) |

Screenshot: `screenshots/po.png`

Vzhled ani funkčnost webu se nezměnily (tlačítka „Zobrazit nabídku“ i formulář fungují).

## Cache v praxi

Při prvním načtení (Disable cache vypnuté) se stáhly všechny soubory, asi 106 kB. Po F5 měly CSS, JS a obrázky ve sloupci Size „memory cache“ / „disk cache“ a přeneslo se skoro nic, HTML vrátilo 304 Not Modified.

Cache znamená, že si prohlížeč uloží soubory, které už jednou stáhl, a při dalším načtení je vezme ze své paměti nebo z disku místo ze serveru. Server v hlavičce `Cache-Control` říká, jak dlouho může soubor v cache zůstat (např. `max-age=600` = 10 minut). Když už platnost vyprší, prohlížeč se jen zeptá serveru, jestli se soubor změnil, a když ne, dostane odpověď 304 bez obsahu. Proto se při opakovaném načtení přenese mnohem méně dat.

## Závěrečné zhodnocení

**3 nejdůležitější změny:**
1. zmenšení a převod obrázků do WebP (hlavně hero obrázek),
2. `defer` u JavaScriptu,
3. spojení CSS a vyčištění duplicitních / nepoužívaných pravidel a inline stylů.

**Co mělo největší vliv na přenesená data:** úplně nejvíc optimalizace obrázků. Obrázky tvořily skoro celých 10,8 MB, hlavně hero PNG v rozlišení 4500×3000. Zmenšení rozlišení na to, co se reálně zobrazí, a WebP místo PNG/JPG to stáhlo na pár desítek kB. Úpravy HTML, CSS a JS ušetřily jen jednotky kB, ty spíš pomáhají s rychlostí vykreslení a přehledností kódu.

**Rozdíl mezi optimalizací souborů a cache:** optimalizace souborů zmenší data pro každého a hlavně při prvním načtení, protože se stahují menší soubory. Cache pomáhá až při dalších návštěvách – soubory se znovu nestahují vůbec, ale při první návštěvě se stejně musí stáhnout všechno. Nejlepší je mít obojí.
