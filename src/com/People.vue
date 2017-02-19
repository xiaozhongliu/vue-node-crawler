<template>
    <div class="people">

        <div class="search">
            <el-input placeholder="请输入内容" v-model="keyword" @input="debounceSearch">
                <el-button slot="append" icon="search" @click="search"></el-button>
            </el-input>
        </div>

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
                <el-table-column label="Avatar" width="100" v-if="false" fixed>
                    <template scope="props">
                        <a :href="'http://www.linkedin.com/in/'+props.row.publicIdentifier">{{props.row.fullName}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="Name" width="190" fixed>
                    <template scope="props">
                        <div class="cname" v-if="props.row.cname">{{props.row.cname}}</div>
                        <div class="ename" v-if="props.row.ename">{{props.row.ename}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="Source" width="50" class-name="source">
                    <template scope="props">
                        <img :src="getSourceIcon(props.row.source)"/>
                    </template>
                </el-table-column>
                <el-table-column prop="location" label="Location" width="60"></el-table-column>
                <el-table-column prop="industry" label="Industry" width="100"></el-table-column>
                <el-table-column prop="company" label="Company" width="200"></el-table-column>
                <el-table-column prop="title" label="Title" min-width="240"></el-table-column>
                <el-table-column prop="bu" label="BU" width="80"></el-table-column>
                <el-table-column prop="function" label="Function" width="140"></el-table-column>
                <el-table-column prop="yob" label="YOB" width="140"></el-table-column>
                <el-table-column prop="edu" label="EDU" min-width="140"></el-table-column>
                <el-table-column prop="college" label="College" min-width="140"></el-table-column>
                <el-table-column prop="email" label="Email" min-width="140"></el-table-column>
                <el-table-column label="Phone" min-width="140">
                    <template scope="props">
                        <div v-if="props.row.mobile">{{props.row.cname}}</div>
                        <div v-if="props.row.tel">{{props.row.ename}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="ftf" label="FTF" min-width="140"></el-table-column>
                <el-table-column prop="ftfTime" label="FTF Time" min-width="140"></el-table-column>
                <el-table-column prop="package" label="Package" min-width="140"></el-table-column>
                <el-table-column prop="packageDetail" label="FTF" min-width="140"></el-table-column>
                <el-table-column prop="strength" label="Strength" min-width="140"></el-table-column>
                <el-table-column prop="comment" label="Comment" min-width="140"></el-table-column>
                <el-table-column prop="notes" label="Notes" min-width="140"></el-table-column>
                <el-table-column label="操作" width="70" fixed="right">
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
    import lodash from 'lodash'

    export default {
        data(){
            return {
                currentPage: 1,
                pageSize: config.PAGE_SIZE,
                keyword: ''
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
            getSourceIcon(source){
                let sourceName = Enum.getNameByValue(Enum.Source, source);
                return `/${sourceName}.png`
            },
            sizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.getPeople(this)
            },
            currentChange(val) {
                this.currentPage = val;
                this.getPeople(this)
            },
            search,
            debounceSearch: lodash.debounce(
                search,
                500
            )
        },
        mounted() {
            this.getPeople(this.currentPage, config.PAGE_SIZE)
        }
    }

    function search() {
        console.log('called');
        if (!this.keyword) return this.$message({
            message: '请输入关键字',
            type: 'warning'
        });
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    .people {
        .cname {
            text-shadow: 0 0 .1px yellow
        }
        .ename {
            font-style: italic;
            text-shadow: 0 0 .1px blue
        }
        .source {
            .cell {
                padding: 10px 10px 3px
            }
        }
        .is-leaf {
            .cell {
                padding: 0;
                text-align: center
            }
        }
    }
</style>