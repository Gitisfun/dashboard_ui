import Socket from "../logic/factories/socketFactory"

export default {
    data(){
        return {
            socket: null
        }
    },
    created(){
        console.log("Opened socket...");
        this.socket = Socket.getConnection()

    },
    destroyed(){
        console.log("Closed socket...");
        this.socket.close()
    }
}