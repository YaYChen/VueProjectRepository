<template>
    <div class="layout_main">
        <app-header v-bind:activeIndex="activeIndex"/> 
        <shopping-list/>
        <app-footer/>
    </div>
</template>

<script>

import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import ShoppingList from '@/components/shoppinglist.vue'

export default {
    data(){
        return{
            activeIndex:'2'
        }
    },
    components: {
        'app-header':Header,
        'app-footer':Footer,
        'shopping-list':ShoppingList
    },
    methods:{

    },
    created(){

    }
}
</script>

<style scoped>
.layout_main{
    width: 100%;
    margin: 0 auto;
    height: 100%;
}
</style>
