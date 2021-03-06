import Socket from "../logic/factories/socketFactory";
import Notifications from "../logic/factories/notifications.js";

class ApiCalls {
  static login(requestHandler, body, context, callback){
    requestHandler(body)
      .then((res) => {
        if (res) {
          /*
          Notifications.successMessage("Succesvol ingelogd", context);
          */
         callback(res)
        }
      })
      .catch((err) => {
        if (err) {
          Notifications.errorMessage("Er ging iets fout, probeer het nog eens", context);
        }
      });
  }

  static check(requestHandler, body, context, callback, errorCallback){
    requestHandler(body)
      .then((res) => {
        if(res){
          callback(res)
        }
      })
      .catch((err) => {
        if(err){
          errorCallback(err)
        }
      })
  }

  static getAll(requestHandler, params, responseHandler, context) {
    requestHandler(params)
      .then((res) => responseHandler(res))
      .catch((err) => {
        if (err) {
          Notifications.errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
        }
      });
  }

  static getById(requestHandler, id, responseHandler, context) {
    requestHandler(id)
      .then((res) => responseHandler(res))
      .catch((err) => {
        if (err) {
          Notifications.errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
        }
      });
  }

  static getMultiple(requestList, responseHandler, context) {
    Promise.all(requestList)
      .then((res) => responseHandler(res))
      .catch((err) => {
        if (err) {
          Notifications.errorMessage("Er ging iets fout met het ophalen van de gegevens", context);
        }
      });
  }

  static create(requestHandler, body, context, back, socket, to) {
    requestHandler(body)
      .then((res) => {
        if (res) {
          Notifications.successMessage("Succesvol toegevoegd", context);
          if (socket) {
            Socket.notify(socket, to);
          }
          if (back) {
            context.$router.go(-1);
          }
        }
      })
      .catch((err) => {
        if (err) {
          Notifications.errorMessage("Kon niet worden toegevoegd, er ging iets fout op de server", context);
        }
      });
  }

  static update(requestHandler, body, context, back, socket, to) {
    requestHandler(body.id, body)
      .then((res) => {
        if (res) {
          Notifications.successMessage("Succesvol gewijzigd", context);
          if (socket) {
            Socket.notify(socket, to);
          }
          if (back) {
            context.$router.go(-1);
          }
        }
      })
      .catch((err) => {
        if (err) {
          Notifications.errorMessage("Kon niet worden toegevoegd, er ging iets fout op de server", context);
        }
      });
  }

  static deleteById(requestHandler, id, context, back, socket, to) {
    requestHandler(id)
      .then((res) => {
        if (res) {
          Notifications.successMessage("Succesvol verwijderd", context);
          if (socket) {
            Socket.notify(socket, to);
          }
          if (back) {
            context.$router.go(-1);
          }
        }
      })
      .catch((err) => {
        if (err) {
          Notifications.errorMessage("Kon niet worden verwijderd, er ging iets fout op de server", context);
        }
      });
  }
}

export default ApiCalls;
