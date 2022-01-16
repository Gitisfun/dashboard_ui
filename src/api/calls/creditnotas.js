import ApiCalls from "../ApiCalls";
import { getAllCreditnotas, getCreditnota, createCreditnota, updateCreditnota, deleteCreditnota, paidCreditnota } from "../routes/creditnotas"
import { getAllBtws } from "../routes/btw"
import { getCounter } from "../routes/counters";
import Socket from "../../logic/factories/socketFactory"

class CreditnotasController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllCreditnotas, params, callback, context)
    }

    static paid(context, body, socket){
        ApiCalls.update(paidCreditnota, body, context, false, socket, Socket.CREDITNOTAS)
    }


    // Create View
    static getPreData(context, callback){
        ApiCalls.getMultiple([getAllBtws(), getCounter()], callback, context)
    }

    static create(context, body, socket){
        ApiCalls.create(createCreditnota, body, context, true, socket, Socket.CREDITNOTAS)
    }


    // Update
    static getPreDataUpdate(context, id, callback){
        ApiCalls.getMultiple([getAllBtws(), getCreditnota(id)], callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateCreditnota, body, context, true, socket, Socket.CREDITNOTAS)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteCreditnota, body.id, context, true, socket, Socket.CREDITNOTAS)
    }

}

export default CreditnotasController