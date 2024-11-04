import HorarioDA from "../acessData/HorarioDA";
import Horario from "../models/Horario";

class HorarioLN {

    async getHorariosLN(): Promise<Horario[]> {
        return await new HorarioDA().getHorariosDA();
    }
}
export default HorarioLN;