<script>
    export default {
        name: "FileExplorer",
        data () {
            return {
                path: '/',
                files: []
            };
        },
        props: {
            username: {
                type: String,
                required: true
            },
            repo: {
                type: String,
                required: true
            }
        },
        computed: {
            fullRepoUrl: function() {
                return this.username + '/' + this.repo;
            },
            sortedFiles: function() {
                return this.files.slice(0).sort(function(a, b) {
                    if (a.type !== b.type) {
                        if (a.type === 'dir') {
                            return -1;
                        } else {
                            return 1;
                        }
                    } else {
                        if (a.name < b.name) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
            }
        },
        methods: {
            /*
            getFiles: function() {
             this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path,
             function(data) {
             this.files = data;
             }
             );
             }
             //^0.7.4
             改了api，我提莫德不知道！！！
             搞得我懵逼了5个小时。。。
             */
            /*getFiles: function() {
                this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path)
                    .then( res => {
                        this.files = res.body;
                    }, res =>{
                    console.log('gg思密达~')
                });//^1.2.0 成功~
            }*/
            getFiles: function() {
                this.$http.get('https://api.github.com/repos/' + this.fullRepoUrl + '/contents' + this.path)
                    .then( res => {
                        this.files = res.data;
                    }).catch( err =>{
                        console.log(err + 'gg思密达~')
                    });//axios 成功~
            },
            changePath: function(path) {
                this.path = '/' + path;
                this.getFiles();
            },
            goBack: function() {
                this.path = this.path.split('/').slice(0, -1).join('/');
                if (this.path === '') this.path = '/';
                this.getFiles();
            }
        },
        watch: {
            repo: function(newVal, oldVal) {
                this.path = '/';
                this.getFiles();
            }
        },
        created: function() {
            if (this.username && this.repo) this.getFiles();
        }
    };
</script>
<template>
    <div class="row">
        <div class="col-md-12 col-sm-12">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>当前路径：{{ path }}</th>
                    <th class="text-right">
                        <button class="btn btn-danger btn-xs" @click="goBack()" v-if="path !== '/'">返&emsp;回</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="file in sortedFiles">
                    <td>
                        <div class="file" v-if="file.type === 'file'">
                            <span class="octicon octicon-file-text"></span>
                            <a href="#"> {{ file.name }}</a>
                        </div>
                        <div class="directory" v-if="file.type === 'dir'">
                            <span class="octicon octicon-file-directory"></span>
                            <a href="#" @click="changePath(file.path)"> {{ file.name }}</a>
                        </div>
                    </td>
                    <td class="text-right">
                        <a :href="file.download_url" download="file" v-if="file.type === 'file'">
                            <span class="octicon octicon-cloud-download"></span>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>