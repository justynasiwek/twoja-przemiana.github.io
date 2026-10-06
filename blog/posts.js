// Dane postów na blogu twoja-przemiana.pl
// Nowe wpisy używają jednego obrazu 960 na 600 px na karcie i w artykule.

const blogPosts = [
    {
        "slug": "stawianie-granic",
        "title": "Nie-prosty przepis na stawianie granic",
        "date": "1 października 2026",
        "cardImage": "stawianie-granic-960x600.jpg",
        "contentImage": "stawianie-granic-960x600.jpg",
        "excerpt": "Proste porady, jak skutecznie stawiać granice, co sprytnego powiedzieć, żeby zadbać o siebie, których jest mnóstwo w social mediach, niestety często nie pomagają."
    },
    {
        "slug": "jak-upewnianie-sie-moze-obnizac-samoocene",
        "title": "Jak upewnianie się może obniżać samoocenę?",
        "date": "31 sierpnia 2026",
        "cardImage": "jak-upewnianie-sie-moze-obnizac-samoocene-960x600.jpg",
        "contentImage": "jak-upewnianie-sie-moze-obnizac-samoocene-960x600.jpg",
        "excerpt": "Budowanie samooceny do złożony proces i jest wiele czynników, które mogą ją obniżać, takich jak: • nadmierne oczekiwania wobec siebie, które sprawiaj, że ciągle jesteśmy niewystarczający, brak doświadczenia i…"
    },
    {
        "slug": "toksyczny_szef",
        "title": "Jak poradzić sobie z toksycznym szefem",
        "date": "17 sierpnia 2026",
        "cardImage": "toksyczny_szef-960x600.jpg",
        "contentImage": "toksyczny_szef-960x600.jpg",
        "excerpt": "Można, tylko że tacy szefowie doceniają nie dobrych i efektywnych pracowników, ale tych, którzy zaspokajają ich potrzeby. Toksyk lubi informatorów, plotkarzy, klakierów oraz osoby dostępne na każde skinienie. Co możesz zrobić…"
    },
    {
        "slug": "odpoczynek",
        "title": "Czy dajemy sobie prawo do odpoczynku?",
        "date": "12 sierpnia 2026",
        "cardImage": "odpoczynek-960x600.jpg",
        "contentImage": "odpoczynek-960x600.jpg",
        "excerpt": "Dlaczego tak trudno naprawdę odpocząć i skąd bierze się przekonanie, że relaks trzeba sobie zasłużyć?"
    },
    {
        "slug": "wiosna",
        "title": "Wiosna przychodzi do każdego, ale nie każdy ją czuje…",
        "date": "11 marca 2026",
        "cardImage": "wiosna-960x600.jpg",
        "contentImage": "wiosna-960x600.jpg",
        "excerpt": "Wiosna przychodzi do każdego, ale nie każdy ją czuje…"
    },
    {
        "slug": "szefowie",
        "title": "Jakim jestem szefem?",
        "date": "16 października 2025",
        "cardImage": "szef2.jpg",
        "contentImage": "szef2.jpg",
        "excerpt": "z okazji Waszego święta, proponuję chwilę na refleksję pod hasłem „Jakim jestem szefem?"
    },
    {
        "slug": "wypalenie-zawodowe",
        "title": "Wypalenie zawodowe, czy powakacyjne rozleniwienie?",
        "date": "1 września 2025",
        "cardImage": "wypalenie-zawodowe-960x600.jpg",
        "contentImage": "wypalenie-zawodowe-960x600.jpg",
        "excerpt": "Wracasz po urlopie do pracy i czujesz, że masz dość? Czy to już wypalenie zawodowe, czy tylko przejściowy kryzys?"
    },
    {
        "slug": "pracoholizm",
        "title": "Kiedy praca staje się obsesją…",
        "date": "14 kwietnia 2025",
        "cardImage": "pracoholizm-960x600.jpg",
        "contentImage": "pracoholizm-960x600.jpg",
        "excerpt": "Jeśli dużo pracujemy, po czym poznać, czy już wpadliśmy w pułapkę pracoholizmu?"
    },
    {
        "slug": "menedzerowie-nie-doceniaja",
        "title": "Dlaczego menedżerowie nie doceniają…",
        "date": "9 kwietnia 2025",
        "cardImage": "menedzerowie-nie-doceniaja-960x600.jpg",
        "contentImage": "menedzerowie-nie-doceniaja-960x600.jpg",
        "excerpt": "Utarło się przekonanie, że pracownicy potrzebują pochwały lub kary. Czy systemy motywacyjne naprawdę działają?"
    },
    {
        "slug": "wiosenne-porzadki",
        "title": "Wiosenne porządki w karierze",
        "date": "21 marca 2025",
        "cardImage": "wiosenne-porzadki-960x600.jpg",
        "contentImage": "wiosenne-porzadki-960x600.jpg",
        "excerpt": "Nasza kariera zawodowa i sytuacja w pracy są warte chwili uwagi, a być może także poukładania na nowo."
    },
    {
        "slug": "szczescie",
        "title": "Szczęście",
        "date": "12 marca 2025",
        "cardImage": "szczescie-960x600.jpg",
        "contentImage": "szczescie-960x600.jpg",
        "excerpt": "Cóż to jest szczęście i od czego zależy, czy jesteśmy szczęśliwi? Kilka przemyśleń z okazji Międzynarodowego Dnia Szczęścia."
    },
    {
        "slug": "decyzje",
        "title": "Decyzje, decyzje…",
        "date": "9 lutego 2025",
        "cardImage": "decyzje-960x600.jpg",
        "contentImage": "decyzje-960x600.jpg",
        "excerpt": "Podejmowanie decyzji życiowych bywa trudne. Jak do tego podejść, aby w przyszłości niczego nie żałować?"
    },
    {
        "slug": "pewnosc-siebie",
        "title": "Na jakich filarach oprzeć pewność siebie?",
        "date": "8 stycznia 2025",
        "cardImage": "pewnosc-siebie-960x600.jpg",
        "contentImage": "pewnosc-siebie-960x600.jpg",
        "excerpt": "Czy można zmienić swój brak pewności siebie? Nie tylko w konkretnej sytuacji, ale tak na stałe?"
    }
];

// Opublikowane artykuły spoza listy na stronie głównej.
const blogArchivePosts = [
    {
        "slug": "jak-rozpoznac-wypalenie-zawodowe",
        "title": "Jak rozpoznać wypalenie zawodowe? Objawy i pierwsze kroki",
        "isoDate": "2026-06-15"
    },
    {
        "slug": "psycholog-psychoterapeuta-roznice",
        "title": "Psycholog, psychoterapeuta, psychiatra. Do kogo się zgłosić?",
        "isoDate": "2026-06-22"
    },
    {
        "slug": "ile-trwa-terapia-cbt",
        "title": "Ile trwa terapia poznawczo-behawioralna i jak przebiega?",
        "isoDate": "2026-06-29"
    }
];
