<template>
  <div class="calendar-out">
    <ele-calendar
      :render-content="renderContent"
      :data="datedef"
      :prop="prop"
			class="calendar-in"
    ></ele-calendar>
  </div>
  <!-- 里面写eleCalendar组件-->
</template>
    
<script>
import eleCalendar from "ele-calendar";
import "ele-calendar/dist/vue-calendar.css";
export default {
  data() {
    return {
      datedef: [
        { date: "2018-06-30", content: null, cid: null },
        { date: "2018-06-26", content: null, cid: null }
      ],
      prop: "date" //对应日期字段名
    };
  },
  components: {
    eleCalendar
  },
  methods: {
    renderContent(h, parmas) {
      const loop = data => {
        return data.defvalue.value ? (
          <div>
            <div>{data.defvalue.text}</div>
            <span>备选项</span>
          </div>
        ) : (
          <div>{data.defvalue.text}</div>
        );
      };
      return <div class="grid">{loop(parmas)}</div>;
    }
  }
};
</script>
<style scoped>
.grid{
	min-height:40px;
}
.calendar-out{
	padding:20px 20px 0 20px;
}
.calendar-in{
  background: rgba(255, 255, 255, 0.2);
	color: aqua
}
</style>