<template>
    <div class="layout_center">
       <div class="input_group_div">
            <div class="input-group mb-3">
                <input ref="input_search" type="text" class="form-control" placeholder="Bar Code"  @keyup.enter="inputListener">
                <div class="input-group-append">
                    <span id="query_button" class="input-group-text query_button">{{$t('handle.query')}}</span>
                </div>
            </div>
        </div>
        <div id="list_container" class="shopping_list_div">
            <listitem-component
                    v-for="(item, index) in productList"
                    v-bind:product="item"
                    v-bind:index="index"
                    v-bind:key="item.id"
                    @addQuantity="addQuantity"
                    @removeQuantity="removeQuantity"
            ></listitem-component>
        </div>
        <el-dialog
            :title="$t('dialog.title')"
            :visible.sync="dialogVisible"
            width="30%"
            >
            <span>{{$t('dialog.content.deleteornot')}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('handle.cancel')}}</el-button>
                <el-button type="primary" @click="dialogConfirm">{{$t('handle.confirm')}}</el-button>
            </span>
        </el-dialog>
   </div>
</template>

<script>

import ListItem from '@/components/listitem.vue'

export default {
    data(){
        return{
            productList:[],
            handleIndex:-1,
            dialogVisible: false
        };
    },
    components: {
        'listitem-component':ListItem
    },
    methods:{
        inputListener:function(){
            var vm=this;
            vm.handleIndex=-1;
            this.$axios.get("/product-ByCode",{
                params: {
                    code:this.$refs.input_search.value
                    }
                })
                .then(function(response){
                    var product=response.data;
                    vm.handleIndex=getIndexInArray(product.id);
                    if(vm.handleIndex===-1){
                        var item={
                            'id':product.id,
                            'name':product.name,
                            'category':product.category,
                            'Specification':product.Specification,
                            'price':Double.valueOf(product.price),
                            'totalPrice':Double.valueOf(product.price),
                            'quantity':1
                        }
                        vm.productList[vm.productList.length]=item;                  
                    }else{
                        vm.productList[vm.handleIndex].quantity++;
                        vm.productList[vm.handleIndex].totalPrice=vm.productList[vm.handleIndex].quantity*vm.product.price;
                    }
                    vm.$refs.input_search.value="";                                  
                })
                .catch(function(error){
                    console.log(error);
                });
        },
        getIndexInArray:function(id){
            var vm=this;
            if(vm.productList.length===0){
                return -1;
            }
            for(var i = 0; i < vm.productList.length; i++){
                if(id === vm.productList[i].id){
                    return i;
                }
            }
            return -1;
        },
        addQuantity:function(index){
            var vm = this;
            vm.productList[index].quantity++;
            vm.productList[index].totalPrice=vm.productList[index].price*vm.productList[index].quantity;
        },
        removeQuantity:function(index){
            var vm = this;
            if(vm.productList[index].quantity>1){
                vm.productList[index].quantity--;
                vm.productList[index].totalPrice=vm.productList[index].price*vm.productList[index].quantity;
            }else{
                vm.dialogVisible = false;
                vm.handleIndex = index;
            }
        },
        dialogConfirm:function() {
            var vm = this;
            vm.productList.splice(vm.handleIndex, 1);
            vm.dialogVisible = false;
        }
    }
}
</script>

<style scoped>
.layout_center{
    width: 100%;
    min-height: 800px;
    margin:10px auto;
}

.input_group_div{
    width: 1000px;
    height: auto;
    margin:10px auto;
    border-bottom:2px solid black;
    display: block;
}

.shopping_list_div{
    width: 1000px;
    height: auto;
    margin:10px auto;
}
</style>

