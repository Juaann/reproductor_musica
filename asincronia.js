const mostrarMusica = async (artista) => {
  const contenedor = document.getElementById('lista-canciones');

  contenedor.innerHTML = '<p>Buscando...</p>';

  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artista)}&limit=100`);
    if (!res.ok) throw new Error('Error al conectar');

    const data = await res.json();
    const canciones = data.results;

    if (canciones.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    //Pasamos los datos en HTML usando map
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


//Lógica de busqueda
const btnBuscar = document.getElementById('btn-buscar');
const inputArtista = document.getElementById('input-artista');

const ejecutarBusqueda = () => {
    const artista = inputArtista.value.trim();
    if (artista) {
        mostrarMusica(artista);
    }
};

btnBuscar.addEventListener('click', ejecutarBusqueda);

// Evento al presionar Enter en el input
inputArtista.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        ejecutarBusqueda();
    }
});
