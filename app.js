function getRandVal(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            curRound: 0,
            winner: null,
            log: []
        }
    },
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' }
            }
            return { width: this.playerHealth + '%' }
        },
        specAttack() {
            return this.curRound % 3 !== 0
        },

    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw'
            } else if (value <= 0) {
                this.winner = 'player'
            }
        }
    },
    methods: {
        attackMonster() {
            this.curRound++
            const attackValue = getRandVal(5, 12)
            this.monsterHealth -= attackValue
            this.addLog('player', 'attack', attackValue)
            this.attackPlayer()

        },
        attackPlayer() {
            const attackValue = getRandVal(8, 15)
            this.playerHealth -= attackValue
            this.addLog('monster', 'attack', attackValue)
        },
        specialAttack() {
            this.curRound++
            const attackValue = getRandVal(10, 20)
            this.monsterHealth -= attackValue
            this.addLog('player', 'spec-attack', attackValue)
            this.attackPlayer()
        },
        healPlayer() {
            const healValue = getRandVal(8, 15)
            if (this.playerHealth > 100) {
                this.playerHealth = 100

            } else {
                this.playerHealth += healValue
            } 
            this.addLog('player', 'heal', healValue)
            this.attackPlayer()
        },
        newGame() {
            this.playerHealth = 100,
                this.monsterHealth = 100,
                this.curRound = 0,
                this.winner = null,
                this.log = []
        },
        surrender() {
            this.winner = 'monster'
        },
        addLog(id, event, damage) {
            this.log.unshift({
                actionId: id,
                actionEvent: event,
                actionDmg: damage
            })
        }

    },
});

app.mount('#game')