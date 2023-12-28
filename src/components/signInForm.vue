<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'signInForm'
});

</script>

<template>

    <div class="text-wrapper text-white" >
      <h1 class="text-2xl">Volcano Quiz</h1>
      <p>Please sign in to see if you are smart enough to be a Volcanologist?</p>
      <div>
        <form action="" class="flex flex-col ">
          <label class="text-xl" for="username">username</label>
          <input class="rounded-sm" type="text" id="username" name="username" />
          <label class="mt-2 text-xl" for="password">password</label>
          <input class="rounded" type="text" id="password" name="password" />
          <input class="rounded text-xl mt-3 bg-brown-500" type="submit" value="submit" />
        </form>
      </div>
      <div>
        <button>Create Account</button>
      </div>
    </div>
  
</template>