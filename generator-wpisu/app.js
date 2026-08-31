"use strict";

const STORAGE_KEY = "twoja-przemiana-generator-posts-v1";
const SITE_ORIGIN = "https://www.twoja-przemiana.pl";

const BASE_POSTS = [
    {
        slug: "toksyczny_szef",
        title: "Toksyczny szef",
        isoDate: "2026-08-17",
        date: "17 sierpnia 2026",
        cardImage: "Toksyk_1500x1000.jpg",
        contentImage: "Toksyk_1200x628.jpg",
        excerpt: "Czy można pracować tak, żeby nawet toksyczny szef…"
    },
    {
        slug: "odpoczynek",
        title: "Czy dajemy sobie prawo do odpoczynku?",
        isoDate: "2026-08-12",
        date: "12 sierpnia 2026",
        cardImage: "odpoczynek-card.jpg",
        contentImage: "odpoczynek.webp",
        excerpt: "Dlaczego tak trudno naprawdę odpocząć i skąd bierze się przekonanie, że relaks trzeba sobie zasłużyć?"
    },
    {
        slug: "wiosna",
        title: "Wiosna przychodzi do każdego, ale nie każdy ją czuje…",
        isoDate: "2026-03-11",
        date: "11 marca 2026",
        cardImage: "wiosna.jpg",
        contentImage: "wiosna.webp",
        excerpt: "Wiosna przychodzi do każdego, ale nie każdy ją czuje…"
    },
    {
        slug: "szefowie",
        title: "Drodzy Szefowie,",
        isoDate: "2025-10-16",
        date: "16 października 2025",
        cardImage: "szefowie.jpg",
        contentImage: "szefowie.webp",
        excerpt: "z okazji Waszego święta, proponuję chwilę na refleksję pod hasłem „Jakim jestem szefem?"
    },
    {
        slug: "wypalenie-zawodowe",
        title: "Wypalenie zawodowe, czy powakacyjne rozleniwienie?",
        isoDate: "2025-09-01",
        date: "1 września 2025",
        cardImage: "wypalenie.jpg",
        contentImage: "wypalenie.webp",
        excerpt: "Wracasz po urlopie do pracy i czujesz, że masz dość? Czy to już wypalenie zawodowe, czy tylko przejściowy kryzys?"
    },
    {
        slug: "pracoholizm",
        title: "Kiedy praca staje się obsesją…",
        isoDate: "2025-04-14",
        date: "14 kwietnia 2025",
        cardImage: "pracoholizm.jpg",
        contentImage: "pracoholizm.webp",
        excerpt: "Jeśli dużo pracujemy, po czym poznać, czy już wpadliśmy w pułapkę pracoholizmu?"
    },
    {
        slug: "menedzerowie-nie-doceniaja",
        title: "Dlaczego menedżerowie nie doceniają…",
        isoDate: "2025-04-09",
        date: "9 kwietnia 2025",
        cardImage: "menedzer.jpg",
        contentImage: "menedzer.webp",
        excerpt: "Utarło się przekonanie, że pracownicy potrzebują pochwały lub kary. Czy systemy motywacyjne naprawdę działają?"
    },
    {
        slug: "wiosenne-porzadki",
        title: "Wiosenne porządki",
        isoDate: "2025-03-21",
        date: "21 marca 2025",
        cardImage: "porzadki.jpg",
        contentImage: "porzadki.webp",
        excerpt: "Nasza kariera zawodowa i sytuacja w pracy są warte chwili uwagi, a być może także poukładania na nowo."
    },
    {
        slug: "szczescie",
        title: "Szczęście",
        isoDate: "2025-03-12",
        date: "12 marca 2025",
        cardImage: "szczescie.jpg",
        contentImage: "szczescie.webp",
        excerpt: "Cóż to jest szczęście i od czego zależy, czy jesteśmy szczęśliwi? Kilka przemyśleń z okazji Międzynarodowego Dnia Szczęścia."
    },
    {
        slug: "decyzje",
        title: "Decyzje decyzje",
        isoDate: "2025-02-09",
        date: "9 lutego 2025",
        cardImage: "decyzje.jpg",
        contentImage: "decyzje.webp",
        excerpt: "Podejmowanie decyzji życiowych bywa trudne. Jak do tego podejść, aby w przyszłości niczego nie żałować?"
    },
    {
        slug: "pewnosc-siebie",
        title: "Na jakich filarach oprzeć pewność siebie?",
        isoDate: "2025-01-08",
        date: "8 stycznia 2025",
        cardImage: "pewnosc-siebie.jpg",
        contentImage: "pewnosc-siebie.webp",
        excerpt: "Czy można zmienić swój brak pewności siebie? Nie tylko w konkretnej sytuacji, ale tak na stałe?"
    }
];

