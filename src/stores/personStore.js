import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const usePersonStore = defineStore("personStore", () => {
  const persons = ref([]);
  const obituaries = ref([]);
  const videoObituaries = ref([]);
  const candles = ref([]);
  const condolences = ref([]);
  const selectedPersonId = ref(null);

  async function fetchData() {
    try {
      const [
        personData,
        obituariesData,
        videoObituariesData,
        candlesData,
        condolencesData,
      ] = await Promise.all([
        fetch("/person.json").then((res) => res.json()),
        fetch("/obituaries.json").then((res) => res.json()),
        fetch("/video.json").then((res) => res.json()),
        fetch("/candles.json").then((res) => res.json()),
        fetch("/condolences.json").then((res) => res.json()),
      ]);

      // Update state
      persons.value = personData;
      obituaries.value = obituariesData;
      videoObituaries.value = videoObituariesData;
      candles.value = candlesData;
      condolences.value = condolencesData;
    } catch (error) {
      console.error("Data fetch error:", error.message);
    }
  }

  const selectedPersonDetails = computed(() => {
    if (!selectedPersonId.value) return null;
    console.log(selectedPersonId.value);
    const person = persons.value.find((p) => p.id === selectedPersonId.value);
    if (!person) return null;

    return {
      ...person,
      videoObituaries: videoObituaries.value.filter(
        (v) => v.personId === person.id
      ),
      obituaries:
        obituaries.value.find((ob) => ob.personId === person.id) || null,
      candles: candles.value.filter((c) => c.personId === person.id),
      condolences: condolences.value.filter((c) => c.personId === person.id),
    };
  });

  function selectPerson(id) {
    selectedPersonId.value = id;
  }

  return {
    persons,
    fetchData,
    selectedPersonId,
    selectedPersonDetails,
    selectPerson,
  };
});
