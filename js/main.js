import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { player } from './player.js'


createApp({
    data() {
        return {
            player: player,
            active: player.active,
            tab: 'pop',
            ePop: false,
            errContents: 'error',
            wPlaytime: 0,
            logArea: '',
            eventLog: `<b>You fond</b> your mom shit bichhhh`,
            upgrades: [
                {
                    title: 'Pickaxe',
                    level: 1,
                    target: 'stone',
                    effect: 'Increase stone per by 1',
                    valMult: 1.4,
                    costMult: 1.8,
                    cost: {
                        wood: 15,
                        stone: 15
                    }
                },
                {
                    title: 'Axe',
                    level: 1,
                    target: 'wood',
                    effect: 'Increase wood per by 1 and then doo a bunch of other stuff because i said so and this is a really long message to test flex out',
                    valMult: 1.4,
                    costMult: 1.8,
                    cost: {
                        wood: 15,
                        stone: 15
                    }
                }
            ]
        }
    },
    methods: {
        buyUpgrade(ug) {
            //can afford?
            for (const key in ug.cost) {
                if (player[key] < ug.cost[key]) return                
            }
            //buy process
            for (const key in ug.cost) {
                this.player[key] = this.player[key] - ug.cost[key]
                ug.cost[key] = ug.cost[key] * ug.costMult
            }
            this.player.tools[ug.target] *= ug.valMult
            console.log(this.player.tools[ug.target] * ug.valMult)
        },
        assign(type, res) {
            if (type) {
                if (!this.player.population.amt) { this.dispErr('No population to assign!') }
                else {console.log('assign to wood')} 
            } else {
                console.log('remove one from' + res)
            }
        },
        dispErr(msg) {
            this.errContents = msg
            this.ePop = !this.ePop
        },
        killsave() {
            localStorage.removeItem("save")
        }
    },
    watch: {
        'player.playtime'(newValue) {

        }
    },
    mounted() {
            console.log(localStorage.getItem("save") ? 'yes' : 'no')
            if (localStorage.getItem("save")) {
            this.player = JSON.parse(localStorage.getItem("save"))
            }

        setInterval(() => {
            gameLoop(this)
        }, 1000/30)
        setInterval(() => {
            localStorage.setItem("save",JSON.stringify(this.player))
        },5000)
    }
}).mount('#app')