const EXTRA_SITEMAP_POSTS = [
    { slug: "jak-rozpoznac-wypalenie-zawodowe", isoDate: "2026-06-15" },
    { slug: "psycholog-psychoterapeuta-roznice", isoDate: "2026-06-22" },
    { slug: "ile-trwa-terapia-cbt", isoDate: "2026-06-29" }
];

const CATEGORY_CTA = {
    osobisty: {
        href: "../rozwoj-osobisty.html",
        hook: "Chcesz popracować nad tym tematem ze wsparciem psychologa?",
        label: "Więcej o rozwoju osobistym"
    },
    zawodowy: {
        href: "../rozwoj-zawodowy.html",
        hook: "Chcesz popracować nad swoją sytuacją zawodową?",
        label: "Więcej o rozwoju zawodowym"
    },
    terapia: {
        href: "../diagnoza-i-terapia.html",
        hook: "Czujesz, że ten problem dotyczy także Ciebie?",
        label: "Więcej o diagnozie i terapii"
    }
};

const POLISH_MONTHS = [
    "stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca",
    "lipca", "sierpnia", "września", "października", "listopada", "grudnia"
];

const form = document.querySelector("#post-form");
const titleInput = document.querySelector("#title");
const dateInput = document.querySelector("#date");
const contentInput = document.querySelector("#content");
const excerptInput = document.querySelector("#excerpt");
const descriptionInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");
const cardImageInput = document.querySelector("#card-image");
const contentImageInput = document.querySelector("#content-image");
const characterCount = document.querySelector("#character-count");
const statusBox = document.querySelector("#status");
const generateButton = document.querySelector("#generate-button");
const clearHistoryButton = document.querySelector("#clear-history");

dateInput.value = localIsoDate(new Date());
contentInput.addEventListener("input", updateCharacterCount);
cardImageInput.addEventListener("change", () => updatePreview(cardImageInput, "#card-preview"));
contentImageInput.addEventListener("change", () => updatePreview(contentImageInput, "#content-preview"));
form.addEventListener("submit", generatePackage);
clearHistoryButton.addEventListener("click", clearHistory);
updateCharacterCount();

function updateCharacterCount() {
    characterCount.textContent = String(contentInput.value.length);
}

function updatePreview(input, selector) {
    const preview = document.querySelector(selector);
    const oldUrl = preview.dataset.objectUrl;
    if (oldUrl) {
        URL.revokeObjectURL(oldUrl);
    }
    preview.replaceChildren();
    const file = input.files[0];
    if (!file) {
        const label = document.createElement("span");
        label.textContent = "Wybierz zdjęcie";
        preview.append(label);
        return;
    }
    const objectUrl = URL.createObjectURL(file);
    const image = document.createElement("img");
    image.src = objectUrl;
    image.alt = "Podgląd wybranego zdjęcia";
    preview.dataset.objectUrl = objectUrl;
    preview.append(image);
}

