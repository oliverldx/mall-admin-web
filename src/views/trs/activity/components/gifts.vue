<template>
    <div class="app-container">
        <el-button
                    class="btn-add"
                    @click="handleAdd()"
                    size="mini">
                添加
            </el-button>
        <div class="table-container">
            <el-table ref="orderTable"
                      :data="list"
                      style="width: 100%;"
                      @selection-change="handleSelectionChange"
                      v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                        <el-table-column label="ID" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.id}}</template>
                        </el-table-column>
                        <el-table-column label="图片" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.pic}}</template>
                        </el-table-column>
                        <el-table-column label="名称" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.name}}</template>
                        </el-table-column>
                        <el-table-column label="赞助商" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.sponsorName}}</template>
                        </el-table-column>
                        <el-table-column label="数量" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.num}}</template>
                        </el-table-column>
                        <el-table-column label="有效期" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.validateTime}}</template>
                        </el-table-column>
                        <el-table-column label="状态" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.status}}</template>
                        </el-table-column>
                        <el-table-column label="排序" width="180" align="center">
                            <template slot-scope="scope">{{scope.row.sort}}</template>
                        </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleUpdate(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-container">
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total, sizes,prev, pager, next,jumper"
                    :current-page.sync="listQuery.pageNum"
                    :page-size="listQuery.pageSize"
                    :page-sizes="[5,10,15]"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {fetchList,del} from '@/api/gift'

    const defaultListQuery = {
        pageNum: 1,
        pageSize: 10
    };

    export default {
        name: 'Course',
        props: {
            activityId: {
                type: [String, Number]
            }
        },
        data() {
            return {
                listQuery: Object.assign({}, defaultListQuery),
                listLoading: true,
                list: null,
                total: null,
                operateType: null,
                multipleSelection: []
            }
        },
        created() {
            this.getList();
        },
        mounted() {},
        methods: {
            handleResetSearch() {
                this.listQuery = Object.assign({}, defaultListQuery);
            },
            handleSearchList() {
                this.listQuery.pageNum = 1;
                this.getList();
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            handleSizeChange(val){
                this.listQuery.pageNum = 1;
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val){
                this.listQuery.pageNum = val;
                this.getList();
            },
            handleAdd() {
                this.$router.push({path:'/trs/addGift'});
            },
            handleUpdate(index, row){
                this.$router.push({path:'/trs/updateGift',query:{id:row.id}});
            },
            handleDelete(index, row){
                let ids=[];
                ids.push(row.id);
                this.del(ids);
            },
            getList() {
                this.listLoading = true;
                fetchList(this.listQuery).then(response => {
                    this.listLoading = false;
                    this.list = response.data.list;
                    this.total = response.data.total;
                });
            },
            del(ids){
                this.$confirm('是否要进行该删除操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = new URLSearchParams();
                    params.append("ids",ids);
                    del(params).then(response=>{
                        this.$message({
                            message: '删除成功！',
                            type: 'success',
                            duration: 1000
                        });
                        this.getList();
                    });
                })
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>
