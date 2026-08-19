// Dane postów na blogu twoja-przemiana.pl
// Aby dodać nowy post:
//   1. Dodaj nowy wpis na POCZĄTEK tej tablicy (najnowszy pierwszy)
//   2. Utwórz nowy plik HTML w folderze blog/ (skopiuj istniejący post jako szablon)
//   3. Obrazek posta umieść w blog/img/
//
// {
//         slug: "ile-trwa-terapia-cbt",
//         title: "Ile trwa terapia poznawczo-behawioralna i jak przebiega?",
//         date: "29 czerwca 2026",
//         image: "terapia-cbt.webp",
//         excerpt: "CBT należy do terapii krótkoterminowych, ale co to właściwie znaczy? Opisuję, jak wygląda proces terapii od pierwszej konsultacji do zakończenia."
//     },
//     {
//         slug: "psycholog-psychoterapeuta-roznice",
//         title: "Psycholog, psychoterapeuta, psychiatra. Do kogo się zgłosić?",
//         date: "22 czerwca 2026",
//         image: "psycholog-roznice.webp",
//         excerpt: "Te trzy zawody często się mylą, a różnice mają praktyczne znaczenie. Wyjaśniam, kto czym się zajmuje i do kogo zgłosić się w pierwszej kolejności."
//     },
//     {
//         slug: "jak-rozpoznac-wypalenie-zawodowe",
//         title: "Jak rozpoznać wypalenie zawodowe? Objawy i pierwsze kroki",
//         date: "15 czerwca 2026",
//         image: "rozpoznac-wypalenie.webp",
//         excerpt: "Zmęczenie, które nie mija po odpoczynku, cynizm wobec pracy i poczucie braku skuteczności. Sprawdź, po czym poznać wypalenie zawodowe."
//     },


const blogPosts = [
     {
        slug: "toksyczny_szef",
        title: "Toksyczny szef",
        date: "17 sierpnia 2026",
        image: "Toksyk_1500x1000.jpg",
        excerpt: "Czy można pracować tak, żeby nawet toksyczny szef…"
    }, 
    {
        slug: "odpoczynek",
        title: "Czy dajemy sobie prawo do odpoczynku?",
        date: "12 sierpnia 2026",
        image: "odpoczynek.webp",
        excerpt: "Dlaczego tak trudno naprawdę odpocząć i skąd bierze się przekonanie, że relaks trzeba sobie zasłużyć?"
    },
    {
        slug: "wiosna",
        title: "Wiosna przychodzi do każdego, ale nie każdy ją czuje…",
        date: "11 marca 2026",
        image: "wiosna.webp",
        excerpt: "Wiosna przychodzi do każdego, ale nie każdy ją czuje…"
    },
    {
        slug: "szefowie",
        title: "Drodzy Szefowie,",
        date: "16 października 2025",
        image: "szefowie.webp",
        excerpt: "z okazji Waszego święta, proponuję chwilę na refleksję pod hasłem „Jakim jestem szefem?"
    },
    {
        slug: "wypalenie-zawodowe",
        title: "Wypalenie zawodowe, czy powakacyjne rozleniwienie?",
        date: "1 września 2025",
        image: "wypalenie.webp",
        excerpt: "Wracasz po urlopie do pracy i czujesz, że masz dość? Czy to już wypalenie zawodowe, czy tylko przejściowy kryzys?"
    },
    {
        slug: "pracoholizm",
        title: "Kiedy praca staje się obsesją…",
        date: "14 kwietnia 2025",
        image: "pracoholizm.webp",
        excerpt: "Jeśli dużo pracujemy – po czym poznać, czy już wpadliśmy w pułapkę pracoholizmu?"
    },
    {
        slug: "menedzerowie-nie-doceniaja",
        title: "Dlaczego menedżerowie nie doceniają…",
        date: "9 kwietnia 2025",
        image: "menedzer.webp",
        excerpt: "Utarło się przekonanie, że pracownicy potrzebują pochwały lub kary. Czy systemy motywacyjne naprawdę działają?"
    },
    {
        slug: "wiosenne-porzadki",
        title: "Wiosenne porządki",
        date: "21 marca 2025",
        image: "porzadki.webp",
        excerpt: "Nasza kariera zawodowa i sytuacja w pracy są warte chwili uwagi, a być może także poukładania na nowo."
    },
    {
        slug: "szczescie",
        title: "Szczęście",
        date: "12 marca 2025",
        image: "szczescie.webp",
        excerpt: "Cóż to jest szczęście i od czego zależy, czy jesteśmy szczęśliwi? Kilka przemyśleń z okazji Międzynarodowego Dnia Szczęścia."
    },
    {
        slug: "decyzje",
        title: "Decyzje decyzje",
        date: "9 lutego 2025",
        image: "decyzje.webp",
        excerpt: "Podejmowanie decyzji życiowych bywa trudne. Jak do tego podejść, aby w przyszłości niczego nie żałować?"
    },
    {
        slug: "pewnosc-siebie",
        title: "Na jakich filarach oprzeć pewność siebie?",
        date: "8 stycznia 2025",
        image: "pewnosc-siebie.webp",
        excerpt: "Czy można zmienić swój brak pewności siebie? Nie tylko w konkretnej sytuacji, ale tak na stałe?"
    }
];
