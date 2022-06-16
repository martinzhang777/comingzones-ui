<template>
  <slot :text="result" :open="openPicker">
    <van-field
      @click="openPicker"
      v-model="result"
      readonly
      :label="label"
      :placeholder="placeholder"
      input-align="right"
      :right-icon="isShowArrow ? 'arrow' : ''"
    />
  </slot>

  <van-popup v-model:show="showPicker" position="bottom" teleport="#app">
    <van-datetime-picker
      v-model="currentDate"
      :type="type"
      title="请选择"
      :min-date="startDate"
      :max-date="endDate"
      @confirm="onConfirm"
      :formatter="formatter"
      @cancel="showPicker = false"
    />
  </van-popup>
</template>
<script lang="ts">
import { ref } from "vue";
import { computed, defineComponent, toRef, watch } from "@vue/runtime-core";
import moment from "moment";
import { Field, Popup, DatetimePicker } from "vant";

export default defineComponent({
  name: "FDate",
  emits: ["update:value", "update:show", "confirm"],
  components: {
    "van-field": Field,
    "van-popup": Popup,
    "van-datetime-picker": DatetimePicker,
  },
  props: {
    label: String,
    placeholder: String,
    value: [String, Date],
    minDate: {
      type: Date,
    },
    maxDate: {
      type: Date,
    },
    before: {
      type: Number,
      default: 0,
    },
    after: {
      type: Number,
      default: 0,
    },
    type: String,
    show: Boolean,
    isShowArrow: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    format: {
      type: String,
      default: "YYYY-MM-DD",
    },
    formatter: {
      type: Function,
      default: (type: string, val: string) => {
        if (type === "year") {
          return val + "年";
        }
        if (type === "month") {
          return val + "月";
        }
        if (type === "day") {
          return val + "日";
        }
        return val;
      },
    },
  },
  setup(props, { emit }) {
    // const state = reactive({
    //   showPicker: false,
    //   result: moment(props.value).format(props.format),
    // });
    const showPicker = ref(false);
    const result = ref("");
    // 设置默认选中的日期
    const setResult = () => {
      if (props.value) {
        result.value = moment(props.value).format(props.format);
        currentDate.value = moment(props.value).toDate();
      } else {
        result.value = "";
      }
    };

    const currentDate = ref(new Date());

    const onConfirm = (value: Date) => {
      console.log("confirm", value);
      showPicker.value = false;
      setResult();
      emit("update:value", moment(value).format("YYYY-MM-DD HH:mm:ss"));
      emit("confirm", value);
    };

    watch([showPicker], () => {
      emit("update:show", showPicker.value);
    });

    watch([toRef(props, "value")], () => {
      // result.value = moment(props.value).format(props.format);
      setResult();
    });
    setResult();

    const startDate = computed(() => {
      if (props.minDate) {
        return props.minDate;
      }
      if (props.before) {
        return moment().subtract(props.before, "s").toDate();
      }
      return moment().subtract(10, "y").toDate();
    });
    const endDate = computed(() => {
      if (props.maxDate) {
        return props.maxDate;
      }
      if (props.after) {
        return moment().add(props.after, "s").toDate();
      }
      return moment().add(10, "y").toDate();
    });

    return {
      showPicker,
      result,
      currentDate,
      onConfirm,
      openPicker: () => {
        showPicker.value = true;
      },
      startDate,
      endDate,
    };
  },
});
</script>
