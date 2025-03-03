<script setup>
import { computed } from "vue";

const props = defineProps({
    as: { type: String, default: "button", validator: (v) => ["button", "link"].includes(v) },
    label: String,
    href: String,
    type: { type: String, default: "button" },
    disabled: Boolean,
    btnSize: { type: String, default: "md" },
    fullWidth: Boolean,
    variant: { type: String, default: "primary" },
    isLoading: Boolean,
    iconName: String,
    iconPlacement: { type: String, default: "left" },
    rounded: String,
});

const isButton = computed(() => props.as === "button");

const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-400",
    success: "bg-green-600 hover:bg-green-700 text-white disabled:bg-green-400",
    danger: "bg-red-600 hover:bg-red-700 text-white disabled:bg-red-400",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-black disabled:bg-yellow-400",
    info: "bg-blue-400 hover:bg-blue-500 text-white disabled:bg-blue-400",
    outline: "border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white disabled:bg-gray-400",
    link: ''
};

const rounded = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
};
const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
    circle: 'p-4'
};

const buttonClasses = computed(() => [
    props.variant === "link"
        ? "inline-flex items-center gap-2 text-blue-500 hover:underline disabled:text-gray-400"
        : "flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    props.variant !== "link" ? variants[props.variant] || variants.primary : "",
    props.variant !== "link" ? sizes[props.btnSize] || sizes.md : "",
    rounded[props.rounded],
    props.variant !== "link" && props.fullWidth ? "w-full" : "",
    props.disabled || props.isLoading ? "opacity-50 cursor-not-allowed pointer-events-none" : "active:scale-95",
]);


</script>

<template>
    <component :is="isButton ? 'button' : 'a'" :type="isButton ? type : undefined"
        :href="!isButton && href ? href : undefined" :class="buttonClasses"
        :disabled="isButton ? disabled || isLoading : undefined" :aria-disabled="isButton && (disabled || isLoading)">

        <span v-if="isLoading"
            class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>

        <fa v-if="iconName && !isLoading && iconPlacement === 'left'" :icon="['fas', iconName]" :class="sizes" />

        <template v-if="!isLoading">{{ label }}</template>

        <fa v-if="iconName && !isLoading && iconPlacement === 'right'" :icon="['fas', iconName]" :class="sizes" />
    </component>
</template>
