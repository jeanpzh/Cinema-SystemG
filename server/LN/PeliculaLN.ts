import { PeliculaDA } from "../acessData/PeliculaDA";
import Pelicula from "../models/Pelicula";

class PeliculaLN {
  async obtenerPeliculasLN() {
    const peliculas: Pelicula[] = await new PeliculaDA().obtenerPeliculasDA();
    return peliculas;
  }

  async añadirPeliculaLN(pelicula: Pelicula) {
    const nuevaPelicula: Pelicula = await new PeliculaDA().añadirPeliculaDA(
      pelicula
    );
    return nuevaPelicula;
  }

  async obtenerPeliculaIDLN(id: string) {
    return await new PeliculaDA().obtenerPeliculaIDDA(id);
  }

  async actualizarPeliculaLN(pelicula: Pelicula) {
    await new PeliculaDA().actualizarPeliculaDA(pelicula);
  }

  async eliminarPeliculaLN(id: string) {
    await new PeliculaDA().eliminarPeliculaDA(id);
  }
}

export default PeliculaLN;