async function generatePackage(event) {
    event.preventDefault();
    hideStatus();

    if (!form.reportValidity()) {
        showStatus("Uzupełnij wymagane pola.", "error");
        return;
    }

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const isoDate = dateInput.value;
    const category = categoryInput.value;
    const cardSource = cardImageInput.files[0];
    const contentSource = contentImageInput.files[0];
    const slug = slugify(title);
    const savedPosts = loadSavedPosts();

    if (!title || !content || content.length > 5000) {
        showStatus("Treść wpisu musi mieć od 1 do 5000 znaków.", "error");
        return;
    }
    if (!slug) {
        showStatus("Nie udało się utworzyć poprawnej nazwy pliku z podanego tytułu.", "error");
        return;
    }
    if (BASE_POSTS.concat(savedPosts).some(post => post.slug === slug)) {
        showStatus("Wpis o takim tytule już istnieje. Zmień tytuł lub wyczyść historię generatora.", "error");
        return;
    }
    if (!cardSource || !contentSource) {
        showStatus("Wybierz dwa obrazy.", "error");
        return;
    }
    if (await filesAreIdentical(cardSource, contentSource)) {
        showStatus("Wybierz dwa różne obrazy. Oba wskazane pliki mają tę samą zawartość.", "error");
        return;
    }

    generateButton.disabled = true;
    generateButton.textContent = "Tworzę paczkę…";

    try {
        const plainText = contentToPlainText(content);
        const excerpt = excerptInput.value.trim() || truncateAtWord(plainText, 220);
        const description = descriptionInput.value.trim() || truncateAtWord(plainText, 155);
        const cardImageName = `${slug}-card.webp`;
        const contentImageName = `${slug}-post.webp`;

        const [cardImage, articleImage] = await Promise.all([
            cropToWebp(cardSource, 960, 600),
            cropToWebp(contentSource, 1350, 500)
        ]);

        const post = {
            slug,
            title,
            isoDate,
            date: polishDate(isoDate),
            cardImage: cardImageName,
            contentImage: contentImageName,
            excerpt,
            description,
            category
        };
        const nextSavedPosts = [post, ...savedPosts];
        const allPosts = [...nextSavedPosts, ...BASE_POSTS]
            .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

        const files = [
            { name: `blog/${slug}.html`, data: buildPostHtml(post, content) },
            { name: `blog/img/${cardImageName}`, data: cardImage },
            { name: `blog/img/${contentImageName}`, data: articleImage },
            { name: "blog/posts.js", data: buildPostsJs(allPosts) },
            { name: "sitemap.xml", data: buildSitemap(nextSavedPosts) },
            { name: `blog/szkice/${slug}.txt`, data: buildDraft(post, content) },
            { name: "INSTRUKCJA-WGRANIA.txt", data: buildUploadInstructions(post) }
        ];

        const zipBlob = await makeZip(files);
        downloadBlob(zipBlob, `${slug}-pliki.zip`);
        const historySaved = savePosts(nextSavedPosts);
        const historyNote = historySaved ? "" : " Przeglądarka nie pozwoliła zapisać historii, zachowaj więc tę paczkę jako kopię.";
        showStatus(`Gotowe. Pobrano paczkę „${slug}-pliki.zip”.${historyNote}`, "success");
    } catch (error) {
        console.error(error);
        showStatus(error instanceof Error ? error.message : "Nie udało się utworzyć paczki.", "error");
    } finally {
        generateButton.disabled = false;
        generateButton.textContent = "Pobierz paczkę ZIP";
    }
}

