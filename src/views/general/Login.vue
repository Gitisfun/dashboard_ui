<template>
  <div id="login-box">
    <div v-show="isLoading" id="login-load-bar">Laden...</div>
    <div id="login-content" class="box">
      <ValidationObserver v-slot="{ handleSubmit }">
        <h1 id="login-title">Login</h1>
        <div id="login-form-box">
          <div class="login-form-line-box">
            <p class="login-text">Gebruikersnaam</p>
            <LoginTextInput type="text" v-model="gebruiker.gebruikersnaam" rules="required" />
          </div>
          <p class="login-text">Wachtwoord</p>
          <LoginTextInput type="password" v-model="gebruiker.wachtwoord" rules="required" />
        </div>
        <GenericBtn style="width: 100%; margin-top: 35px" text="Inloggen" btnStyle="success" @clicked="handleSubmit(login)"  />
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import LoginTextInput from "../../components/inputfields/LoginTextInput.vue"
import GenericBtn from "../../components/buttons/GenericBtn.vue"
import { ValidationObserver } from "vee-validate";
import AuthController from "../../api/calls/auth"
import Notifications from "../../logic/factories/notifications.js";
 
export default {
    name: "Login",
    components: {
      ValidationObserver,
      LoginTextInput,
      GenericBtn
    },
    data(){
      return {
        gebruiker: {
          gebruikersnaam: null,
          wachtwoord: null

        },
        isLoading: false
      }
    },
    methods: {
      login(){
        this.isLoading = true;
        AuthController.login(this, this.gebruiker, (res) => {
          setTimeout(() => { 
            this.isLoading = false; 
            if(res.data.status){
              Notifications.successMessage(res.data.msg, this);
              this.setTokens(res.data)
              this.$router.push({
                name: "Statistieken",
              });
            }
            else{
              Notifications.errorMessage(res.data.msg, this);
            }
            }, 3000);
        })
      },
      setTokens(data){
        this.$store.dispatch("setToken", data.token);
        this.$store.dispatch("setUser", data);
      }
    }

}
</script>

<style>
#login-box{
  background: linear-gradient(-45deg, #12CBC4, #1289A7  , #30336b, #130f40);
  background-size: 400% 400%;
	animation: gradient 15s linear infinite;
	height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

#login-content{
  width: 450px;
  padding-right: 25px;
  padding-left: 25px;
  padding-top: 35px;
  padding-bottom: 35px;
}

#login-title {
  font-size: 30px;
}

#login-form-box{
  margin-top: 25px;
  padding: 5px;
  text-align: start;
}

.login-form-line-box{
  margin-bottom: 20px;
}

.login-text {
  font-size: 16px;
  margin-bottom: 10px;
}

#login-load-bar {
  background: linear-gradient(-45deg, #f7d794, #f5cd79,#e77f67, #e15f41, #12CBC4, #1289A7,#f7d794, #f5cd79);
  color: white;
  border-radius: 5px;
  padding: 15px;
  margin-top: 15px;
  animation: loading 5s linear infinite;
  background-size: 400% 400%;
  position: absolute;
  font-size: 16px;
  font-weight: 700;
  top: 0;
  right: 0;
  width: 250px;
  margin: 25px;
}

@keyframes loading {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}


@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

</style>