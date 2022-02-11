<template>
    <div class="level">
        <div class="level-left">
            <div class="level-item">
                <p>{{ text }}</p>
            </div>
        </div>
        <div class="level-right">
            <div class="level-item">
                <b-button @click="submit" v-show="isVisible" type="is-success" size="is-small">Opslaan</b-button>
            </div>
            <div class="level-item">
                <b-numberinput @input="changeVisibilty" size="is-small is-link is-light" min="1" v-model="newCounterValue"></b-numberinput>
            </div>                    
        </div>
    </div>
</template>

<script>
export default {
    name: "NumberInput",
    props: {
        type: {
            type: Number
        },
        text: {
            type: String
        },
        counterValue: {
            type: Number
        }
    },
    data(){
        return {
            isVisible: false,
            newCounterValue: 1
        }
    },
    created(){
        this.newCounterValue = this.counterValue
    },
    methods: {
        changeVisibilty(){
            this.isVisible = true
        },
        submit(){
            this.isVisible = false;
            const temp = {
                type: this.type,
                value: this.newCounterValue
            }
            this.$emit("changeCounterValue", temp)
        }
    }
}
</script>