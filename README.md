# Twoja Przemiana – SEO wskazówki

Ten projekt został zoptymalizowany pod SEO (Google i inne wyszukiwarki). Poniżej krótkie wskazówki, jak dodawać nowe treści i słowa kluczowe, aby utrzymać dobrą widoczność.

## Jak dodać nowy wpis na blogu
- Skopiuj istniejący plik z folderu `blog/` jako szablon i zmień tytuł, opis i treść.
- Uzupełnij w `<head>` pola: `title`, `meta name="description"`, `link rel="canonical"` oraz metatagi Open Graph/Twitter (tytuł, opis, obraz, adres URL).
- Dodaj dane strukturalne JSON-LD typu `BlogPosting` oraz `BreadcrumbList` (patrz przykłady w istniejących wpisach). Pamiętaj o dacie w formacie `YYYY-MM-DD` w polach `datePublished`/`dateModified`.
- Dodaj obraz wpisu do `blog/img/` i ustaw sensowny opis w atrybucie `alt`.
- Wpis dopisz na początek tablicy w `blog/posts.js` (najnowszy pierwszy). Użyj zwięzłego `excerpt` i poprawnego `slug` (małe litery, myślniki).

## Gdzie i jak umieszczać słowa kluczowe
- Tytuł strony (`<title>`): 50–60 znaków, najważniejsze słowa na początku.
- Opis (`meta description`): 140–160 znaków, naturalny język, zawiera 1–2 główne frazy.
- Nagłówki (`<h1>`, `<h2>`): używaj fraz tematycznych, ale bez upychania słów kluczowych.
- Pierwszy akapit: naturalnie wpleć temat wpisu (to często fragment widoczny w podglądach).
- Atrybuty `alt` obrazów: opisowe, z kontekstem (nie „img1”).
- Linki wewnętrzne: linkuj słowami, które opisują temat docelowej strony (np. „wypalenie zawodowe” → wpis o wypaleniu).
- Adresy URL (slug): krótkie, z myślnikami, zgodne z tematem.

## Aktualizacja mapy strony i robots.txt
- Plik `sitemap.xml` oraz `robots.txt` znajdują się w katalogu głównym i są gotowe. Przy dodaniu nowych wpisów uzupełnij `sitemap.xml` o nowe adresy i daty (`lastmod`).

## Dodatkowe wskazówki
- Zachowuj unikalne tytuły i opisy dla każdej podstrony.
- Unikaj duplikacji treści (również między wpisami a stroną główną).
- Przy publikacji zewnętrznych linków dodawaj `rel="noopener"` (bezpieczeństwo) i ewentualnie `rel="nofollow"` przy linkach reklamowych.
- Custom domain: ustawione na `www.twoja-przemiana.pl`.
	- W repo jest plik `CNAME`. Upewnij się, że w DNS masz rekord CNAME: `www → twoja-przemiana.github.io` i włącz „Enforce HTTPS” w ustawieniach GitHub Pages.
	- Jeśli będziesz zmieniać domenę, zaktualizuj `canonical`, `sitemap.xml`, `robots.txt` i JSON-LD.

