<template>
  <div class="flex flex-col w-full relative">
    <div class="relative w-full">
      <input
          :type="isPasswordVisible ? 'text' : type"
          :value="inputValue"
          @input="updateValue"
          @blur="handleBlur"
          :placeholder="placeholder"
          :class="['w-full px-3 py-2 border rounded-lg focus:outline-none', error ? 'border-red-500' : 'border-gray-300']"
      />
      <button
          v-if="type === 'password'"
          type="button"
          @click="togglePasswordVisibility"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        <EyeIcon v-if="!isPasswordVisible" class="w-5 h-5"/>
        <EyeHideIcon v-else class="w-5 h-5"/>
      </button>
    </div>
    <small v-if="error" class="text-red-500 text-xs mt-1 absolute top-9">{{ error }}</small>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import EyeIcon from "@/components/Icons/Eye.vue";
import EyeHideIcon from "@/components/Icons/EyeHide.vue";

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
const isPasswordVisible = ref(false);

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

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>
