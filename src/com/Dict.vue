<template>
    <div class="dict-page">
        <el-tree :data="tree.data" node-key="dictID" :default-expanded-keys="[tree.expandedKey]" :props="tree.props"
                 @node-click="nodeClick"></el-tree>

        <transition name="fade" mode="in-out">
            <div class="add">
                <el-button class="add-btn" type="primary" size="small" icon="plus" v-if="!isAdding"
                           @click="showAdd"></el-button>
                <el-table class="edit-table" :data="addDict" :show-header="false" v-else stripe border>
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
                                    :fetch-suggestions="querySearchTypes"
                                    placeholder="请输入">
                            </el-autocomplete>
                        </template>
                    </el-table-column>
                    <el-table-column prop="key" label="Key" width="200">
                        <template scope="props">
                            <el-autocomplete
                                    class="location-input"
                                    v-if="props.row.type=='Location'"
                                    v-model="props.row.key"
                                    :fetch-suggestions="querySearchLocations"
                                    placeholder="请输入内容">
                            </el-autocomplete>
                            <el-input v-else v-model="props.row.key" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="value" label="Value" min-width="600">
                        <template scope="props">
                            <el-input v-model="props.row.value" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="desc" label="Desc" width="310">
                        <template scope="props">
                            <el-input v-model="props.row.desc" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </transition>

        <el-table :data="table.data" row-key="dictID" :expand-row-keys="[table.expandedKey]" @expand="rowExpand" stripe
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
                                <el-autocomplete
                                        class="location-input"
                                        v-if="props.row.type=='Location'"
                                        v-model="props.row.key"
                                        :fetch-suggestions="querySearchLocations"
                                        placeholder="请输入内容">
                                </el-autocomplete>
                                <el-input v-else v-model="props.row.key" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="Value" min-width="600">
                            <template scope="props">
                                <el-input v-model="props.row.value" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="desc" label="Desc" width="310" class-name="edit-desc">
                            <template scope="props">
                                <el-input v-model="props.row.desc" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="Type" width="120"></el-table-column>
            <el-table-column prop="key" label="Key" width="200"></el-table-column>
            <el-table-column prop="value" label="Value" min-width="600"></el-table-column>
            <el-table-column prop="desc" label="Desc" width="240"></el-table-column>
            <el-table-column label="操作" width="70" fixed="right" class-name="action">
                <template scope="props">
                    <el-tooltip class="item" effect="dark" content="仅可删除末尾节点" placement="top-end">
                        <el-button type="primary" size="small" icon="delete" v-if="!props.row.hasChild"
                                   @click="deleteIt(props.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        data(){
            return {
                dictTypes: [],
                locationList: [],
                isAdding: false,
                addDict: [{type: null, key: null}],
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
            }
        },
        computed: mapGetters([
            'dict'
        ]),
        methods: {
            ...mapActions([
                'getDictTree',
                'getDictTypes',
                'getLocationList',
                'createDict',
                'updateDict',
                'deleteDict'
            ]),
            nodeClick(data){
                this.tree.expandedKey = data.dictID;
                this.tree.selectedType = data.type;
                this.isAdding = false;
                if (data.hasChild) {
                    this.table.data = data.children
                }
            },
            rowExpand(row){
                this.table.expandedKey = row.dictID;
                this.isAdding = false
            },
            showAdd(){
                this.table.expandedKey = 0;
                this.isAdding = true
            },
            querySearchTypes(query, cb){
                cb(this.dictTypes)
            },
            querySearchLocations(query, cb){
                if (!query) {
                    return cb(this.locationList)
                }
                cb(this.locationList.filter(item => item.value.includes(query)))
            },
            async create(dict){
                if (!validate(dict, this)) return;
                let newDict = await this.createDict(dict);
                this.$message({message: '数据创建成功', type: 'success'});
                if (this.table.data[0].type == dict.type) {
                    this.table.data.push(newDict)
                }
                this.isAdding = false;
                this.addDict = [{type: null, key: null}];
                delayedRefresh(this)
            },
            async update(dict){
                if (!validate(dict, this)) return;
                await this.updateDict(dict);
                this.$message({message: '数据更新成功', type: 'success'});
                delayedRefresh(this)
            },
            deleteIt(dict){
                this.$confirm('确定删除这条记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    await this.deleteDict(dict);
                    this.$message({message: '删除成功', type: 'success'});
                    delayedRefresh(this);
                    this.table.data = this.table.data.filter(item => {
                        return item.dictID != dict.dictID
                    })
                }).catch(() => {
                    this.$message({type: 'info', message: '已取消'})
                })
            }
        },
        beforeMount(){
            this.$store.commit('ACTIVATE_MENU', '4');
            this.getDictTree();
            delayedRefresh(this)
        }
    }

    function delayedRefresh(context) {
        context.table.expandedKey = 0;
        context.getDictTypes().then(dictTypes => {
            context.dictTypes = [{value: 'Root'}];
            dictTypes.forEach(type => {
                context.dictTypes.push({value: type.key})
            })
        });
        context.getLocationList().then(locations => {
            context.locationList = locations.map(item => ({value: item}));
        });
        setTimeout(() => {
            context.tree.data = context.dict.children;
            if (!context.table.data) context.table.data = context.tree.data
        }, 500)
    }

    function validate(dict, context) {
        for (let field of ['type', 'key']) {
            if (!dict[field]) {
                context.$message({message: field + '不能为空', type: 'warning'});
                return false
            }
        }
        if (['Industry', 'Location'].includes(dict.type)) {
            if (!dict.value) {
                context.$message({message: 'value不能为空', type: 'warning'});
                return false
            }
            if (dict.type == 'Location' && context.locationList.some(item => item.value == dict.key)) {
                dict.key = dict.key.slice(0, dict.key.indexOf(','))
            } else {
                context.$message({message: 'Location必须从下拉列表中选择', type: 'warning'});
                return false
            }
        }
        return true
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .dict-page {
        .el-table__expanded-cell {
            padding: 0
        }
        .el-table {
            .cell {
                padding: 5px 6px
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
                margin: 10px 13px;
                width: 35px
            }
        }
        .location-input {
            width: 100%
        }
    }
</style>