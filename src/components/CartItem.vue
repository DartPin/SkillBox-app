<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img :src="item.product.Image" width="120" height="120" srcset="img/phone-square-3@2x.jpg 2x"
                alt="item.product.title">
        </div>
        <h3 class="product__title">
            {{ item.product.title }}
        </h3>
        <span class="product__code">
            артикул: {{ item.product.id }}
        </span>

        <ChangeCount v-model.number="amount"></ChangeCount>

        <b class="product__price">
            {{ (item.product.price * item.amount) | numberFormat }} ₽
        </b>

        <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины"
            @click.prevent="deleteProduct(item.productId)">
            <svg width="20" height="20" fill="currentColor">
                <use xlink:href="#icon-close"></use>
            </svg>
        </button>
    </li>
</template>

<script>

import numberFormat from '@/helpers/numberFormat';
import ChangeCount from './ChangeCount';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            ind: 56
        }
    },
    props: ['item'],
    filters: { numberFormat },
    components: { ChangeCount },
    computed: {
        amount: {
            get() {
                return this.item.amount
            },
            set(value) {
                this.$store.commit('updateCartProductAmount', { productId: this.item.productId, amount: value })
            }
        }
    },
    methods: {
        ...mapMutations({ deleteProduct: 'deleteCartProduct' })

    }
}
</script>