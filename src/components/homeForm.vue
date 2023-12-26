<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'homeForm'
});

</script>

<template>

    <div class="text-wrapper text-white" >
      <h1 class="text-2xl">volcano quiz</h1>
      <p>please sign in to see if you are smart enough to be a volcanologist?</p>
      <div>
        <form action="" class="flex flex-col ">
          <label class="text-xl" for="username">username</label>
          <input class="rounded-sm" type="text" id="username" name="username" />
          <label class="mt-2 text-xl" for="password">password</label>
          <input class="rounded" type="text" id="password" name="password" />
          <input class="rounded text-xl mt-3 bg-brown-500" type="submit" value="submit" />
        </form>
      </div>
    </div>
  
</template>