function buildPostHtml(post, content) {
    const cta = CATEGORY_CTA[post.category];
    const title = escapeHtml(post.title);
    const titleShort = escapeHtml(truncateAtWord(post.title, 40));
    const description = escapeHtml(post.description);
    const articleUrl = `${SITE_ORIGIN}/blog/${post.slug}.html`;
    const cardImageUrl = `${SITE_ORIGIN}/blog/img/${post.cardImage}`;
    const contentImageUrl = `${SITE_ORIGIN}/blog/img/${post.contentImage}`;
    const jsonLd = safeJson({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        headline: post.title,
        description: post.description,
        image: [contentImageUrl],
        author: {
            "@type": "Person",
            "@id": `${SITE_ORIGIN}/#justyna-siwek`,
            name: "Justyna Siwek"
        },
        publisher: {
            "@type": "Organization",
            name: "Twoja Przemiana",
            logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/img/logo.png` }
        },
        datePublished: post.isoDate,
        dateModified: post.isoDate,
        inLanguage: "pl-PL"
    });
    const breadcrumbs = safeJson({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Strona główna", item: `${SITE_ORIGIN}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/#blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: articleUrl }
        ]
    });

    return `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} – Twoja Przemiana</title>
    <meta name="description" content="${description}">
    <link rel="icon" href="../img/logo.webp" type="image/webp">
    <link rel="canonical" href="${articleUrl}">
    <meta property="og:locale" content="pl_PL">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Twoja Przemiana">
    <meta property="og:title" content="${title} – Twoja Przemiana">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${articleUrl}">
    <meta property="og:image" content="${cardImageUrl}">
    <meta property="article:published_time" content="${post.isoDate}T00:00:00+02:00">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} – Twoja Przemiana">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${cardImageUrl}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../css/tailwind.css">
    <style>html { scroll-behavior: smooth; }</style>
    <script type="application/ld+json">${jsonLd}</script>
    <script type="application/ld+json">${breadcrumbs}</script>
</head>
<body class="font-sans text-[#1d1d1d] bg-white min-h-screen overflow-x-hidden">
    <nav class="flex justify-between items-center px-6 py-1 max-w-[1100px] mx-auto bg-white relative z-50">
        <a href="../index.html"><img src="../img/logo.webp" alt="Twoja Przemiana - Justyna Siwek" class="h-14 md:h-20 w-auto"></a>
        <div class="hidden md:flex gap-8 text-sm font-medium text-gray-800">
            <a href="../index.html" class="hover:text-black pb-1 transition-all">Strona główna</a>
            <a href="../index.html#o-mnie" class="hover:text-black pb-1 transition-all">O mnie</a>
            <a href="../index.html#rozwoj" class="hover:text-black pb-1 transition-all">Rozwój</a>
            <a href="../index.html#diagnoza" class="hover:text-black pb-1 transition-all">Diagnoza i terapia</a>
            <a href="../index.html#zapisy" class="hover:text-black pb-1 transition-all">Umów termin</a>
            <a href="../index.html#blog" class="border-b-2 border-black pb-1 transition-all">Blog</a>
            <a href="../index.html#kontakt" class="hover:text-black pb-1 transition-all">Kontakt</a>
        </div>
    </nav>
    <article class="max-w-[1100px] mx-auto px-4 md:px-6 py-8 md:py-12">
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <a href="../index.html" class="hover:text-[#c4a660] transition-colors">Strona główna</a>
            <span>/</span><a href="../index.html#blog" class="hover:text-[#c4a660] transition-colors">Blog</a>
            <span>/</span><span class="text-gray-800">${titleShort}</span>
        </div>
        <div class="rounded-2xl overflow-hidden mb-8">
            <img src="img/${escapeHtml(post.contentImage)}" alt="${title}" class="w-full h-64 md:h-96 object-cover">
        </div>
        <div class="mb-6">
            <p class="text-sm text-[#c4a660] font-semibold uppercase mb-3">${escapeHtml(post.date)} · Justyna Siwek</p>
            <h1 class="font-serif text-2xl md:text-4xl font-bold text-[#1d1d1d] leading-tight">${title}</h1>
        </div>
        <div class="max-w-[800px] prose prose-lg text-gray-700 leading-relaxed space-y-5">
${contentToHtml(content)}
        </div>
        <div class="mt-10 bg-[#f1ebdb] rounded-2xl p-6 md:p-8 max-w-[800px]">
            <p class="font-serif text-lg font-bold text-[#1f2922] mb-2">${escapeHtml(cta.hook)}</p>
            <p class="text-gray-700 mb-4">Sprawdź, jak mogę Ci pomóc, albo umów się na pierwszą rozmowę.</p>
            <a href="${cta.href}" class="inline-block bg-[#3b4b40] hover:bg-[#2e3b32] text-white font-medium px-5 py-3 rounded-lg text-sm transition-colors mr-3 mb-2">${escapeHtml(cta.label)}</a>
            <a href="../index.html#zapisy" class="inline-block border border-[#3b4b40] text-[#3b4b40] hover:bg-[#3b4b40] hover:text-white font-medium px-5 py-3 rounded-lg text-sm transition-colors mb-2">Umów wizytę</a>
        </div>
        <div class="mt-12 pt-8 border-t border-gray-200">
            <a href="../index.html#blog" class="inline-flex items-center gap-2 text-[#c4a660] hover:text-[#b09455] font-medium transition-colors">← Wróć do bloga</a>
        </div>
    </article>
    <footer class="bg-[#0F172A] py-6 px-6 mt-12">
        <div class="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>Twoja Przemiana &copy; Justyna Siwek ${new Date().getFullYear()}</p>
            <div class="flex flex-wrap gap-4 md:gap-6 mt-3 md:mt-0 justify-center">
                <a href="../index.html" class="hover:text-[#c4a660] transition-colors">Strona główna</a>
                <a href="../rozwoj-osobisty.html" class="hover:text-[#c4a660] transition-colors">Rozwój osobisty</a>
                <a href="../rozwoj-zawodowy.html" class="hover:text-[#c4a660] transition-colors">Rozwój zawodowy</a>
                <a href="../diagnoza-i-terapia.html" class="hover:text-[#c4a660] transition-colors">Diagnoza i terapia</a>
                <a href="../index.html#kontakt" class="hover:text-[#c4a660] transition-colors">Kontakt</a>
            </div>
        </div>
    </footer>
</body>
</html>
`;
}

