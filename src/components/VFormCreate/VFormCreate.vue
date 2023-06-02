<template>
  <form  enctype='multipart/form-data' class="form" @submit.prevent="submitForm">
    <label class="form__label" for="nickname">Nickname:</label>
    <input class="form__input" type="text" id="nickname" v-model="formData.nickname" required><br>

    <label class="form__label" for="real_name">Real Name:</label>
    <input class="form__input" type="text" id="real_name" v-model="formData.real_name" required><br>

    <label class="form__label" for="origin_description">Origin Description:</label><br>
    <textarea class="form__input" id="origin_description" v-model="formData.origin_description" rows="4" cols="50" required></textarea><br>

    <label class="form__label" for="superpowers">Superpowers:</label>
    <input class="form__input" type="text" id="superpowers" v-model="formData.superpowers" required><br>

    <label class="form__label" for="catch_phrase">Catch Phrase:</label>
    <input class="form__input" type="text" id="catch_phrase" v-model="formData.catch_phrase" required><br>

    <label class="form__label" for="photo">Photo:</label>
    <input multiple  type="file" id="photo" ref="photoInput" @change="onPhotoInputChange" required><br>

    <input class="form__button" type="submit" value="Add Hero">
  </form>
</template>

<script setup lang="ts">
import {reactive} from "vue";

const formData = reactive({
  nickname: "",
  real_name: "",
  origin_description: "",
  superpowers: "",
  catch_phrase: "",
  photo: null as File | null,
});

const submitForm = async () => {
  const requestBody = new FormData();
  requestBody.append("nickname", formData.nickname);
  requestBody.append("real_name", formData.real_name);
  requestBody.append("origin_description", formData.origin_description);
  requestBody.append("superpowers", formData.superpowers);
  requestBody.append("catch_phrase", formData.catch_phrase);
  if (formData.photo) {
    requestBody.append("file", formData.photo);
  }
  try {
    const response = await fetch("http://localhost:3000/superhero/create", {
      method: "POST",
      body: requestBody,
    });
    const data = await response.json();
    console.log("Response:", data);

    formData.nickname = "";
    formData.catch_phrase = "";
    formData.photo = null;
    formData.real_name = "";
    formData.superpowers = "";
    formData.origin_description = "";
  } catch (error) {
    console.error("Error:", error);
  }
};
const onPhotoInputChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files) {
    formData.photo = inputElement.files[0];
  } else {
    formData.photo = null;
  }
};
</script>

<style scoped lang="scss">
  .form {
    width: 50%;
    padding: 25px;
    margin: 25px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
    align-items: center;
    border: solid black 1px;
    border-radius: 25px;
    &__label {
      font-size: 20px;
      font-weight: bold;
    }
    &__input {
      width: 100%;
      border: solid black 1px;
      border-radius: 25px;
      padding: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    &__button {
      width: 50%;
      height: 40px;
      background: none;
      border: solid black 1px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.5);
        transition-duration: .3s;
      }
    }
  }
</style>