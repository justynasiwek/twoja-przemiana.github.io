/**
 * Funkcja wczytuje obraz, skaluje go do proporcji 1:1.6 (wys:szer) 
 * z zachowaniem proporcji samego zdjęcia i minimalną szerokością 640px.
 * * @param {string} imageUrl - Ścieżka do obrazu na serwerze
 * @returns {Promise<HTMLImageElement>} - Obietnica zwracająca gotowy element <img>
 */
function processAndFormatImageSmall(imageUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        // Zabezpieczenie na wypadek ładowania obrazów z innych domen (CORS)
        img.crossOrigin = "Anonymous"; 

        img.onload = () => {
            const origW = img.width;
            const origH = img.height;
            const targetRatio = 1.6; // Szerokość do wysokości (1.6 / 1)

            let canvasW, canvasH;

            // 1. Ustalenie wymiarów płótna (canvas) tak, aby miało proporcje 1:1.6
            if (origW / origH > targetRatio) {
                // Obraz jest szerszy niż proporcja 1:1.6
                canvasW = origW;
                canvasH = origW / targetRatio;
            } else {
                // Obraz jest węższy (lub ma dokładnie 1:1.6) - tło będzie dodane z prawej
                canvasH = origH;
                canvasW = origH * targetRatio;
            }

            // 2. Weryfikacja minimalnej długości (szerokości) = 640px
            let scaleMultiplier = 1;
            if (canvasW < 640) {
                scaleMultiplier = 640 / canvasW;
                canvasW = 640;
                canvasH = canvasH * scaleMultiplier; // Zachowujemy wymuszoną proporcję 1:1.6 płótna
            }

            // 3. Przygotowanie Canvas
            const canvas = document.createElement('canvas');
            canvas.width = canvasW;
            canvas.height = canvasH;
            const ctx = canvas.getContext('2d');

            // 4. Obliczenie nowych wymiarów samego obrazka (skalowanie bez utraty proporcji)
            const drawW = origW * scaleMultiplier;
            const drawH = origH * scaleMultiplier;

            // 5. Rysowanie obrazu w lewym górnym rogu (0,0)
            // Dzięki temu reszta płótna (z prawej lub na dole) pozostaje domyślnie przezroczysta.
            ctx.drawImage(img, 0, 0, drawW, drawH);

            // 6. Konwersja do elementu <img> gotowego do wklejenia na stronę
            const finalImg = document.createElement('img');
            // Używamy 'image/png', aby zachować przezroczystość tła
            finalImg.src = canvas.toDataURL("image/png"); 
            
            finalImg.onload = () => resolve(finalImg);
        };

        img.onerror = (err) => {
            reject(new Error("Nie udało się wczytać obrazu. Sprawdź ścieżkę lub ustawienia CORS."));
        };

        img.src = imageUrl;
    });
}

// uzycie:
// <!DOCTYPE html>
// <html lang="pl">
// <head>
//     <meta charset="UTF-8">
//     <title>Skalowanie Obrazu</title>
// </head>
// <body>
//     <h2>Wynikowy obraz:</h2>
//     <div id="image-container"></div>

//     <script>
//         // Przykład użycia funkcji:
//         const urlObrazu = "sciezka/do/twojego/obrazka.jpg";

//         processAndFormatImageSmall(urlObrazu)
//             .then(gotowyObraz => {
//                 // gotowyObraz to pełnoprawny element <img src="...">
//                 // Możesz mu nadać klasy CSS, atrybuty alt itp.
//                 gotowyObraz.alt = "Przeskalowany obraz";
//                 gotowyObraz.style.border = "1px solid #ccc"; // Tylko dla podglądu krawędzi

//                 // Wklejamy obraz na stronę www do wybranego kontenera
//                 document.getElementById('image-container').appendChild(gotowyObraz);
//             })
//             .catch(blad => {
//                 console.error("Wystąpił błąd:", blad);
//             });
//     </script>
// </body>
// </html>