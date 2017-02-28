<template>
    <div class="criteria-page">
        <div class="category">
            <span class="title">Keyword</span>
            <el-checkbox :indeterminate="isKeywordIndeterminate" v-model="keywordCheckAll"
                         @change="keywordCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedKeywords" @change="keywordCheck">
                <el-checkbox v-for="item in keywords" :label="item">{{item.key}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <div class="category">
            <span class="title">Industry</span>
            <el-checkbox :indeterminate="isIndustryIndeterminate" v-model="industryCheckAll"
                         @change="industryCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedIndustries" @change="industryCheck">
                <el-checkbox v-for="item in industries" :label="item">{{item.key}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <div class="category">
            <span class="title">Location</span>
            <el-checkbox :indeterminate="isLocationIndeterminate" v-model="locationCheckAll"
                         @change="locationCheckAllChange">全选
            </el-checkbox>
            <el-checkbox-group v-model="checkedLocations" @change="locationCheck">
                <el-checkbox v-for="item in locations" :label="item">{{item.key}}</el-checkbox>
            </el-checkbox-group>
        </div>

        <el-button class="gen-btn" type="primary" @click="generate">生成条件
            <i class="el-icon-upload2 el-icon--right"></i>
        </el-button>

        <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page"
                :total="criteria.count"
                :page-size="limit"
                :page-sizes="[20, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <el-table :data="criteria.rows" stripe border>
            <el-table-column prop="keyword" label="Keyword" width="100"></el-table-column>
            <el-table-column prop="industry" label="Industry" width="200"></el-table-column>
            <el-table-column prop="location" label="Location" width="200"></el-table-column>
            <el-table-column prop="url" label="LinkedIn URL" min-width="600"></el-table-column>
            <el-table-column prop="executedText" label="Executed" class-name="executed" width="90"></el-table-column>
            <el-table-column label="操作" width="70" fixed="right" class-name="action">
                <template scope="props">
                    <el-button type="primary" size="small" icon="delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page"
                :total="criteria.count"
                :page-size="limit"
                :page-sizes="[20, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        data(){
            return {
                isKeywordIndeterminate: false,
                isIndustryIndeterminate: false,
                isLocationIndeterminate: false,
                keywordCheckAll: false,
                industryCheckAll: false,
                locationCheckAll: false,
                checkedKeywords: [],
                checkedIndustries: [],
                checkedLocations: [],
                keywords: [],
                industries: [],
                locations: [],
                page: 1,
                limit: config.PAGE_SIZE
            }
        },
        computed: mapGetters([
            'criteria'
        ]),
        methods: {
            ...mapActions([
                'getDicts',
                'getCriteria',
                'bulkCreateCriteria'
            ]),
            keywordCheckAllChange(event) {
                this.checkedKeywords = event.target.checked ? this.keywords : [];
                this.isKeywordIndeterminate = false
            },
            industryCheckAllChange(event) {
                this.checkedIndustries = event.target.checked ? this.industries : [];
                this.isIndustryIndeterminate = false
            },
            locationCheckAllChange(event) {
                this.checkedLocations = event.target.checked ? this.locations : [];
                this.isLocationIndeterminate = false
            },
            keywordCheck(value){
                let checkedCount = value.length;
                this.keywordCheckAll = checkedCount === this.keywords.length;
                this.isKeywordIndeterminate = checkedCount > 0 && checkedCount < this.keywords.length
            },
            industryCheck(value){
                let checkedCount = value.length;
                this.industryCheckAll = checkedCount === this.industries.length;
                this.isIndustryIndeterminate = checkedCount > 0 && checkedCount < this.industries.length
            },
            locationCheck(value){
                let checkedCount = value.length;
                this.locationCheckAll = checkedCount === this.locations.length;
                this.isLocationIndeterminate = checkedCount > 0 && checkedCount < this.locations.length
            },
            async generate(){
                if (!this.checkedKeywords.length || !this.checkedIndustries.length || !this.checkedLocations.length) {
                    return this.$message({message: '每种条件请至少选择一个', type: 'warning'})
                }

                let result = await this.bulkCreateCriteria({
                    keywords: this.checkedKeywords,
                    industries: this.checkedIndustries,
                    locations: this.checkedLocations
                });
                let message = `生成了${result.inserted}条记录`;
                if (result.existed) message += `,其他${result.existed}条已经存在`;
                return this.$message({message, type: 'success'})
            },
            sizeChange(val) {
                this.limit = val;
                this.page = 1;
                this.getCriteria(this)
            },
            currentChange(val) {
                this.page = val;
                this.getCriteria(this)
            }
        },
        beforeMount(){
            this.$store.commit('ACTIVATE_MENU', '2');
            this.getDicts('Keyword').then(dicts => {
                this.keywords = dicts
            });
            this.getDicts('Industry').then(dicts => {
                this.industries = dicts
            });
            this.getDicts('Location').then(dicts => {
                this.locations = dicts
            });
            this.getCriteria(this)
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .criteria-page {
        .category {
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid #dfe6ec
        }
        .title {
            display: inline-block;
            width: 70px;
            text-shadow: 0 0 0.1px blue
        }
        .el-checkbox {
            width: 250px;
            margin-left: 15px
        }
        .gen-btn {
            margin: 0 0 10px calc(45% - 35px)
        }
        .el-table {
            .cell {
                padding: 5px 6px
            }
        }
        .executed {
            text-shadow: 0 0 0.1px yellow
        }
    }
</style>