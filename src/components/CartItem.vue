<template>
    <li class="cart__item product">
        <div class="product__pic">
            <img :src="item.product.image" width="120" height="120" alt="item.product.title">
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
import { mapMutations, mapActions } from 'vuex';

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
                this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value })
            }
        }
    },
    methods: {
        ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
        ...mapActions(['deleteCartProduct']),

        deleteProduct(productId) {
            this.deleteCartProduct(productId)
        }

    }
}
</script>