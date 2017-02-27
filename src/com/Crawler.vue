<template>
    <div class="crawler-page">
        <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="page"
                :total="criteria.count"
                :page-size="limit"
                :page-sizes="[20, 50, 100, 200]"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <el-table :data="criteria.rows" @selection-change="selectionChange" stripe border>
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="keyword" label="Keyword" width="100"></el-table-column>
            <el-table-column prop="industry" label="Industry" width="200"></el-table-column>
            <el-table-column prop="location" label="Location" width="200"></el-table-column>
            <el-table-column prop="url" label="LinkedIn URL" min-width="600"></el-table-column>
            <el-table-column prop="executedText" label="Executed" class-name="executed" width="90"
                             fixed="right"></el-table-column>
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

        <el-button class="crawl-btn" type="primary" :disabled="crawlDisabled||crawlOngoing" @click="startCrawl">
            {{crawlOngoing?'正在抓取':'开始抓取'}}
            <i class="el-icon--right" :class="crawlOngoing?'el-icon-loading':'el-icon-caret-right '"></i>
        </el-button>

        <div class="socket">
            <div class="message" v-html="message"></div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default{
        data() {
            return {
                page: 1,
                limit: config.PAGE_SIZE,
                selectedCriteria: null,
                crawlDisabled: true,
                crawlOngoing: false,
                message: ''
            }
        },
        computed: mapGetters([
            'criteria'
        ]),
        methods: {
            ...mapMutations([
                'ACTIVATE_MENU'
            ]),
            ...mapActions([
                'getCriteria',
                'crawl'
            ]),
            sizeChange(val) {
                this.limit = val;
                this.page = 1;
                this.getCriteria(this)
            },
            currentChange(val) {
                this.page = val;
                this.getCriteria(this)
            },
            selectionChange(val) {
                this.selectedCriteria = val;
                this.crawlDisabled = val == 0
            },
            async startCrawl() {
                await this.crawl(this.selectedCriteria);
                this.crawlOngoing = true
            }
        },
        beforeMount(){
            this.$store.commit('ACTIVATE_MENU', '3');
            this.getCriteria(this);
            this.$options.sockets.broadcast = message => {
                this.message += message + '<br/>';
                this.crawlOngoing = message != '处理完成'
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .crawler-page {
        .crawl-btn {
            margin: 10px 0 10px calc(45% - 35px)
        }
        .socket {
            position: relative;
            min-height: 500px;
            border: 20px solid #555;
            border-radius: 5px;
            background: #555;
            font-family: "Droid Sans Mono", "Courier New", monospace;
            color: #bbb;

            .message {
                bottom: 0;
                min-height: 460px
            }

            .data {
                color: yellow
            }
        }
    }
</style>