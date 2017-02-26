<template>
    <div class="crawler-page">
        <el-button class="gen-btn" type="primary" @click="generate">生成条件
            <i class="el-icon-upload2 el-icon--right"></i>
        </el-button>

        <div class="socket">
            <div class="message" v-html="message"></div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                message: ''
            }
        },
        methods: {
            generate(){
                if (this.$options.sockets.broadcast) {
                    delete this.$options.sockets.broadcast;
                    return this.$options.sockets.broadcast = null
                }
                this.$options.sockets.broadcast = message => {
                    this.message += message + '<br/>'
                }
            }
        },
        beforeMount(){

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .crawler-page {
        .socket {
            position: relative;
            height: 500px;
            border: 20px solid #555;
            border-radius: 5px;
            overflow-y: scroll;
            background: #555;
            font-family: "Droid Sans Mono", "Courier New", monospace;
            color: #bbb;

            .message {
                position: absolute;
                bottom: 0;
                min-height: 460px
            }
        }
    }
</style>