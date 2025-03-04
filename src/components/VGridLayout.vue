<template>
    <div class="container">
        <!-- Left Column -->
        <div class="left-column">
            <slot name="left"></slot>
        </div>

        <!-- Right Column -->
        <div class="right-column">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style lang="scss">
.container {
    display: grid;
    grid-template-columns: 7fr 3fr;
    gap: 1rem;
    min-height: 60vh;
    max-width: 1200px;

    .left-column {
        background-color: var(--primary-color-tint-4);
        padding: 1.5rem;
        border-radius: 1rem;
    }

    .right-column {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 1rem;

        .row {
            padding: 1.5rem;
            border-radius: 1rem;
            background-color: var(--primary-color-tint-4);
        }
    }
}
</style>
