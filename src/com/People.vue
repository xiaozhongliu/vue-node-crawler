<template>
    <div class="people-page">
        <el-button class="search" type="primary" icon="search" @click="dialogVisible=true">&nbsp;</el-button>
        <el-dialog custom-class="search-dialog" v-model="dialogVisible">
            <el-form :model="criteria" label-width="80px">
                <el-form-item label="Source">
                    <el-input v-model="criteria.source" @input="debounceSearch"></el-input>
                </el-form-item>
                <el-form-item label="CName">
                    <el-input v-model="criteria.cname" @input="debounceSearch"></el-input>
                </el-form-item>
                <el-form-item label="EName">
                    <el-input v-model="criteria.ename" @input="debounceSearch"></el-input>
                </el-form-item>
                <el-form-item label="Title">
                    <el-input v-model="criteria.title" @input="debounceSearch"></el-input>
                </el-form-item>
                <el-form-item label="Company">
                    <el-input v-model="criteria.company" @input="debounceSearch"></el-input>
                </el-form-item>
                <el-form-item label="Location">
                    <el-input v-model="criteria.location" @input="debounceSearch"></el-input>
                </el-form-item>
                <div class="footer">
                    <el-button type="primary" @click="resetCriteria">重置筛选条件</el-button>
                </div>
            </el-form>
        </el-dialog>

        <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page"
                :total="people.count"
                :page-size="limit"
                :page-sizes="[20, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <el-table :data="people.rows" stripe border>
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
            <el-table-column prop="location" label="Location" width="90"></el-table-column>
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
            <el-table-column prop="keyword" label="Keyword" width="100"></el-table-column>
            <el-table-column label="操作" width="70" fixed="right" class-name="action">
                <template scope="props">
                    <el-button type="primary" size="small" icon="edit"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page"
                :total="people.count"
                :page-size="limit"
                :page-sizes="[20, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    let defaultCriteria = {
        source: null,
        cname: '',
        ename: '',
        title: '',
        company: '',
        location: ''
    };

    export default {
        data(){
            return {
                page: 1,
                limit: config.PAGE_SIZE,
                dialogVisible: false,
                debounceTimer: null,
                criteria: Object.assign({}, defaultCriteria)
            }
        },
        computed: mapGetters([
            'people'
        ]),
        methods: {
            ...mapActions([
                'getPeople'
            ]),
            getSourceIcon(source){
                let sourceName = Enum.getNameByValue(Enum.Source, source);
                return `/${sourceName}.png`
            },
            sizeChange(val) {
                this.limit = val;
                this.page = 1;
                this.getPeople(this)
            },
            currentChange(val) {
                this.page = val;
                this.getPeople(this)
            },
            debounceSearch(){
                clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.getPeople(this)
                }, 500)
            },
            resetCriteria(){
                Object.keys(this.criteria).forEach(key => {
                    this.criteria[key] = defaultCriteria[key]
                });
                this.debounceSearch()
            }
        },
        beforeMount(){
            this.getPeople(this)
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .people-page {
        .cname {
            text-shadow: 0 0 .1px yellow
        }
        .ename {
            font-style: italic;
            text-shadow: 0 0 .1px blue
        }

        .cell {
            padding: 5px 10px
        }
        .source {
            .cell {
                padding: 10px 15px 3px
            }
        }
        .action {
            .cell {
                padding-left: 19px
            }
        }

        .search {
            z-index: 100;
            position: fixed;
            top: 66px;
            right: -10px
        }
        .search-dialog.el-dialog {
            position: fixed;
            top: 105px !important;
            right: -20px;
            left: auto;
            transform: translateX(-10px);
            padding-right: 20px;
            width: 350px;
            border-radius: 10px;

            .el-dialog__header {
                display: none
            }

            .footer {
                text-align: center
            }
        }
        @keyframes dialog-fade-in {
            0% {
                transform: translate3d(20px, 0, 0);
                opacity: 0
            }
            100% {
                transform: translate3d(0, 0, 0);
                opacity: 1
            }
        }
        @keyframes dialog-fade-out {
            0% {
                transform: translate3d(0, 0, 0);
                opacity: 1
            }
            100% {
                transform: translate3d(20px, 0, 0);
                opacity: 0
            }
        }
    }
</style>