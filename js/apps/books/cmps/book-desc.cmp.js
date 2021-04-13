export default {
    props: ['txt'],
    template: `<span>
        <p v-if="!moreTxt">
            {{allTxt}}
        </p>
        <p v-else>
            {{allTxt}}
            <span v-if='!toggleText'>...</span>
            <span class="read" v-if="!toggleText" @click="toggleText=!toggleText">read more</span>
            <span v-if="toggleText">{{moreTxt}}</span>
            <span class="read" v-if="toggleText" @click="toggleText=!toggleText">read less</span>
        </p>
    </span>`,
    data() {
        return {
            allTxt: null,
            moreTxt: null,
            toggleText: false
        }
    },
    methods: {
        getText() {
            if (this.txt.length > 100) {
                this.allTxt = this.txt.substr(0, 100)+'';
                this.moreTxt = this.txt.substr(100, this.txt.length - 1);
            }
            else {
                this.allTxt = this.txt;
            }
        }
    },
    created() {
        this.getText();
    }
}