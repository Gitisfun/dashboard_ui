import ApiCalls from "../ApiCalls";
import { getAllBtws } from "../routes/btw";
import { getAllBetalingstermijnen } from "../routes/betalingstermijnen";
import { createLeverancier } from "../routes/leveranciers"

class LeveranciersController{

    // Create View
    static getPreData(context, callback) {
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen()], callback, context)
    }

    static create(context, body){
        ApiCalls.create(createLeverancier, body, context, true)
    }



}

export default LeveranciersController