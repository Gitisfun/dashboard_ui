import Notifications from "../logic/factories/notifications.js";

class ApiCalls{

    static getAll(context){
        console.log('API Call : GET_ALL');
        Notifications.infoMessage("This is an info message", context)
    }

    static getById(){
        console.log('API Call : GET');
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

    static create(requestHandler, body, context, back){
        requestHandler(body)
        .then((res) => {
          if (res) {
            Notifications.successMessage("Succesvol toegevoegd", context);
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

    static update(){
        console.log('API Call : UPDATE');
    }

    static deleteById(){
        console.log('API Call : DELETE');
    }
}

export default ApiCalls