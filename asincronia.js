const mostrarMusica = async (artista) => {
  const contenedor = document.getElementById('lista-canciones');

  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${artista}&limit=12`);
    if (!res.ok) throw new Error('Error al conectar');

    const data = await res.json();
    const canciones = data.results;

    //Pasamos los datos en HTML usando .map()
    const htmlCards = canciones.map(({ trackName, artistName, artworkUrl100, previewUrl }) => {
      return `
        <div class="card">
          <img src="${artworkUrl100}" alt="${trackName}">
          <h3>${trackName}</h3>
          <p>${artistName}</p>
          <audio controls src="${previewUrl}"></audio>
        </div>
      `;
    }).join('');

    contenedor.innerHTML = htmlCards;

  } catch (err) {
    contenedor.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
  }
};

mostrarMusica('Shakira');