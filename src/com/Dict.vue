<template>
    <div class="dict">
        <el-tree :data="tree.data" node-key="dictId" :default-expanded-keys="[tree.expandedKey]" :props="tree.props"
                 @node-click="nodeClick"></el-tree>

        <el-table :data="table.data" row-key="dictId" :expand-row-keys="[table.expandedKey]" @expand="rowExpand" stripe
                  border>
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
                                <el-select v-model="props.row.type" placeholder="请选择">
                                    <el-option
                                            v-for="item in dictTypes"
                                            :label="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="key" label="Key" width="200">
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
            <el-table-column prop="key" label="Key" width="200"></el-table-column>
            <el-table-column prop="value" label="Value" width="150"></el-table-column>
            <el-table-column prop="desc" label="Desc" min-width="240"></el-table-column>
            <el-table-column label="操作" width="70" fixed="right" class-name="action">
                <template scope="props">
                    <el-tooltip class="item" effect="dark" content="仅可删除末尾节点" placement="top-end">
                        <el-button type="primary" size="small" icon="delete" v-if="!props.row.hasChild"
                                   @click="deleteIt(props.row)"></el-button>
                    </el-tooltip>
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
                        <el-autocomplete
                                class="inline-input"
                                v-model="props.row.type"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入">
                        </el-autocomplete>
                    </template>
                </el-table-column>
                <el-table-column prop="key" label="Key" width="200">
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
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        data(){
            return {
                dictTypes: [],
                isAdding: false,
                addDict: [{type: null}],
                tree: {
                    data: null,
                    expandedKey: 0,
                    selectedType: 'Root',
                    props: {children: 'children', label: 'displayName'}
                },
                table: {
                    data: null,
                    expandedKey: 0
                }
            };
        },
        computed: mapGetters([
            'dict'
        ]),
        methods: {
            ...mapMutations([
                'ACTIVATE_MENU'
            ]),
            ...mapActions([
                'getDictTree',
                'getDictTypes',
                'createDict',
                'updateDict',
                'deleteDict'
            ]),
            nodeClick(data, node, tree){
                this.tree.expandedKey = data.dictId;
                this.tree.selectedType = data.type;
                if (data.hasChild) {
                    this.table.data = data.children
                }
            },
            rowExpand(row){
                this.table.expandedKey = row.dictId;
                this.isAdding = false
            },
            showAdd(){
                this.table.expandedKey = 0;
                this.isAdding = true
            },
            querySearch(query, cb){
                cb(this.dictTypes)
            },
            create(dict){
                this.createDict(dict).then(() => {
                    this.$message({message: '数据创建成功', type: 'success'});
                    if (this.table.data[0].type == dict.type) {
                        this.table.data.push(dict)
                    }
                    this.isAdding = false;
                    this.addDict = [{type: null}];
                    delayedRefresh(this)
                });
            },
            update(dict){
                this.updateDict(dict).then(() => {
                    this.$message({message: '数据更新成功', type: 'success'});
                    delayedRefresh(this)
                })
            },
            deleteIt(dict){
                this.$confirm('确定删除这条记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteDict(dict).then(() => {
                        this.$message({message: '删除成功', type: 'success'});
                        this.table.data = this.table.data.filter(item => {
                            return item.dictId != dict.dictId
                        });
                        delayedRefresh(this)
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消'})
                })
            }
        },
        beforeMount(){
            this.getDictTree();
            delayedRefresh(this)
        }
    }

    function delayedRefresh(context) {
        context.table.expandedKey = 0;
        context.$store.commit('ACTIVATE_MENU', '3');
        context.getDictTypes().then(dictTypes => {
            context.dictTypes = [{value: 'Root'}];
            dictTypes.forEach(type => {
                context.dictTypes.push({value: type.key})
            })
        });
        setTimeout(() => {
            context.tree.data = context.$store.getters.dict.children;
            if (!context.table.data) context.table.data = context.tree.data
        }, 300)
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .el-table__expanded-cell {
        padding: 0
    }

    .is-leaf {
        .cell {
            text-align: center
        }
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