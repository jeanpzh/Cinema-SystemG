import { PeliculaDA } from "../acessData/PeliculaDA";
import Pelicula from "../models/Pelicula";

class PeliculaLN {
  async obtenerPeliculasLN() {
    const peliculas: Pelicula[] = await new PeliculaDA().obtenerPeliculasDA();
    return peliculas;
  }

  public async añadirPeliculaLN(pelicula: Pelicula): Promise<Pelicula> {
    try {
      return await new PeliculaDA().añadirPeliculaDA(pelicula);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async obtenerPeliculaIDLN(id: string) {
    return await new PeliculaDA().obtenerPeliculaIDDA(id);
  }

  public async actualizarPeliculaLN(
    pelicula: Pelicula
  ): Promise<Pelicula | null> {
    try {
      return await new PeliculaDA().actualizarPeliculaDA(pelicula);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async eliminarPeliculaLN(id: string) {
    await new PeliculaDA().eliminarPeliculaDA(id);
  }
}

export default PeliculaLN;
