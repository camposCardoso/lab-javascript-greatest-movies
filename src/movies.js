// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }

  const spielbergDramas = moviesArray.filter((movie) => {
    return (
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  });

  return spielbergDramas.length;
}
// Iteration 3: All scores average - Get the average of all scores with 2 decimals

function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;

  const total = moviesArray.reduce((acc, movie) => {
    return acc + (movie.score || 0);
  }, 0);

  const average = total / moviesArray.length;

  return Math.round(average * 100) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  // Filtramos las películas que son de género "Drama"
  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes("Drama")
  );

  // Si no hay películas de drama, devolvemos 0
  if (dramaMovies.length === 0) return 0;

  // Calculamos el promedio de las puntuaciones de las películas de drama
  const totalScore = dramaMovies.reduce(
    (acc, movie) => acc + (movie.score || 0),
    0
  );

  // Devolvemos el promedio, redondeado a 2 decimales
  return parseFloat((totalScore / dramaMovies.length).toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  // Usamos slice() para hacer una copia del array original y evitar mutarlo
  return moviesArray.slice().sort((a, b) => {
    // Primero comparamos por el año de estreno
    if (a.year === b.year) {
      // Si el año es el mismo, ordenamos alfabéticamente por el título
      return a.title.localeCompare(b.title);
    } else {
      // Si los años son diferentes, ordenamos por el año
      return a.year - b.year;
    }
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  // Crear una copia del array original y extraer solo los títulos
  const movieTitles = moviesArray.slice().map((movie) => movie.title);

  // Ordenar los títulos alfabéticamente
  const sortedTitles = movieTitles.sort();

  // Si hay más de 20 películas, devolver solo las primeras 20
  return sortedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  // Crear una copia del array original para no mutarlo
  return moviesArray.map((movie) => {
    // Crear una copia de cada película para no mutar el objeto original
    let newMovie = { ...movie };

    // Si la duración está presente en formato 'Xh Ym'
    if (newMovie.duration) {
      const duration = newMovie.duration.split(" "); // Separamos las horas y los minutos

      let hoursInMinutes = 0;
      let minutes = 0;

      // Si existe 'h' (horas), convertir las horas a minutos
      if (duration[0].includes("h")) {
        hoursInMinutes = parseInt(duration[0]) * 60;
      }

      // Si existe 'm' (minutos), agregar los minutos
      if (duration[1] && duration[1].includes("m")) {
        minutes = parseInt(duration[1]);
      }

      // Sumar las horas convertidas a minutos y los minutos
      newMovie.duration = hoursInMinutes + minutes;
    }

    // Devolver la película con la duración en minutos
    return newMovie;
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average

function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;

  const moviesByYear = moviesArray.reduce((acc, movie) => {
    if (!acc[movie.year]) acc[movie.year] = [];
    acc[movie.year].push(movie.score);
    return acc;
  }, {});

  const avgScoresByYear = Object.entries(moviesByYear).map(([year, scores]) => {
    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return { year: Number(year), avg: avg };
  });

  avgScoresByYear.sort((a, b) => {
    if (b.avg !== a.avg) return b.avg - a.avg;
    return a.year - b.year;
  });

  const best = avgScoresByYear[0];
  const avgFormatted = Math.round(best.avg * 10) / 10;
  return `The best year was ${best.year} with an average score of ${avgFormatted}`;
}

console.log(bestYearAvg([{ title: "Test Movie", year: 2001, score: 9 }]));