function contentToHtml(text) {
    const lines = text.replace(/\r\n?/g, "\n").split("\n");
    const output = [];
    let paragraph = [];
    let listItems = [];

    const flushParagraph = () => {
        if (paragraph.length) {
            output.push(`            <p>${escapeHtml(paragraph.join(" "))}</p>`);
            paragraph = [];
        }
    };
    const flushList = () => {
        if (listItems.length) {
            const items = listItems.map(item => `                <li class="flex items-start gap-2"><span class="text-[#c4a660] mt-1">•</span><span>${escapeHtml(item)}</span></li>`).join("\n");
            output.push(`            <ul class="list-none space-y-2 pl-4">\n${items}\n            </ul>`);
            listItems = [];
        }
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line) {
            flushParagraph();
            flushList();
        } else if (line.startsWith("## ")) {
            flushParagraph();
            flushList();
            output.push(`            <h2 class="font-serif text-xl md:text-2xl font-bold text-[#1f2922] pt-2">${escapeHtml(line.slice(3).trim())}</h2>`);
        } else if (line.startsWith("- ")) {
            flushParagraph();
            listItems.push(line.slice(2).trim());
        } else {
            flushList();
            paragraph.push(line);
        }
    }
    flushParagraph();
    flushList();
    return output.join("\n\n");
}

function buildPostsJs(posts) {
    const entries = posts.map(post => {
        return `    {\n        slug: ${JSON.stringify(post.slug)},\n        title: ${JSON.stringify(post.title)},\n        date: ${JSON.stringify(post.date)},\n        cardImage: ${JSON.stringify(post.cardImage)},\n        contentImage: ${JSON.stringify(post.contentImage)},\n        excerpt: ${JSON.stringify(post.excerpt)}\n    }`;
    }).join(",\n");
    return `// Dane postów na blogu twoja-przemiana.pl\n// Każdy wpis korzysta z osobnego obrazu karty i obrazu w treści.\n\nconst blogPosts = [\n${entries}\n];\n`;
}

