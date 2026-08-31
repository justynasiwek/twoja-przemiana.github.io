#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Automat do dodawania wpisów na blog twoja-przemiana.pl
=======================================================

Użycie:
    python3 nowy-wpis.py blog/szkice/moj-wpis.txt

Skrypt na podstawie pliku tekstowego:
  1. generuje gotową stronę HTML wpisu (blog/<slug>.html) z szablonu blog/_szablon.html,
     wraz z meta tagami, Open Graph i danymi strukturalnymi (BlogPosting, BreadcrumbList),
  2. dodaje wpis na początek listy w blog/posts.js (pojawi się na stronie głównej),
  3. dopisuje adres wpisu do sitemap.xml.

Format pliku szkicu (.txt, kodowanie UTF-8):
---------------------------------------------------------------
Tytuł: Jak rozpoznać wypalenie zawodowe?
Slug: jak-rozpoznac-wypalenie-zawodowe
Data: 2026-06-15
Obrazek karta: rozpoznac-wypalenie-card.webp
Obrazek wpis: rozpoznac-wypalenie-post.webp
Zajawka: Krótki opis widoczny na liście wpisów (1-2 zdania).
Opis: Opis meta dla wyszukiwarek, ok. 150 znaków.
Kategoria: zawodowy

Pierwszy akapit treści...

## Śródtytuł (zostanie nagłówkiem H2)

Kolejny akapit. Puste linie oddzielają akapity.

- pozycja listy (linie zaczynające się od "- " tworzą listę punktowaną)
- druga pozycja
---------------------------------------------------------------

Pole "Kategoria" (decyduje o boksie CTA na końcu wpisu):
    osobisty  -> link do rozwoj-osobisty.html
    zawodowy  -> link do rozwoj-zawodowy.html
    terapia   -> link do diagnoza-i-terapia.html

