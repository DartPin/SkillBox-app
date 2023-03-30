<template>
    <li class="catalog__item">

        <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
            <img :src="product.image" alt="Название товара">
        </router-link>

        <h3 class="catalog__title">
            <a href="#">
                {{ product.title }}
            </a>
        </h3>

        <span class="catalog__price">
            {{ product.price | numberFormat }} ₽
        </span>

        <ul class="colors colors--black">
            <li class="colors__item" v-for="color in product.colors" :key="color.id">
                <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" value="#73B6EA" v-model="color.title">
                    <span class="colors__value" :style="{ 'background-color': color.code }">
                    </span>
                </label>
            </li>
        </ul>

    </li>
</template>

<script>
import colors from '../data/colors.js'
import goToPage from '@/helpers/goToPage.js'
import numberFormat from '@/helpers/numberFormat.js'

export default {
    props: ["product"],
    data() {
        return {
            color: '#73B6EA'
        }
    },
    filters: {
        numberFormat
    },
    methods: {
        goToPage
    },
    computed: {
        filterColor() {
            let filterColor = []
            this.product.colors.forEach(element => {
                colors.forEach(item => {
                    if (element.id === item.id) {
                        filterColor.push(item)
                    }
                })
            });

            return filterColor
        }
    }
}
</script>