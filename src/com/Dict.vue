<template>
    <div class="dict">
        <el-tree :data="data" :props="props" @node-click="nodeClick"></el-tree>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                root: 'Root',
                data: [this.$store.getters.dict],
                props: {
                    children: 'children',
                    label: 'desc'
                }
            };
        },
        methods: {
            ...mapActions([
                'getDict'
            ]),
            nodeClick(data) {
                console.log(data);
            }
        },
        beforeMount(){
            this.getDict(this.root);
            setTimeout(() => {
                this.data = this.$store.getters.dict.children
            }, 500)
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>