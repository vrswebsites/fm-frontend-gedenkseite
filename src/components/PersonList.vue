<script setup>
import { usePersonStore } from "@/stores/personStore";
import { computed } from "vue";

const store = usePersonStore();

const persons = computed(() => store.persons);
</script>

<template>
	<div class="person__list">
		<h2>Person List</h2>
		<ul>
			<li v-for="person in persons" :key="person.id">
				<router-link :to="`/person/${person.id}/${person.givenName}`" class="person__list--link">
					{{ person.givenName }} {{ person.familyName }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<style scoped>
.person__list {
	padding: 1em;
	margin: 0 auto;
	font-family: Arial, sans-serif;
}

ul {
	list-style: none;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	gap: 2em;
}

li {
	flex: 1;
	min-width: 200px;
	text-align: center;
}

.person__list--link {
	display: block;
	padding: 1em 2em;
	font-size: 1.2em;
	font-weight: bold;
	text-decoration: none;
	background-color: #f1f1f1;
	color: #333;
	border-radius: 8px;
	transition: background-color 0.3s ease, transform 0.3s ease;
}

.person__list--link:hover {
	background-color: rgb(151, 31, 31);
	color: white;
	transform: translateY(-2px);
}
</style>
