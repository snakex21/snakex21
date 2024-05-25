document.addEventListener('DOMContentLoaded', function() {
    // Dane filmów
    const moviesData = {
        'topgun': [{
                    title: 'Top Gun',
                    year: 1986,
                    type: 'Akcja Romans Sensacyjny',
                    link: 'https://upstream.to/embed-1ferv58rjpm7.html',
                    image: 'https://filman.cc/public/static/poster/big/30091.jpg'
                },
                {
                    title: 'Top Gun: Maverick',
                    year: 2022,
                    type: 'Akcja',
                    link: 'https://sbchill.com/embed-2zh26ul71s0o.html',
                    image: 'https://filman.cc/public/static/poster/big/56188.jpg'
                }
            ]
            // Dodaj więcej serii filmów według potrzeb
    };

    // Funkcja do pobierania parametrów z URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const seriesKey = getQueryParam('series'); // Pobranie serii z URL
    const movies = moviesData[seriesKey]; // Pobranie danych filmów dla danej serii
    const moviesContainer = document.getElementById('moviesContainer');

    if (movies) {
        movies.forEach(movie => {
            const movieElement = `<div>
                <h3>${movie.title} (${movie.year})</h3>
                <img src="${movie.image}" alt="${movie.title}" style="width:200px;">
                <p>${movie.type}</p>
                <a href="${movie.link}" target="_blank">Watch Film</a>
            </div>`;
            moviesContainer.innerHTML += movieElement;
        });
    }
});