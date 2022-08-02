<template>
    <section class="catalog"> 
        <ul class="catalog__list">
            <ProductItem v-for="product in products" :key="product.id" :product="product" @goToPage="(pageName, pageParams) => $emit('goToPage', pageName, pageParams)"></ProductItem>
        </ul>
    </section>
</template>

<script>
import ProductItem from "./ProductItem.vue";
    export default {
    props: ["products"],
    components: { ProductItem }
}
</script>