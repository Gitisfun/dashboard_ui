import ApiCalls from "../ApiCalls";
import { getAllBtws } from "../routes/btw";
import { getAllBetalingstermijnen } from "../routes/betalingstermijnen";
import { getAllLeveranciers, createLeverancier } from "../routes/leveranciers"

class LeveranciersController{

    static all(context, params, callback){
        ApiCalls.getAll(getAllLeveranciers, params, callback, context)
    }

    // Create View
    static getPreData(context, callback) {
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen()], callback, context)
    }

    static create(context, body){
        ApiCalls.create(createLeverancier, body, context, true)
    }


}

export default LeveranciersController