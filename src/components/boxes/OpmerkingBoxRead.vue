<template>
   <div class="box">
        <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <SmallTitle text="Opmerking" />
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <b-tooltip label="Een opmerking voor intern gebruik, deze opmerking verschijnt niet op de factuur." type="is-info is-light" position="is-left" multilined>
                            <i class='bx bx-info-circle bx-sm custom-opmerking-info' ></i>
                        </b-tooltip>
                    </div>
                </div>
            </div>
            <p v-if="value">{{ value }}</p>
            <p v-else>...</p>
        </div>
    </div>
</template>

<script>
import SmallTitle from "../../components/textfields/SmallTitle.vue"

export default {
    name: "OpmerkingBox",
    components: {
        SmallTitle
    },
    props: {
        value: {
            type: String
        }
    }
}
</script>