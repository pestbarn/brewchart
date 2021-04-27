<template>
    <article class="bottles">
        <h2>How many empty bottles do I have?</h2>

        <table>
            <tr v-for="(n, size) in bottles" :key="size">
                <td v-if="units === 'metric'" :style="[n <= 0 && { color: '#aaa' }]">
                    {{ bottleSizesMetric(size) }}
                </td>
                <td v-if="units === 'imperial'" :style="[n <= 0 && { color: '#aaa' }]">
                    {{ bottleSizesImperial(size) }}
                </td>
                <td class="inputs">
                    <input :value="n" :data-size="size" @input="setAmount" type="number" min="1" v-debounce="updateStorage">

                    <button :value="n" :data-size="size" data-button="dec" @click="setAmount" v-debounce="updateStorage" :style="[n <= 0 && { background: '#daa54e' }]">
                        -
                    </button>

                    <button :value="n" :data-size="size" data-button="inc" @click="setAmount" v-debounce="updateStorage">
                        +
                    </button>
                </td>
                <td ref="sums" style="display: none;">
                    {{ n * size }}
                </td>
            </tr>
            <tr>
                <td>Total:</td>
                <td v-if="units === 'metric'" style="text-transform: uppercase;">{{ totalVolumeMetric }}</td>
                <td v-if="units === 'imperial'">{{ totalVolumeImperial }}</td>
            </tr>
        </table>

        <p>
            <a href="" @click.prevent="switchUnits()">Switch to {{ units === 'metric' ? 'imperial' : 'metric' }}</a>
        </p>

        <p>
            This list is stored in your browser, so you can safely come back later.
        </p>

        <p>
            Created with 🖤 by <a href="https://obsidian.beer">Obsidian</a>
        </p>
    </article>
</template>

<script>
import Qty from 'js-quantities'
import './Bottles.scss'

export default {
    name: 'Beer',
    data() {
        return {
            bottles: {
                180: 0,
                250: 0,
                275: 0,
                300: 0,
                330: 0,
                341: 0,
                355: 0,
                375: 0,
                500: 0,
                550: 0,
                568: 0,
                650: 0,
                700: 0,
                750: 0,
                940: 0,
                1000: 0,
                1500: 0,
                2000: 0,
                3000: 0
            },
            totalVolumeMetric: 0,
            totalVolumeImperial: 0,
            units: 'metric'
        }
    },
    beforeMount() {
        if (localStorage.bottleStorage) this.initStorage()
    },
    metaInfo() {
        return {
            title: 'Bottle counter'
        }
    },
    mounted() {
        const loading = this.$findRefByName('loading')
        if (!loading.hidden) loading.hidden = true
        this.setTotalVolume()
        this.setUnits()
    },
    methods: {
        bottleSizesMetric(size) {
            size = size + ' ml'
            return Qty(size).to('cl').toPrec('0.1 cl')
        },
        bottleSizesImperial(size) {
            size = size + ' ml'
            return Qty(size).to('floz').toPrec('0.1 floz').toString().replace('floz', 'fl oz')
        },
        setAmount({ target }) {
            const size = target.dataset.size
            const value = target.value

            if (target.dataset.button === 'inc') {
                this.bottles[size] = parseInt(this.bottles[size]) + 1
            }
            else if (target.dataset.button === 'dec') {
                if (value > 0) this.bottles[size] = parseInt(this.bottles[size]) - 1
            }
            else {
                if (value >= 0) this.bottles[size] = value
                else this.bottles[size] = 0
            }
        },
        initStorage() {
            this.bottles = JSON.parse(localStorage.bottleStorage)
        },
        updateStorage() {
            localStorage.setItem('bottleStorage', JSON.stringify(this.bottles))
            this.setTotalVolume()
        },
        setTotalVolume() {
            let total = 0
            this.$findRefByName('sums').forEach(x => {
                total = total + (parseInt(x.innerText))
            })

            this.totalVolumeMetric = Qty(total + ' ml').to('L').toPrec('0.01 L')
            this.totalVolumeImperial = Qty(total + ' ml').to('floz').toPrec('0.1 floz').toString().replace('floz', 'fl oz')
        },
        setUnits() {
            if (localStorage.bottleStorageUnits) {
                if (localStorage.bottleStorageUnits === 'metric') {
                    this.units = 'metric'
                } else this.units = 'imperial'
            } else localStorage.setItem('bottleStorageUnits', 'metric')
        },
        switchUnits() {
            if (this.units === 'metric') {
                this.units = 'imperial'
                localStorage.setItem('bottleStorageUnits', 'imperial')
            } else {
                this.units = 'metric'
                localStorage.setItem('bottleStorageUnits', 'metric')
            }
        }
    }
}
</script>
