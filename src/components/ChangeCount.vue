<template>

    <div class="form__counter">
        <button type="button" aria-label="Убрать один товар" @click="counter--">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-minus"></use>
            </svg>
        </button>

        <input type="text" name="count" v-model="counter">

        <button type="button" aria-label="Добавить один товар" @click="counter++">
            <svg width="12" height="12" fill="currentColor">
                <use xlink:href="#icon-plus"></use>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'counter',
        event: 'ChangeCounter'
    },
    mounted() {

    },
    data() {
        return {
            counter: this.$attrs.counter
        }
    },
    watch: {
        counter() {
            if (this.counter < 1) {
                this.counter = 1
            }
            this.$emit('ChangeCounter', this.counter)
        }
    }
}
</script>