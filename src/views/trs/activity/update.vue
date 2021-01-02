<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <keep-alive>
            <edit v-if="activeName=='edit'" :type="item.key" :is-edit='true' :activity-id='activityId'/>
            <pages v-if="activeName=='pages'" :type="item.key" :is-edit='true' :activity-id='activityId'/>
            <group-sale v-if="activeName=='groupSale'" :type="item.key" :activity-id='activityId'/>
            <school v-if="activeName=='school'" :type="item.key" :activity-id='activityId'/>
            <course v-if="activeName=='course'" :type="item.key" :activity-id='activityId'/>
            <distribution-sale v-if="activeName=='distributionSale'" :type="item.key" :activity-id='activityId'/>
            <statistics v-if="activeName=='statistics'" :type="item.key" :activity-id='activityId'/>
            <gifts v-if="activeName=='gifts'" :type="item.key" :activity-id='activityId'/>
            <locale v-if="activeName=='locale'" :type="item.key" :activity-id='activityId'/>
            <luck-draw v-if="activeName=='luckDraw'" :type="item.key" :activity-id='activityId'/>
            <live-broadcast v-if="activeName=='liveBroadcase'" :type="item.key" :activity-id='activityId'/>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './components/TabPane'
import Edit from './components/edit'
import Pages from './components/pages'
import GroupSale from './components/groupSale'
import School from './components/school'
import Course from './components/course'
import DistributionSale from './components/distributionSale'
import Statistics from './components/statistics'
import Gifts from './components/gifts'
import Locale from './components/locale'
import LuckDraw from './components/luckDraw'
import LiveBroadcast from './components/liveBroadcast'

export default {
  name: 'Tab',
  components: { TabPane,Edit,Pages,GroupSale,School,Course,DistributionSale,Statistics,Gifts,Locale,LuckDraw,LiveBroadcast },
  data() {
    return {
      tabMapOptions: [
        { label: '编辑', key: 'edit'},
        { label: '页面', key: 'pages' },
        { label: '拼团', key: 'groupSale' },
        { label: '机构', key: 'school' },
        { label: '课程', key: 'course' },
        { label: '分销', key: 'distributionSale' },
        { label: '统计', key: 'statistics' },
        { label: '赠品', key: 'gifts' },
        { label: '现场', key: 'locale' },
        { label: '抽奖', key: 'luckDraw' },
        { label: '直播', key: 'liveBroadcase' },
      ],
      activeName: 'edit',
      activityId: ''
    }
  },
  watch: {
    activeName(val) {
      // debugger
      this.$router.push(`${this.$route.path}?tab=${val}&activityId=${this.activityId}`)
    }
  },
  created() {
    // init the default selected tab
    // debugger
    const tab = this.$route.query.tab
    this.activityId = this.$route.query.id
    if(!this.activityId) this.activityId = this.$route.query.activityId
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
