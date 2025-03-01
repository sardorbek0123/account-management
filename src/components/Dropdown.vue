<template>
  <div class="flex flex-col w-full">
    <select
        :value="selectedValue"
        @change="updateValue"
        class="w-full px-3 py-2 border rounded-lg focus:outline-none border-gray-300"
    >
      <option v-for="option in options" :key="option[optionValue]" :value="option[optionValue]">
        {{ option[optionLabel] }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  options: Array,
  optionLabel: {
    type: String,
    default: "label",
  },
  optionValue: {
    type: String,
    default: "value",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const selectedValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
      selectedValue.value = newValue;
    }
);

const updateValue = (event) => {
  const newValue = event.target.value;
  emit("update:modelValue", newValue);
  emit("change", newValue);
};
</script>
