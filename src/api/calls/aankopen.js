import ApiCalls from "../ApiCalls";
import { getAllAankopen, getAankoop, createAankoop, updateAankoop, deleteAankoop, deliveredAankoop, paidAankoop } from "../routes/aankopen"
import { getAllBtws } from "../routes/btw"
import { getCounter } from "../routes/counters";
import Socket from "../../logic/factories/socketFactory"

class AankopenController {

    // Overview
    static all(context, params, callback){
        ApiCalls.getAll(getAllAankopen, params, callback, context)
    }

    static delivered(context, body, socket){
        ApiCalls.update(deliveredAankoop, body, context, false, socket, Socket.AANKOPEN)
    }

    static paid(context, body, socket){
        ApiCalls.update(paidAankoop, body, context, false, socket, Socket.AANKOPEN)
    }


    // Create View
    static getPreData(context, callback){
        ApiCalls.getMultiple([getAllBtws(), getCounter()], callback, context)
    }

    static create(context, body, socket){
        ApiCalls.create(createAankoop, body, context, true, socket, Socket.AANKOPEN)
    }


    // Update
    static getPreDataUpdate(context, id, callback){
        ApiCalls.getMultiple([getAllBtws(), getAankoop(id)], callback, context)
    }

    static update(context, body, socket){
        ApiCalls.update(updateAankoop, body, context, true, socket, Socket.AANKOPEN)
    }

    static deleteById(context, body, socket){
        ApiCalls.deleteById(deleteAankoop, body.id, context, true, socket, Socket.AANKOPEN)
    }

}

export default AankopenController