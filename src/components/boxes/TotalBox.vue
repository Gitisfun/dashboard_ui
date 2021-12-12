<template>
    <div style="padding-top: 10px; padding-right: 15px; padding-left: 15px; padding-bottom: 25px;">
        <SmallTitle text="Totaal" />
        <br>
        <div class="box" style="background: #686de0; font-weight: 600; color: white;">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p>Subtotaal (zonder BTW)</p>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <p>{{ subtotaal }} EUR</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="box" style="background: #ff7f50; font-weight: 600; color: white;">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p>BTW</p>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <p>{{ btw }} %</p>
                    </div>
                </div>
            </div>
        </div>            
        <div class="box" style="background: #22a6b3; font-weight: 600; color: white;">
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p>Totaal</p>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <p> {{ totaal }} EUR</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmallTitle from "../../components/textfields/SmallTitle.vue"

export default {
    name: "TotalBox",
    components: {
        SmallTitle
    },
    props: {
        subtotaal: {
            type: [Number, String]
        },
        btw: {
            type: [Number, String]
        },
        totaal: {
            type: Number
        }
    },
}
</script>