// Dane postów na blogu
// Aby dodać nowy post:
//   1. Dodaj nowy wpis na POCZĄTEK tej tablicy (najnowszy pierwszy)
//   2. Utwórz nowy plik HTML w folderze blog/ (skopiuj istniejący post jako szablon)
//   3. Obrazek posta umieść w blog/img/
//
const blogPosts = [
    {
        slug: "wypalenie-zawodowe",
        title: "Wypalenie zawodowe, czy powakacyjne rozleniwienie?",
        date: "1 września 2025",
        image: "wypalenie.jpg",
        excerpt: "Wracasz po urlopie do pracy i czujesz, że masz dość? Czy to już wypalenie zawodowe, czy tylko przejściowy kryzys?"
    },
    {
        slug: "pracoholizm",
        title: "Kiedy praca staje się obsesją…",
        date: "14 kwietnia 2025",
        image: "pracoholizm.jpg",
        excerpt: "Jeśli dużo pracujemy – po czym poznać, czy już wpadliśmy w pułapkę pracoholizmu?"
    },
    {
        slug: "menedzerowie-nie-doceniaja",
        title: "Dlaczego menedżerowie nie doceniają…",
        date: "9 kwietnia 2025",
        image: "menedzer.jpg",
        excerpt: "Utarło się przekonanie, że pracownicy potrzebują pochwały lub kary. Czy systemy motywacyjne naprawdę działają?"
    },
    {
        slug: "wiosenne-porzadki",
        title: "Wiosenne porządki",
        date: "21 marca 2025",
        image: "porzadki.jpg",
        excerpt: "Nasza kariera zawodowa i sytuacja w pracy są warte chwili uwagi, a być może także poukładania na nowo."
    },
    {
        slug: "szczescie",
        title: "Szczęście",
        date: "12 marca 2025",
        image: "szczescie.jpg",
        excerpt: "Cóż to jest szczęście i od czego zależy, czy jesteśmy szczęśliwi? Kilka przemyśleń z okazji Międzynarodowego Dnia Szczęścia."
    },
    {
        slug: "decyzje",
        title: "Decyzje decyzje",
        date: "9 lutego 2025",
        image: "decyzje.jpg",
        excerpt: "Podejmowanie decyzji życiowych bywa trudne. Jak do tego podejść, aby w przyszłości niczego nie żałować?"
    },
    {
        slug: "pewnosc-siebie",
        title: "Na jakich filarach oprzeć pewność siebie?",
        date: "8 stycznia 2025",
        image: "pewnosc-siebie.jpg",
        excerpt: "Czy można zmienić swój brak pewności siebie? Nie tylko w konkretnej sytuacji, ale tak na stałe?"
    }
];
