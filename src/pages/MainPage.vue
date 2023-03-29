<template>
  <div>
    <main class="content container">
      <div class="content__top content__top--catalog">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          152 товара
        </span>
      </div>

      <div class="content__catalog">
        <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
          :categoryId.sync="filterCategoryId" :colorId.sync="filterColorId"></ProductFilter>

        <section class="catalog">
          <div v-if="productsLoading"> Загрузка товаров... </div>
          <div v-if="productsLoadingFailed"> Произошла ошибка при загрузке </div>

          <ProductList :products="products"></ProductList>

          <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"></BasePagination>
        </section>
      </div>
    </main>

  </div>
</template>

<script>
import axios from "axios"
import ProductList from '@/components/ProductList.vue'
import BasePagination from '@/components/BasePagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import { API_BASE_URL } from "@/config"


export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProductTimer)
      this.loadProductTimer = setTimeout(() => {
        axios.get(API_BASE_URL + "/api/products", {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId
          }
        }).then(response => this.productsData = response.data,).catch(() => this.productsLoadingFailed = true).then(() => this.productsLoading = false)
      }, 0);
    }
  },
  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() { this.loadProducts() },
    filterPriceTo() { this.loadProducts() },
    filterCategoryId() { this.loadProducts() },
    filterColorId() { this.loadProducts() }
  },
  computed: {
    // filteredProducts() {

    // },
    products() {
      return this.productsData ? this.productsData.items.map(product => {
        return {
          ...product,
          image: product.image.file.url
        }
      }) : []
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },
  mounted() {
    this.loadProducts()
  }
}
</script>

<style></style>
