<template>
  <div class="box">
    <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <Subtitle text="Extra instellingen" />
        <hr>
        <div v-if="isLoaded" class="extrabox-box">
            <NumberInput :type="1" @changeCounterValue="submitToServer" text="Aankopen" :counterValue="counter.aankopen" />                  
            <NumberInput :type="2" @changeCounterValue="submitToServer" text="Verkopen" :counterValue="counter.verkopen" />                  
            <NumberInput :type="3" @changeCounterValue="submitToServer" text="Creditnotas" :counterValue="counter.creditnotas" />                  
        </div>
    </div>
  </div>
</template>

<script>
import Subtitle from "../textfields/Subtitle.vue"
import NumberInput from "../inputfields/NumberInput.vue"
import CountersController from "../../api/calls/counters.js"
import CounterStates from "../../logic/constants/counterStates.js"

export default {
    name: "ExtraBox",
    components: {
        Subtitle,
        NumberInput
    },
    data(){
        return{
            isLoaded: false,
            counter: {
                id: null,
                aankopen: 1,
                verkopen: 1,
                creditnotas: 1,
            }
        }
    },
    mounted(){
        CountersController.get(this, null, (res) => {
            this.counter = res.data[0]
            this.isLoaded = true
            console.log(this.counter);
        })
    },
    methods: {
        submitToServer(obj){
            if(obj.type === CounterStates.AANKOPEN) {
                this.counter.aankopen = obj.value
            }
            else if(obj.type === CounterStates.VERKOPEN) {
                this.counter.verkopen = obj.value
            }
            else if(obj.type === CounterStates.CREDITNOTAS) {
                this.counter.creditnotas = obj.value
            }
            CountersController.update(this, this.counter, null)
        }
    }
}
</script>

<style>
.extrabox-box{
    padding: 15px;
}
</style>