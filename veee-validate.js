import { extend } from "vee-validate";
import { required, required_if, confirmed, numeric, min, email, alpha_num } from "vee-validate/dist/rules";
import { setInteractionMode } from 'vee-validate';

setInteractionMode('passive');

extend("required", {
  ...required,
  message: "Dit veld is verplicht"
});

extend("required_if", {
  ...required_if,
  message: "Dit veld is verplicht"
});

extend("confirmed", {
  ...confirmed,
  message: "Wachtwoorden moeten overeen komen"
})

extend("numeric", {  
  ...numeric,
  message: "Dit veld moet een getal groter dan 0 zijn"
});


extend("min", {
  ...min,
  message: "Dit veld moet ten minste uit 7 karakters bestaan"
});

extend("email", {
  ...email,
  message: "Dit veld moet een geldig e-mail adress bevatten"
});

extend("alpha_num", {
  ...alpha_num,
  message: "Dit veld mag alleen uit cijfers en letters bestaan"
})

extend('positive', value => {
  if (value >= 0) {
    return true;
  }

  return "Dit veld moet een getal groter dan 0 zijn";
});