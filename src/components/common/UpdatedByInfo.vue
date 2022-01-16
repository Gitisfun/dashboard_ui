<template>
    <div v-if="updatedObj">
        <div class="updated-info-text">Laatst aangepast door {{ person }} om {{ time }} op {{ date }}</div>
        <hr>
    </div>
</template>

<script>
import UtilsFactory from '../../logic/utils/utilsFactory'
export default {
    name: "UpdatedByInfo",
    props: { 
        updatedObj: {
            type: Object
        },
    },
    computed: {
        person(){
            if(!this.updatedObj) return ""
            return `${this.updatedObj.updated_by_voornaam} ${this.updatedObj.updated_by_achternaam} `
        },
        time(){
            if(!this.updatedObj) return ""
            return UtilsFactory.time(this.updatedObj.updated_time)
        },
        date(){
            if(!this.updatedObj) return ""
            return UtilsFactory.date(this.updatedObj.updated_time)
        }
    }
}
</script>

<style scoped>
.updated-info-text{
    font-size: 14px;
    color: black;
    margin-bottom: 15px;
    font-style: italic;
}
</style>