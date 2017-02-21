<template>
    <div class="dict">
        <el-tree :data="tree.data" :props="tree.props" node-key="dictId" :default-expanded-keys="[tree.expandedKey]"
                 @node-click="nodeClick"></el-tree>

        <el-table :data="children" stripe border>
            <el-table-column type="expand" width="60">
                <template scope="props">
                    <el-table class="edit-table" :data="[props.row]" :show-header="false" stripe border>
                        <el-table-column label="操作" width="60" class-name="action">
                            <template scope="props">
                                <el-button type="primary" size="small" icon="check"
                                           @click="update(props.row)"></el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="Type" width="120">
                            <template scope="props">
                                <el-input v-model="props.row.type" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="key" label="Key" width="120">
                            <template scope="props">
                                <el-input v-model="props.row.key" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="Value" width="150">
                            <template scope="props">
                                <el-input v-model="props.row.value" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="desc" label="Desc" min-width="240" class-name="edit-desc">
                            <template scope="props">
                                <el-input v-model="props.row.desc" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="Type" width="120"></el-table-column>
            <el-table-column prop="key" label="Key" width="120"></el-table-column>
            <el-table-column prop="value" label="Value" width="150"></el-table-column>
            <el-table-column prop="desc" label="Desc" min-width="240"></el-table-column>
            <el-table-column label="操作" width="70" fixed="right" class-name="action">
                <template scope="props">
                    <el-button type="primary" size="small" icon="delete" @click="deleteIt(props.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="add">
            <el-button class="add-btn" type="primary" size="small" icon="plus" @click="showAdd"></el-button>
            <el-table class="edit-table" :data="addDict" :show-header="false" v-if="isAdding" stripe border>
                <el-table-column label="操作" width="60" class-name="action">
                    <template scope="props">
                        <el-button type="primary" size="small" icon="check" @click="create(props.row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="Type" width="120">
                    <template scope="props">
                        <el-input v-model="props.row.type" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="key" label="Key" width="120">
                    <template scope="props">
                        <el-input v-model="props.row.key" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="value" label="Value" width="150">
                    <template scope="props">
                        <el-input v-model="props.row.value" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="desc" label="Desc" min-width="240">
                    <template scope="props">
                        <el-input v-model="props.row.desc" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data(){
            return {
                children: null,
                addDict: [{}],
                isAdding: false,
                tree: {
                    data: null,
                    expandedKey: 0,
                    props: {children: 'children', label: 'desc'}
                }
            };
        },
        computed: mapGetters([
            'dict'
        ]),
        methods: {
            ...mapActions([
                'getDictTree',
                'createDict',
                'updateDict',
                'deleteDict'
            ]),
            nodeClick(data, node, tree){
                this.tree.expandedKey = data.dictId;
                if (data.hasChild) {
                    this.children = data.children
                }
            },
            showAdd(){
                this.isAdding = true
            },
            create(dict){
                this.createDict(dict).then(() => {
                    this.$message({
                        message: '数据创建成功',
                        type: 'success'
                    });
                    this.isAdding = false;
                    delayedRefresh(this)
                });
            },
            update(dict){
                this.updateDict(dict).then(() => {
                    this.$message({
                        message: '数据更新成功',
                        type: 'success'
                    });
                    delayedRefresh(this)
                })
            },
            deleteIt(dict){
                this.$confirm('确定删除这条记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteDict(dict.dictId).then(() => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.children = this.children.filter(item => {
                            return item.dictId != dict.dictId
                        });
                        delayedRefresh(this)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })
            }
        },
        beforeMount(){
            this.getDictTree();
            delayedRefresh(this)
        }
    }

    function delayedRefresh(context) {
        setTimeout(() => {
            context.tree.data = context.$store.getters.dict.children;
            if (!context.children) context.children = context.tree.data
        }, 200)
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .is-leaf {
        .cell {
            text-align: center
        }
    }

    .el-table__expanded-cell {
        padding: 0
    }

    .edit-table {
        .cell {
            padding: 5px 6px
        }
        .action {
            .cell {
                padding-left: 12px
            }
        }
        .edit-desc {
            .cell {
                padding-right: 76px
            }
        }
    }

    .add {
        .add-btn {
            position: absolute;
            margin: 10px 13px;
            width: 35px
        }
    }
</style>