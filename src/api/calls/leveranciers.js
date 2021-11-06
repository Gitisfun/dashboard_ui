import ApiCalls from "../ApiCalls";
import { getAllBtws } from "../routes/btw";
import { getAllBetalingstermijnen } from "../routes/betalingstermijnen";
import { getAllLeveranciers, createLeverancier, espLeverancier } from "../routes/leveranciers"

class LeveranciersController{

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllLeveranciers, params, callback, context)
    }
    static esp(context, body){
        ApiCalls.update(espLeverancier, body, context, false)
    }

    // Create View
    static getPreData(context, callback) {
        ApiCalls.getMultiple([getAllBtws(), getAllBetalingstermijnen()], callback, context)
    }

    static create(context, body){
        ApiCalls.create(createLeverancier, body, context, true)
    }

    // Update

}

export default LeveranciersController