<script setup>
import { computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: 'Click Me', // Default label
    },
    buttonSize: {
        type: String,
        default: 'medium', // Can be small, medium, large
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    isLink: {
        type: Boolean,
        default: false,
    },
    isPrimary: {
        type: Boolean,
        default: false,
    },
    isSecondary: {
        type: Boolean,
        default: false,
    },
    isOutline: {
        type: Boolean,
        default: false,
    },
    isRounded: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
    iconName: {
        type: String,
        default: null,
    },
    iconPlacement: {
        type: String,
        default: 'left', // Position of the icon: left or right
    }
});

// Compute button class dynamically based on props
const computedClasses = computed(() => {
    return {
        btn: true,
        [`btn-${props.buttonSize}`]: true,
        'btn-primary': props.isPrimary && !props.isOutline,
        'btn-secondary': props.isSecondary && !props.isOutline,
        'btn-outline-primary': props.isPrimary && props.isOutline,
        'btn-outline-secondary': props.isSecondary && props.isOutline,
        'rounded-pill': props.isRounded,
        disabled: props.isDisabled || props.isLoading,
    };
});
</script>

<template>
    <button :class="computedClasses" :disabled="isDisabled || isLoading" :aria-busy="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        <fa v-if="iconName && !isLoading && iconPlacement === 'left'" :icon="['fas', iconName]" class="me-2" />
        <span v-if="!isLoading">{{ label }}</span>
        <fa v-if="iconName && !isLoading && iconPlacement === 'right'" :icon="['fas', iconName]" class="ms-2" />
    </button>
</template>
