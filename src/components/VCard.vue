<script setup>
import VButton from './VButton.vue';

// Props for the Card Component
const props = defineProps({
    imageSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    showIcon: {
        type: Boolean,
        default: true
    },
    buttonProps: {
        type: Object,
        default: () => ({}),
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="card bg-[var(--color-primary-300)]" :class="{ 'card-disabled': props.disabled }" tabindex="0">
        <fa v-if="props.showIcon" icon="bookmark" class="card-icon-top"></fa>

        <div v-if="props.loading" class="card-spinner">Loading...</div>
        <img v-else :src="props.imageSrc" alt="Card image" />

        <div>
            <h4>{{ props.title }}</h4>
            <h6>{{ props.subTitle }}</h6>
            <p>{{ props.content }}</p>
            <VButton :="props.buttonProps" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    max-height: 500px;
    width: 300px;
    padding: 0.8rem;
    transition: all 0.3s ease-in-out;
    position: relative;
    border: 1px solid;

    /* Hover State */
    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    /* Image styles */
    img {
        height: 200px;
        width: 100%;
        object-fit: cover;
        border-radius: 1rem;
        margin-bottom: 0.5rem;
        background-color: #f0f0f0;
    }

    /* Icon position */
    &-icon-top {
        position: absolute;
        right: 1rem;
        top: 0;
        font-size: 1.5rem;
        padding: 0.5rem;
        background-color: darkgray;
    }

    &-disabled {
        opacity: 0.5;
        pointer-events: none;
    }

}
</style>
