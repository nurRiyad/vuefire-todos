<script setup lang="ts">
interface Prpos {
  title: string;
  description: string;
}

const props = withDefaults(defineProps<Prpos>(), {
  title: 'No Task Available',
  description: 'No description available',
});

const onClicked = () => {
  console.log('Clicked');
};
</script>

<template>
  <div class="form-control">
    <label @click.previent="onClicked" class="label cursor-pointer">
      <span class="label-text">
        <div>
          <h1 class="text-2xl font-semibold text-black">{{ title }}</h1>
          <p class="text-gray-800 mt-2">
            {{ description }}
          </p>
        </div>
      </span>
      <input type="checkbox" class="checkbox checkbox-primary" />
    </label>
  </div>
</template>
