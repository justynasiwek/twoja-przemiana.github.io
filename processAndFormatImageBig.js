/**
 * Kadruje obraz nagłówka wpisu do formatu 2,7:1 i zwraca WebP 1350 na 500 px.
 * Obraz jest przycinany symetrycznie od środka, bez rozciągania i bez pustych pól.
 *
 * @param {string|Blob} imageSource Adres obrazu albo plik wybrany z dysku.
 * @returns {Promise<HTMLImageElement>} Gotowy element img z obrazem WebP.
 */
function processAndFormatImageBig(imageSource) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        let objectUrl = "";

        if (typeof imageSource === "string") {
            image.crossOrigin = "anonymous";
        } else if (imageSource instanceof Blob) {
            objectUrl = URL.createObjectURL(imageSource);
        } else {
            reject(new TypeError("Źródłem obrazu musi być adres URL albo plik."));
            return;
        }

        image.onload = () => {
            const targetWidth = 1350;
            const targetHeight = 500;
            const targetRatio = targetWidth / targetHeight;
            const sourceRatio = image.naturalWidth / image.naturalHeight;
            let sourceX = 0;
            let sourceY = 0;
            let sourceWidth = image.naturalWidth;
            let sourceHeight = image.naturalHeight;

            if (sourceRatio > targetRatio) {
                sourceWidth = image.naturalHeight * targetRatio;
                sourceX = (image.naturalWidth - sourceWidth) / 2;
            } else {
                sourceHeight = image.naturalWidth / targetRatio;
                sourceY = (image.naturalHeight - sourceHeight) / 2;
            }

            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const context = canvas.getContext("2d", { alpha: false });
            context.fillStyle = "#ffffff";
            context.fillRect(0, 0, targetWidth, targetHeight);
            context.drawImage(
                image,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                targetWidth,
                targetHeight
            );

            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }

            const result = new Image();
            result.width = targetWidth;
            result.height = targetHeight;
            result.alt = "Skadrowany obraz nagłówka wpisu";
            result.onload = () => resolve(result);
            result.onerror = () => reject(new Error("Nie udało się utworzyć obrazu WebP."));
            result.src = canvas.toDataURL("image/webp", 0.86);
        };

        image.onerror = () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            reject(new Error("Nie udało się wczytać obrazu."));
        };

        image.src = objectUrl || imageSource;
    });
}
