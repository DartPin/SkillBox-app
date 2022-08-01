<template>
    <li class="catalog__item">
                <a class="catalog__pic" href="#">
                    <img :src="product.Image" alt="Название товара">
                </a>

                <h3 class="catalog__title">
                    <a href="#">
                        {{ product.title }}
                    </a>
                </h3>

                <span class="catalog__price">
                    {{ product.price }}
                </span>

                <ul class="colors colors--black">
                    <li class="colors__item" v-for="color in filterColor" :key="color.id">
                        <label class="colors__label">
                            <input class="colors__radio sr-only" type="radio"  value="#73B6EA" v-model="color.title">
                            <span class="colors__value" :style="{'background-color': color.title}">
                            </span>
                        </label>
                    </li>
                </ul>
            </li>
</template>

<script>
    import colors from '../data/colors.js'

    export default{
        props: ["product"],
        data(){
            return{
                color: '#73B6EA'
            }
        },
        computed:{
            filterColor(){
                let filterColor = []
                this.product.colorId.forEach(element => {
                    colors.forEach(item => {
                        if (element === item.id){
                            filterColor.push(item)
                        }
                    })
                });

                return filterColor
            }
        }
    }
</script>