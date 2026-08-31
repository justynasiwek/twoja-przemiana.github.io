// Dane postów na blogu twoja-przemiana.pl
// Każdy wpis korzysta z osobnego obrazu karty i obrazu w treści.

const blogPosts = [
    {
        slug: "jak-upewnianie-sie-moze-obnizac-samoocene",
        title: "Jak upewnianie się może obniżać samoocenę?",
        date: "31 sierpnia 2026",
        cardImage: "jak-upewnianie-sie-moze-obnizac-samoocene-card.webp",
        contentImage: "jak-upewnianie-sie-moze-obnizac-samoocene-post.webp",
        excerpt: "Budowanie samooceny do złożony proces i jest wiele czynników, które mogą ją obniżać, takich jak: • nadmierne oczekiwania wobec siebie, które sprawiaj, że ciągle jesteśmy niewystarczający, brak doświadczenia i…"
    },
    {
        slug: "toksyczny_szef",
        title: "Toksyczny szef",
        date: "17 sierpnia 2026",
        cardImage: "Toksyk_1500x1000.jpg",
        contentImage: "Toksyk_1200x628.jpg",
        excerpt: "Czy można pracować tak, żeby nawet toksyczny szef…"
    },
    {
        slug: "odpoczynek",
        title: "Czy dajemy sobie prawo do odpoczynku?",
        date: "12 sierpnia 2026",
        cardImage: "odpoczynek-card.jpg",
        contentImage: "odpoczynek.webp",
        excerpt: "Dlaczego tak trudno naprawdę odpocząć i skąd bierze się przekonanie, że relaks trzeba sobie zasłużyć?"
    },
    {
        slug: "wiosna",
        title: "Wiosna przychodzi do każdego, ale nie każdy ją czuje…",
        date: "11 marca 2026",
        cardImage: "wiosna.jpg",
        contentImage: "wiosna.webp",
        excerpt: "Wiosna przychodzi do każdego, ale nie każdy ją czuje…"
    },
    {
        slug: "szefowie",
        title: "Drodzy Szefowie,",
        date: "16 października 2025",
        cardImage: "szefowie.jpg",
        contentImage: "szefowie.webp",
        excerpt: "z okazji Waszego święta, proponuję chwilę na refleksję pod hasłem „Jakim jestem szefem?"
    },
    {
        slug: "wypalenie-zawodowe",
        title: "Wypalenie zawodowe, czy powakacyjne rozleniwienie?",
        date: "1 września 2025",
        cardImage: "wypalenie.jpg",
        contentImage: "wypalenie.webp",
        excerpt: "Wracasz po urlopie do pracy i czujesz, że masz dość? Czy to już wypalenie zawodowe, czy tylko przejściowy kryzys?"
    },
    {
        slug: "pracoholizm",
        title: "Kiedy praca staje się obsesją…",
        date: "14 kwietnia 2025",
        cardImage: "pracoholizm.jpg",
        contentImage: "pracoholizm.webp",
        excerpt: "Jeśli dużo pracujemy, po czym poznać, czy już wpadliśmy w pułapkę pracoholizmu?"
    },
    {
        slug: "menedzerowie-nie-doceniaja",
        title: "Dlaczego menedżerowie nie doceniają…",
        date: "9 kwietnia 2025",
        cardImage: "menedzer.jpg",
        contentImage: "menedzer.webp",
        excerpt: "Utarło się przekonanie, że pracownicy potrzebują pochwały lub kary. Czy systemy motywacyjne naprawdę działają?"
    },
    {
        slug: "wiosenne-porzadki",
        title: "Wiosenne porządki",
        date: "21 marca 2025",
        cardImage: "porzadki.jpg",
        contentImage: "porzadki.webp",
        excerpt: "Nasza kariera zawodowa i sytuacja w pracy są warte chwili uwagi, a być może także poukładania na nowo."
    },
    {
        slug: "szczescie",
        title: "Szczęście",
        date: "12 marca 2025",
        cardImage: "szczescie.jpg",
        contentImage: "szczescie.webp",
        excerpt: "Cóż to jest szczęście i od czego zależy, czy jesteśmy szczęśliwi? Kilka przemyśleń z okazji Międzynarodowego Dnia Szczęścia."
    },
    {
        slug: "decyzje",
        title: "Decyzje decyzje",
        date: "9 lutego 2025",
        cardImage: "decyzje.jpg",
        contentImage: "decyzje.webp",
        excerpt: "Podejmowanie decyzji życiowych bywa trudne. Jak do tego podejść, aby w przyszłości niczego nie żałować?"
    },
    {
        slug: "pewnosc-siebie",
        title: "Na jakich filarach oprzeć pewność siebie?",
        date: "8 stycznia 2025",
        cardImage: "pewnosc-siebie.jpg",
        contentImage: "pewnosc-siebie.webp",
        excerpt: "Czy można zmienić swój brak pewności siebie? Nie tylko w konkretnej sytuacji, ale tak na stałe?"
    }
];