function buildSitemap(savedPosts) {
    const staticUrls = [
        { path: "/", lastmod: "2026-06-12", changefreq: "weekly", priority: "1.0" },
        { path: "/rozwoj-osobisty.html", lastmod: "2026-06-12", changefreq: "monthly", priority: "0.8" },
        { path: "/rozwoj-zawodowy.html", lastmod: "2026-06-12", changefreq: "monthly", priority: "0.8" },
        { path: "/diagnoza-i-terapia.html", lastmod: "2026-06-12", changefreq: "monthly", priority: "0.8" }
    ];
    const blogPosts = [...savedPosts, ...BASE_POSTS, ...EXTRA_SITEMAP_POSTS];
    const uniquePosts = [...new Map(blogPosts.map(post => [post.slug, post])).values()]
        .sort((a, b) => b.isoDate.localeCompare(a.isoDate));
    const urls = [
        ...staticUrls,
        ...uniquePosts.map(post => ({
            path: `/blog/${post.slug}.html`,
            lastmod: post.isoDate,
            changefreq: "monthly",
            priority: "0.7"
        }))
    ];
    const nodes = urls.map(item => `  <url>\n    <loc>${SITE_ORIGIN}${item.path}</loc>\n    <lastmod>${item.lastmod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nodes}\n</urlset>\n`;
}

function buildDraft(post, content) {
    return `Tytuł: ${post.title}\nSlug: ${post.slug}\nData: ${post.isoDate}\nObrazek karta: ${post.cardImage}\nObrazek wpis: ${post.contentImage}\nZajawka: ${post.excerpt}\nOpis: ${post.description}\nKategoria: ${post.category}\n\n${content}\n`;
}

function buildUploadInstructions(post) {
    return `TWOJA PRZEMIANA, NOWY WPIS\n\nWpis: ${post.title}\nAdres po publikacji: ${SITE_ORIGIN}/blog/${post.slug}.html\n\nRozpakuj paczkę. Wgraj jej zawartość do głównego katalogu witryny, zachowując katalogi blog, blog/img i blog/szkice. Zezwól na zastąpienie plików blog/posts.js oraz sitemap.xml. Pozostałe pliki są nowe.\n\nPrzed publikacją otwórz lokalnie plik blog/${post.slug}.html i sprawdź treść oraz kadrowanie zdjęcia. Po publikacji otwórz adres wpisu i stronę główną. Na końcu zgłoś nowy adres do indeksowania w Google Search Console.\n\nWażne: kolejne paczki twórz w tej samej przeglądarce. Generator przechowuje historię lokalnie, dzięki temu blog/posts.js i sitemap.xml zawierają także wcześniejsze wpisy.\n`;
}

async function cropToWebp(file, targetWidth, targetHeight) {
    const image = await loadImage(file);
    const sourceWidth = image.width;
    const sourceHeight = image.height;
    const targetRatio = targetWidth / targetHeight;
    const sourceRatio = sourceWidth / sourceHeight;
    let sourceX = 0;
    let sourceY = 0;
    let cropWidth = sourceWidth;
    let cropHeight = sourceHeight;

    if (sourceRatio > targetRatio) {
        cropWidth = sourceHeight * targetRatio;
        sourceX = (sourceWidth - cropWidth) / 2;
    } else {
        cropHeight = sourceWidth / targetRatio;
        sourceY = (sourceHeight - cropHeight) / 2;
    }

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const context = canvas.getContext("2d", { alpha: false });
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, targetWidth, targetHeight);
    context.drawImage(image, sourceX, sourceY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);

    if (typeof image.close === "function") {
        image.close();
    }

    const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(result => result ? resolve(result) : reject(new Error("Przeglądarka nie potrafi zapisać obrazu.")), "image/webp", 0.86);
    });
    if (blob.type !== "image/webp") {
        throw new Error("Ta przeglądarka nie obsługuje zapisu WebP. Otwórz generator w aktualnej wersji Chrome, Edge lub Firefox.");
    }
    return blob;
}

async function loadImage(file) {
    if ("createImageBitmap" in window) {
        return createImageBitmap(file, { imageOrientation: "from-image" });
    }
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(url);
            resolve(image);
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error(`Nie udało się odczytać obrazu ${file.name}.`));
        };
        image.src = url;
    });
}

async function filesAreIdentical(first, second) {
    if (first.size !== second.size) {
        return false;
    }
    const [firstBuffer, secondBuffer] = await Promise.all([first.arrayBuffer(), second.arrayBuffer()]);
    const a = new Uint8Array(firstBuffer);
    const b = new Uint8Array(secondBuffer);
    for (let index = 0; index < a.length; index += 1) {
        if (a[index] !== b[index]) {
            return false;
        }
    }
    return true;
}

function slugify(value) {
    const replacements = { ł: "l", đ: "d", ø: "o", ß: "ss", æ: "ae", œ: "oe" };
    return value
        .toLowerCase()
        .replace(/[łđøßæœ]/g, letter => replacements[letter])
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80)
        .replace(/-+$/g, "");
}

function polishDate(isoDate) {
    const [year, month, day] = isoDate.split("-").map(Number);
    return `${day} ${POLISH_MONTHS[month - 1]} ${year}`;
}

