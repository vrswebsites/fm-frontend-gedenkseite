<script setup>
import { usePersonStore } from "@/stores/personStore";
import { ref, computed } from "vue";
import VCard from "@/components/VCard.vue";
import { RouterLink } from "vue-router";
import VButton from "./VButton.vue";

const personStore = usePersonStore();
const persons = computed(() => personStore.persons);
const showCards = ref("");

</script>

<template>
	<div class="person-list">
		<h2>Person List</h2>
		<ul class="person-list__items">
			<li class="person-list__item" v-for="person in persons" :key="person.id">
				<RouterLink :to="`/person/${person.id}/${person.givenName}`" class="person-list__link">
					{{ person.givenName }} {{ person.familyName }}
				</RouterLink>
			</li>
		</ul>
		<VButton class="mt-5" isPrimary label="Toggle Cards" @click="showCards = !showCards"></VButton>
	</div>
	<div v-if="!showCards" class="container card-container">
		<template v-for="person in persons">
			<VCard :imageSrc="person.image[0].contentUrl" :showIcon="true" :title="person.givenName"
				:subTitle="person.familyName" :content="person.description" :buttonProps="{
					label: 'Click me',
					isPrimary: true,
					iconName: 'thumbs-up'
				}"></VCard>
		</template>
	</div>

</template>

<style lang="scss" scoped>
.person-list {
	padding: 4rem;
	margin: 0 auto;
	font-family: Arial, sans-serif;

	&__items {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		gap: 2rem;
	}

	&__item {
		flex-grow: 1;
		flex-basis: 200px;
		text-align: center;
	}

	&__link {
		display: block;
		padding: 4rem 2rem;
		font-size: 1.2rem;
		font-weight: bold;
		text-decoration: none;
		background-color: #f1f1f1;
		color: #333;
		border-radius: 8px;
		transition: background-color 0.3s ease, transform 0.3s ease;

		&:hover {
			background-color: #0055a5;
			color: white;
			transform: translateY(-5px);
		}
	}
}
</style>
