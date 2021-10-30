import ApiCalls from "../ApiCalls";
import { getAllBtws } from "../routes/btw";
import { getAllBetalingstermijnen } from "../routes/betalingstermijnen";

class LeveranciersController{

    // Overview
    static getPreData(context, callback) {
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen()], callback, context)
    }


}

export default LeveranciersController