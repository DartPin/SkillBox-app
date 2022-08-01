<template>
    <ul class="catalog__pagination pagination">
        <li class="pagination__item">
            <a href="#" class="pagination__link pagination__link--arrow" :disabled="arrowActive[0]" :class="{ 'pagination__link--disabled': arrowActive[0]}"
                aria-label="Предыдущая страница" @click.prevent="pressArrow(-1)">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-left"></use>
                </svg>
            </a>
        </li>
        <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
            <a href="#" class="pagination__link" :class="{'pagination__link--current': pageNumber === page}" @click.prevent="paginate(pageNumber)">
                {{pageNumber}}
            </a>
        </li>
        
        <li class="pagination__item">
            <a class="pagination__link pagination__link--arrow" :class="{ 'pagination__link--disabled': arrowActive[1]}" href="#" aria-label="Следующая страница" @click.prevent="pressArrow(1)">
                <svg width="8" height="14" fill="currentColor">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg>
            </a>
        </li>
    </ul>
</template>

<script>
    export default{
        model:{
            prop: 'page',
            event: 'paginate'
        },
        data() {
            return {
                arrowActive: [true, false]
            }
        },
        props: ['page', 'count', 'perPage'],
        methods:{
            paginate(value){
                this.$emit('paginate', value)
            },
            pressArrow(val){
                this.arrowActive = [false, false]
                if (val === -1 & (this.page === 2 || this.page ===1)){
                    this.$emit('paginate', 1)
                    this.arrowActive[0] = true; 
                } else if (val === 1 & (this.page === this.pages-1 || this.page === this.pages)){
                    this.$emit('paginate', this.pages)
                    this.arrowActive[1] = true; 
                } else {
                    this.$emit('paginate', this.page + val)
                }
            }
        },
        computed:{
          pages(){
            return Math.ceil(this.count / this.perPage)
          }    
        }
    }
</script>