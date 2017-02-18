<template>
    <div class="people">
        <div class="block">
            <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentPage"
                    :total="people.count"
                    :page-size="pageSize"
                    :page-sizes="[20, 50, 100, 200]"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>

        <template>
            <el-table :data="people.rows" stripe border style="width: 100%">
                <el-table-column label="全名" width="200" fixed>
                    <template scope="props">
                        <a :href="'http://www.linkedin.com/in/'+props.row.publicIdentifier">{{props.row.fullName}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="firstName" label="FN" width="100"></el-table-column>
                <el-table-column prop="lastName" label="LN" width="100"></el-table-column>
                <el-table-column prop="occupation" label="目前就职" min-width="500"></el-table-column>
                <el-table-column fixed="right" label="操作" width="70">
                    <template scope="props">
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <div class="block">
            <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="currentPage"
                    :total="people.count"
                    :page-size="pageSize"
                    :page-sizes="[20, 50, 100, 200]"
                    layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        data(){
            return {
                currentPage: 1,
                pageSize: 20
            }
        },
        computed: {
            people() {
                return this.$store.getters.people
            }
        },
        methods: {
            ...mapActions([
                'getPeople'
            ]),
            sizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.getPeople(this)
            },
            currentChange(val) {
                this.currentPage = val;
                this.getPeople(this)
            }
        },
        mounted() {
            this.getPeople(this.currentPage, this.pageSize)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>

</style>