function localIsoDate(date) {
    const pad = value => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function contentToPlainText(content) {
    return content
        .replace(/^##\s+/gm, "")
        .replace(/^-\s+/gm, "")
        .replace(/\s+/g, " ")
        .trim();
}

function truncateAtWord(value, limit) {
    const text = value.trim();
    if (text.length <= limit) {
        return text;
    }
    const shortened = text.slice(0, Math.max(1, limit - 1));
    const lastSpace = shortened.lastIndexOf(" ");
    const safe = lastSpace > limit * 0.65 ? shortened.slice(0, lastSpace) : shortened;
    return `${safe.trimEnd()}…`;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);
}

function safeJson(value) {
    return JSON.stringify(value).replace(/[<>&]/g, character => ({
        "<": "\\u003c",
        ">": "\\u003e",
        "&": "\\u0026"
    })[character]);
}

function loadSavedPosts() {
    try {
        const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(parsed) ? parsed.filter(post => post && typeof post.slug === "string") : [];
    } catch {
        return [];
    }
}

function savePosts(posts) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return true;
    } catch {
        return false;
    }
}

function clearHistory() {
    if (window.confirm("Czy na pewno usunąć historię wpisów utworzonych w tym generatorze?")) {
        try {
            localStorage.removeItem(STORAGE_KEY);
            showStatus("Historia generatora została wyczyszczona.", "success");
        } catch {
            showStatus("Przeglądarka nie udostępnia lokalnej historii dla tego pliku.", "error");
        }
    }
}

function showStatus(message, type) {
    statusBox.textContent = message;
    statusBox.className = `status ${type}`;
    statusBox.hidden = false;
    statusBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideStatus() {
    statusBox.hidden = true;
    statusBox.textContent = "";
    statusBox.className = "status";
}

function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function makeZip(files) {
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;
    const now = new Date();
    const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
    const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

    for (const file of files) {
        const nameBytes = encoder.encode(file.name);
        const dataBytes = await toBytes(file.data, encoder);
        const crc = crc32(dataBytes);
        const localHeader = new Uint8Array(30);
        const localView = new DataView(localHeader.buffer);
        localView.setUint32(0, 0x04034b50, true);
        localView.setUint16(4, 20, true);
        localView.setUint16(6, 0x0800, true);
        localView.setUint16(8, 0, true);
        localView.setUint16(10, dosTime, true);
        localView.setUint16(12, dosDate, true);
        localView.setUint32(14, crc, true);
        localView.setUint32(18, dataBytes.length, true);
        localView.setUint32(22, dataBytes.length, true);
        localView.setUint16(26, nameBytes.length, true);
        localView.setUint16(28, 0, true);
        localParts.push(localHeader, nameBytes, dataBytes);

        const centralHeader = new Uint8Array(46);
        const centralView = new DataView(centralHeader.buffer);
        centralView.setUint32(0, 0x02014b50, true);
        centralView.setUint16(4, 20, true);
        centralView.setUint16(6, 20, true);
        centralView.setUint16(8, 0x0800, true);
        centralView.setUint16(10, 0, true);
        centralView.setUint16(12, dosTime, true);
        centralView.setUint16(14, dosDate, true);
        centralView.setUint32(16, crc, true);
        centralView.setUint32(20, dataBytes.length, true);
        centralView.setUint32(24, dataBytes.length, true);
        centralView.setUint16(28, nameBytes.length, true);
        centralView.setUint16(30, 0, true);
        centralView.setUint16(32, 0, true);
        centralView.setUint16(34, 0, true);
        centralView.setUint16(36, 0, true);
        centralView.setUint32(38, 0, true);
        centralView.setUint32(42, offset, true);
        centralParts.push(centralHeader, nameBytes);
        offset += localHeader.length + nameBytes.length + dataBytes.length;
    }

    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const endView = new DataView(end.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(4, 0, true);
    endView.setUint16(6, 0, true);
    endView.setUint16(8, files.length, true);
    endView.setUint16(10, files.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, offset, true);
    endView.setUint16(20, 0, true);
    return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
}

async function toBytes(data, encoder) {
    if (typeof data === "string") {
        return encoder.encode(data);
    }
    if (data instanceof Blob) {
        return new Uint8Array(await data.arrayBuffer());
    }
    if (data instanceof Uint8Array) {
        return data;
    }
    throw new Error("Nieobsługiwany typ pliku w paczce.");
}

const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let index = 0; index < 256; index += 1) {
        let value = index;
        for (let bit = 0; bit < 8; bit += 1) {
            value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
        }
        table[index] = value >>> 0;
    }
    return table;
})();

function crc32(bytes) {
    let crc = 0xffffffff;
    for (const byte of bytes) {
        crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
}