Oba obrazy wrzuć wcześniej do blog/img/. Obraz karty powinien mieć proporcję
1,6:1, a obraz wpisu 2,7:1. Najlepiej użyć formatu WebP.
Po dodaniu wpisu NIE trzeba przebudowywać CSS, o ile treść używa tylko
zwykłych akapitów, nagłówków i list (szablon pokrywa te style).
"""
import sys
import os
import re
import html
from datetime import date

KATEGORIE = {
    "osobisty": ("../rozwoj-osobisty.html",
                 "Chcesz popracować nad tym tematem ze wsparciem psychologa?",
                 "Więcej o rozwoju osobistym"),
    "zawodowy": ("../rozwoj-zawodowy.html",
                 "Chcesz popracować nad swoją sytuacją zawodową?",
                 "Więcej o rozwoju zawodowym"),
    "terapia":  ("../diagnoza-i-terapia.html",
                 "Czujesz, że ten problem dotyczy także Ciebie?",
                 "Więcej o diagnozie i terapii"),
}

MIESIACE = ["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
            "lipca", "sierpnia", "września", "października", "listopada", "grudnia"]


def data_po_polsku(iso):
    y, m, d = (int(x) for x in iso.split("-"))
    return f"{d} {MIESIACE[m-1]} {y}"


def parsuj_szkic(path):
    raw = open(path, encoding="utf-8").read().replace("\r\n", "\n")
    naglowki, tresc = {}, []
    lines = raw.split("\n")
    i = 0
    wzor = re.compile(
        r"^(Tytuł|Slug|Data|Obrazek karta|Obrazek wpis|Zajawka|Opis|Kategoria)\s*:\s*(.+)$"
    )
    while i < len(lines):
        m = wzor.match(lines[i])
        if m:
            naglowki[m.group(1)] = m.group(2).strip()
            i += 1
        elif lines[i].strip() == "" and len(tresc) == 0:
            i += 1
        else:
            tresc = lines[i:]
            break
    wymagane = ["Tytuł", "Slug", "Data", "Obrazek karta", "Obrazek wpis",
                "Zajawka", "Opis", "Kategoria"]
    brak = [w for w in wymagane if w not in naglowki]
    if brak:
        sys.exit(f"BŁĄD: w szkicu brakuje pól: {', '.join(brak)}")
    if naglowki["Kategoria"] not in KATEGORIE:
        sys.exit(f"BŁĄD: Kategoria musi być jedną z: {', '.join(KATEGORIE)}")
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", naglowki["Data"]):
        sys.exit("BŁĄD: Data musi mieć format RRRR-MM-DD, np. 2026-06-15")
    if not re.fullmatch(r"[a-z0-9\-]+", naglowki["Slug"]):
        sys.exit("BŁĄD: Slug może zawierać tylko małe litery, cyfry i myślniki")
    if naglowki["Obrazek karta"] == naglowki["Obrazek wpis"]:
        sys.exit("BŁĄD: obraz karty i obraz wpisu muszą być różnymi plikami")
    return naglowki, "\n".join(tresc).strip()


def tresc_na_html(tekst):
    """Akapity rozdzielone pustą linią; '## ' -> h2; '- ' -> lista punktowana."""
    bloki = re.split(r"\n\s*\n", tekst)
    out = []
    for b in bloki:
        b = b.strip()
        if not b:
            continue
        if b.startswith("## "):
            out.append('            <h2 class="font-serif text-xl md:text-2xl font-bold '
                       'text-[#1f2922] pt-2">%s</h2>' % html.escape(b[3:].strip()))
        elif all(l.strip().startswith("- ") for l in b.split("\n")):
            li = "\n".join(
                '                <li class="flex items-start gap-2"><span class="text-[#c4a660] '
                'mt-1">•</span><span>%s</span></li>' % html.escape(l.strip()[2:])
                for l in b.split("\n"))
            out.append('            <ul class="list-none space-y-2 pl-4">\n%s\n            </ul>' % li)
        else:
            akapit = html.escape(" ".join(l.strip() for l in b.split("\n")))
            out.append("            <p>%s</p>" % akapit)
    return "\n\n".join(out)


def main():
    if len(sys.argv) != 2:
        sys.exit("Użycie: python3 nowy-wpis.py blog/szkice/moj-wpis.txt")
    sciezka = sys.argv[1]
    if not os.path.exists(sciezka):
        sys.exit(f"BŁĄD: nie znaleziono pliku {sciezka}")

    n, tresc = parsuj_szkic(sciezka)
    slug = n["Slug"]
    plik_html = f"blog/{slug}.html"
    if os.path.exists(plik_html):
        sys.exit(f"BŁĄD: {plik_html} już istnieje. Zmień slug albo usuń stary plik.")
    for pole in ("Obrazek karta", "Obrazek wpis"):
        if not os.path.exists(f"blog/img/{n[pole]}"):
            print(f"UWAGA: nie znaleziono blog/img/{n[pole]} – pamiętaj, by go dodać.")

    cta_href, cta_hook, cta_label = KATEGORIE[n["Kategoria"]]
    tytul_krotki = n["Tytuł"] if len(n["Tytuł"]) <= 40 else n["Tytuł"][:37].rstrip() + "…"

    szablon = open("blog/_szablon.html", encoding="utf-8").read()
    zamiany = {
        "{{TITLE}}": html.escape(n["Tytuł"], quote=False),
        "{{TITLE_SHORT}}": html.escape(tytul_krotki, quote=False),
        "{{SLUG}}": slug,
        "{{DESCRIPTION}}": html.escape(n["Opis"]),
        "{{CARD_IMAGE}}": n["Obrazek karta"],
        "{{CONTENT_IMAGE}}": n["Obrazek wpis"],
        "{{DATE_ISO}}": n["Data"],
        "{{DATE_PL}}": data_po_polsku(n["Data"]),
        "{{CONTENT}}": tresc_na_html(tresc),
        "{{CTA_HREF}}": cta_href,
        "{{CTA_HOOK}}": cta_hook,
        "{{CTA_LABEL}}": cta_label,
    }
    for k, v in zamiany.items():
        szablon = szablon.replace(k, v)
    open(plik_html, "w", encoding="utf-8", newline="").write(szablon)
    print(f"[1/3] Utworzono {plik_html}")

    # posts.js – nowy wpis na początek tablicy
    pj = open("blog/posts.js", encoding="utf-8").read()
    wpis = (
        "    {\n"
        f'        slug: "{slug}",\n'
        f'        title: "{n["Tytuł"].replace(chr(34), chr(92)+chr(34))}",\n'
        f'        date: "{data_po_polsku(n["Data"])}",\n'
        f'        cardImage: "{n["Obrazek karta"]}",\n'
        f'        contentImage: "{n["Obrazek wpis"]}",\n'
        f'        excerpt: "{n["Zajawka"].replace(chr(34), chr(92)+chr(34))}"\n'
        "    },\n"
    )
    znak = "const blogPosts = ["
    if znak not in pj:
        sys.exit("BŁĄD: nie znaleziono tablicy blogPosts w blog/posts.js")
    pj = pj.replace(znak, znak + "\n" + wpis.rstrip("\n"), 1)
    open("blog/posts.js", "w", encoding="utf-8", newline="").write(pj)
    print("[2/3] Dodano wpis do blog/posts.js")

    # sitemap.xml
    sm = open("sitemap.xml", encoding="utf-8").read()
    url = f"https://www.twoja-przemiana.pl/blog/{slug}.html"
    if url not in sm:
        nowy = (f"  <url>\n    <loc>{url}</loc>\n"
                f"    <lastmod>{n['Data']}</lastmod>\n"
                "    <changefreq>monthly</changefreq>\n"
                "    <priority>0.7</priority>\n  </url>\n</urlset>")
        sm = sm.replace("</urlset>", nowy, 1)
        open("sitemap.xml", "w", encoding="utf-8", newline="").write(sm)
    print("[3/3] Zaktualizowano sitemap.xml")

    print("\nGotowe. Sprawdź wpis w przeglądarce, a po publikacji zgłoś URL "
          "w Google Search Console (Sprawdzenie adresu URL -> Poproś o zindeksowanie).")


if __name__ == "__main__":
    main()
