<script setup>
import { usePersonStore } from "@/stores/personStore";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import PersonInfoTab from '@/components/Tabs.vue';
import ResponsiveImages from '@/components/ResponsiveImage.vue';

const personStore = usePersonStore();
const route = useRoute();
const isStartTabActive = ref(true);
defineProps(["id", "givenName"]);

onMounted(() => {
	personStore.selectPerson(Number(route.params.id));
});

const person = computed(() => personStore.selectedPersonDetails);
</script>

<template>
	<router-link to="/">Back</router-link>

	<div v-if="person">
		<div class="profile">
			<img v-if="person.image" :src="person.image[0].contentUrl" :alt="person.givenName" class="profile__image" />
			<span class="profile__info">
				<h1>{{ person.givenName }} {{ person.additionalName }} {{ person.familyName }}</h1>
				<span>
					<p><strong>Birth Date:</strong> {{ person.birthDate }}</p>
					<p><strong>Death Date:</strong> {{ person.deathDate }} {{ person.deathPlace.address.addressLocality
					}}</p>
				</span>
			</span>
			<div class="profile__creator">
				<span>{{ person.createdBy.name }}</span>
				<span>{{ person.createdBy.location }}</span>
				<span>{{ person.createdBy.date }}</span>
				<span>{{ person.createdBy.relation }}</span>
				<span> Besuche {{ person.noOfVisitors }}</span>
			</div>
		</div>

		<person-info-tab @tabChanged="isStartTabActive = $event"></person-info-tab>

		<div v-if="isStartTabActive" class="profile__overview">
			<!-- obituaries -->
			<h3>Obituaries</h3>
			<div v-if="person.obituaries">
				<ul>
					<li>{{ person.obituaries.title }}</li>
					<li>{{ person.obituaries.description }}</li>
					<li>{{ person.obituaries.publicationDate }}</li>
					<li>{{ person.obituaries.publisher }}</li>
					<ResponsiveImages :sizes="person.obituaries.sizes" />
				</ul>
			</div>

			<!-- Video -->
			<div v-if="person.videoObituaries && person.videoObituaries.length">
				<video v-for="(video, index) in person.videoObituaries" :key="index" width="400" controls>
					<source :src="video.contentUrl" type="video/mp4">
				</video>
			</div>
			<div v-else>
				<p>No video data available</p>
			</div>

			<!-- Candles -->
			<h3>Candles</h3>
			<ul v-if="person.candles && person.candles.length">
				<li v-for="(candleGroup, index) in person.candles" :key="index">
					<p><strong>Candle Count:</strong> {{ candleGroup.candleCount }}</p>
					<ul>
						<li v-for="(candle, msgIndex) in candleGroup.candles" :key="msgIndex">
							<img :src="candle.mediaUrl" alt="Candle" width="50" />
							<p><strong>{{ candle.author }}</strong> ({{ candle.date }} - {{ candle.time }}): {{
								candle.content }}</p>
						</li>
					</ul>
				</li>
			</ul>

			<!-- Condolences -->
			<h3>Condolences</h3>
			<ul v-if="person.condolences && person.condolences.length">
				<li v-for="(condolenceGroup, index) in person.condolences" :key="index">
					<p><strong>Condolence Count:</strong> {{ condolenceGroup.condolenceCount }}</p>
					<ul>
						<li v-for="(message, msgIndex) in condolenceGroup.condolences" :key="msgIndex">
							<p><strong>{{ message.author }}</strong> ({{ message.date }} - {{ message.time }}): {{
								message.content }}</p>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.profile {
	display: flex;
	position: relative;
	justify-content: space-between;
	background-color: #f1f1f1;
	padding: 1em;
}

.profile__image {
	height: 150px;
	width: 150px;
	border: 2px solid black;
	object-fit: cover;
}

.profile__creator {
	display: flex;
	flex-direction: column;
	padding: 1em;
}
</style>
