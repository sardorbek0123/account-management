<template>
  <div class="flex flex-col w-full relative">
    <input
        :type="type"
        :value="inputValue"
        @input="updateValue"
        @blur="handleBlur"
        :placeholder="placeholder"
        :class="['w-full px-3 py-2 border rounded-lg focus:outline-none', error ? 'border-red-500' : 'border-gray-300']"
    />
    <small v-if="error" class="text-red-500 text-xs mt-1 absolute top-9">{{ error }}</small>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  placeholder: String,
  error: String,
  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:modelValue", "blur"]);

const inputValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
      inputValue.value = newValue;
    }
);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleBlur = (event) => {
  emit("blur", event);
};
</script>
