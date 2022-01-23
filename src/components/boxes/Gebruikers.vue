<template>
   <div class="box">
      <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <div class="level">
        <div class="level-left">
            <div class="level-item">
            <Subtitle text="Gebruikers" />
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <GenericBtn text="Toevoegen" btnStyle="success" @clicked="addUser"  />
            </div>
        </div>
        </div>        
        <hr>
        <div v-for="item in gebruikers" :key="item.id">
          <div class="level">
            <div class="level-right">
              <div class="level-item">
                <div class="gebruikers-box">{{ item.voornaam }} {{ item.achternaam }}</div>
              </div>
            </div>
            <div class="level-left">
              <div class="level-item">
                <GenericBtn text="Aanpassen" btnStyle="underlined" @clicked="updateUser(item)"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Subtitle from "../textfields/Subtitle.vue";
import GenericBtn from "../buttons/GenericBtn.vue"
import ModalFactory from '../../logic/factories/modalFactory';
import GebruikerController from "../../api/calls/gebruikers"
import GebruikersModal from "../../modals/GebruikersModal.vue"
import GebruikersUpdateModal from '../../modals/GebruikersUpdateModal.vue';
import socketMixin from '../../mixins/socketMixin';
import Socket from '../../logic/factories/socketFactory';

export default {
    name: "Gebruikers",
    mixins: [socketMixin],
    components: {
      Subtitle,
      GenericBtn,
    },
    data(){
      return {
        isRead: true,
        gebruikers: []
      }
    },
    mounted(){
      Socket.listen(this.socket, Socket.ANDERE, () => { this.loadUsers() })
      this.loadUsers()
    },
    methods: {
      loadUsers(){
        GebruikerController.all(this, null, (res) => {
          this.gebruikers = res.data
        })
      },
      addUser(){
        ModalFactory.showModal(this, GebruikersModal, (gebruiker) => { GebruikerController.create(this, gebruiker, this.socket) });
      },
      updateUser(item){
        ModalFactory.showModalWithParamas(this, GebruikersUpdateModal,"Gebruiker aanpassen", item, (gebruiker) => {
          if(gebruiker.choice === 1) {
            GebruikerController.update(this, gebruiker, this.socket)
          }
          else if(gebruiker.choice === 2) {
            GebruikerController.sundrops(this, gebruiker, this.socket)
          }
          else if(gebruiker.choice === 3) {
            GebruikerController.deleteById(this, gebruiker, this.socket)
          }
        })
      }
    }
}
</script>

<style scoped>
.gebruikers-box{
  color: black;
  border-radius: 5px;
  border: 0.25px solid white;
  padding: 5px;
  margin-bottom: 10px;
}
.gebruikers-box-edit{
  color: black;
  text-decoration: underline;
  border-radius: 5px;
  border: 0.25px solid white;
  padding: 5px;
  margin-bottom: 10px;
}
</style>