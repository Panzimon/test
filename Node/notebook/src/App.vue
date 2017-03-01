<template>
  <div id="app">
    <n-header @tools="changePages"></n-header>
    <section class="container" :class="{'hide': table}">
      <add-event></add-event>
      <div class="event-content">
        <div class="event-tab" @click="changeCollapse(0,$event)">未完成
          <span :class="{'close-span': !collapse[0].show}"></span>
        </div>
        <ul class="event-box"
            :style="{'height':'auto','display':'block'}">
          <li class="event-list" v-for="value in getToDo">
            <input type="checkbox" @click="moveToDone(value.id,$event)">
            <div>{{value.content}}</div>
            <button class="cancel-btn" @click="moveCancel(value.id)">取消</button>
          </li>
        </ul>
        <div class="event-tab" @click="changeCollapse(1,$event)">已完成
          <span :class="{'close-span': !collapse[1].show}"></span>
        </div>
        <ul class="event-box" >
          <li class="event-list" v-for="value in getDone" >
            <input type="checkbox" checked @click="moveToDo(value.id,$event)">
            <div>{{value.content}}</div>
            <span class="event-time">{{value.time}}</span>
          </li>
        </ul>
        <div class="event-tab" @click="changeCollapse(2,$event)">已取消
          <span :class="{'close-span': !collapse[2].show}"></span>
        </div>
        <ul class="event-box" :class="{'event-box-hide': false}">
          <li class="event-list" v-for="value in getCancel">
            <div class="event-delete">{{value.content}}</div>
            <button class="cancel-btn" @click="moveToDo(value.id)">恢复</button>
          </li>
        </ul>
      </div>
      <n-tools :is-show="tools" @cleardialog="clearData" @opentable="table = true;tools = false"></n-tools>
    </section >
    <n-dialog :is-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
    <n-table @deldialog="delData" :is-show="table" @close="table = false"></n-table>
  </div>
</template>

<script>
  import nHeader from './components/header.vue';
  import addEvent from './components/add_event.vue';
  import nTools from './components/tools.vue';
  import nDialog from './components/dialog.vue';
  import nTable from './components/event_table.vue';

export default {
  name: 'app',
  components: {
    nHeader,
    addEvent,
    nTools,
    nDialog,
    nTable
  },
  data() {
      return {
          collapse: [
            {
                show: true,
              contentHeight: 'auto'
            },
            {
              show: true,
              contentHeight: 'auto'
            },
            {
              show: true,
              contentHeight: 'auto'
            }
          ],
        tools: false,
        dialog: false,
        table: false,
        dialog_type: '',
        tips: '',  //,'删除后无法恢复，确认删除吗？'
        del_info: {
          index: 0,
          id: 0
        }
      }
  },
  computed: {
      getToDo(){
         const self = this;
         return self.$store.state.event.filter(function (d) {
           if(d.type === 1){
               return d;
           }
         });
      },
    getDone(){
          const self = this;
          return self.$store.state.event.filter(function (d) {
            if (d.type === 2){
                return d;
            }
          });
    },
    getCancel(){
      const self = this;
      return self.$store.state.event.filter(function(d){
        if(d.type === 3){
          return d;
        }
      });
    },
  },
  methods: {
      moveToDone(id,event){
          if (event.target.checked){
              this.$store.dispatch('eventdone',id);
              event.target.checked = false;
          }
      },
      moveToDo(id,event){
          if(event && !event.target.checked){
            this.$store.dispatch('eventtodo',id);
            event.target.checked = true;
          }else if(id){
            this.$store.dispatch('eventtodo',id);
          }
      },
      moveCancel(id){
          this.$store.dispatch('eventcancel',id);
      },
      changeCollapse(num,event){
          if (this.collapse[num].show){
              this.closeCollapse(num,event);
              this.collapse[num].show = false;
          }else{
              this.openCollaps(num,event);
              this.collapse[num].show = true;
          }
      },
      closeCollapse(num,event){
          const ulElement = event.currentTarget.nextElementSibling;
          ulElement.style.height = ulElement.offsetHeight + 'px';

      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
