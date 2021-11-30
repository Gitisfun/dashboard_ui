<template>
  <div class="content-body">
      <div class="columns">
          <div class="column">
              <AndereBox :id="1" title="BTW" description="De btw codes" @selectCategory="selectCategory" />
          </div>
          <div class="column">
               <AndereBox :id="2" title="Betalingstermijnen" description="De termijn voor klanten" @selectCategory="selectCategory" />
          </div>
          <div class="column">
              <AndereBox :id="3" title="Teksten" description="De opmerkingen voor klanten" @selectCategory="selectCategory" />
          </div>
      </div>
      <div v-if="selectedCategory" class="box" style="padding-left: 25px; padding-right: 25px">
          <div class="level">
              <div class="level-left">
                  <div class="level-item">
                    <p style="font-weight: 600; font-size: 26px; margin-bottom: 10px">{{ selectedCategory.name }}</p>
                  </div>
              </div>
              <div class="level-right">
                  <div class="level-item">
                    <GenericBtn text="Nieuwe" btnStyle="success" size="large" @clicked="add"  />
                  </div>
              </div>
          </div>
        <b-table @dblclick="update" :data="data" :columns="selectedCategory.columns">
              <template #empty>
                <div class="has-text-centered">Geen data</div>
            </template>
        </b-table>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import GenericBtn from '../components/buttons/GenericBtn.vue'
import AndereBox from '../components/common/AndereBox.vue'
import BtwController from '../api/calls/btw'
import BetalingstermijnenController from '../api/calls/betalingstermijnen'
import TekstController from '../api/calls/tekst'
import ModalFactory from '../logic/factories/modalFactory'
import BtwModal from '../modals/BtwModal.vue'
import BetalingstermijnModal from '../modals/BetalingstermijnModal.vue'
import UpdateBtwModal from '../modals/UpdateBtwModal.vue'
import UpdateBetalingstermijnModal from '../modals/UpdateBetalingstermijnModal.vue'
import TekstModal from '../modals/TekstModal.vue'
import UpdateTekstModal from '../modals/UpdateTekstModal.vue'
import socketMixin from '../mixins/socketMixin'
import Socket from '../logic/factories/socketFactory'

export default {
    name: "Andere",
    mixins: [socketMixin],
    components: { 
        AndereBox,
        GenericBtn 
    },
    data(){
        return {
            selectedCategory: null,
            data: [],
            controller: null,
            addModal: null,
            categories: [
                {
                    id: 1,
                    name: "BTW",
                    columns: [
                    {
                        field: 'naam',
                        label: 'Btw',
                    },
                    {
                        field: 'prijs',
                        label: 'Prijs',
                    },
                    {
                        field: 'time',
                        label: 'Tijdstip',
                    },
                    {
                        field: 'date',
                        label: 'Datum',
                    },
                    {
                        field: 'user',
                        label: 'Door',
                    }
                    ]
                },
                 {
                    id: 2,
                    name: "Betalingstermijnen",
                    columns: [
                    {
                        field: 'naam',
                        label: 'Betalingstermijn',
                    },
                    {
                        field: 'termijn',
                        label: 'Dagen',
                    },
                    {
                        field: 'time',
                        label: 'Tijdstip',
                    },
                    {
                        field: 'date',
                        label: 'Datum',
                    },
                    {
                        field: 'user',
                        label: 'Door',
                    }
                    ]
                },
                 {
                    id: 3,
                    name: "Teksten",
                    columns: [
                    {
                        field: 'tekst',
                        label: 'Tekst voor klant',
                    },
                    {
                        field: 'type',
                        label: 'Type',
                    },
                    {
                        field: 'time',
                        label: 'Tijdstip',
                    },
                    {
                        field: 'date',
                        label: 'Datum',
                    },
                    {
                        field: 'user',
                        label: 'Door',
                    }
                    ]
                }
            ]
        }
    },
    mounted(){
        Socket.listen(this.socket, Socket.ANDERE, () => { this.loadTable() })
    },
    methods: {
        selectCategory(id){
            this.selectedCategory = this.categories[id - 1]
            switch(id){
                case 1: 
                    this.controller = BtwController;
                    this.addModal = BtwModal;
                    this.updateModal = UpdateBtwModal
                    break;
                case 2: 
                    this.controller = BetalingstermijnenController;
                    this.addModal = BetalingstermijnModal;
                    this.updateModal = UpdateBetalingstermijnModal
                    break;
                case 3:
                    this.controller = TekstController;
                    this.addModal = TekstModal;
                    this.updateModal = UpdateTekstModal
                    break;
                default:
                    break;
            }
            this.loadTable()
        },
        add(){
            ModalFactory.showModal(this, this.addModal, (item) => {
                this.controller.create(this, item, this.socket)
            })
        },
        update(item){
            ModalFactory.showModalWithParamas(this, this.updateModal, "Btw aanpassen", item, (newItem) => {
                if(newItem.operation == 1){
                    this.controller.update(this, newItem.data, this.socket)
                }
                else if(newItem.operation == 2){
                    this.controller.deleteById(this, newItem.data, this.socket)
                }
            });
        },
        loadTable(){
            this.controller.all(this, null, (res) => {
                let temp = res.data;
                for(let i = 0; i < res.data.length; i++){
                    temp[i].user = `${res.data[i].updated_by_voornaam} ${res.data[i].updated_by_achternaam}`
                    temp[i].date = moment(res.data[i].updated_time).format("DD-MM-YYYY");
                    temp[i].time = moment(res.data[i].updated_time).format("HH:mm");
                }
                this.data = temp;
            });
        },
    }
}

</script>

<style>

</style>