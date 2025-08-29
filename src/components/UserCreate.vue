<template>
  <div class="bg-black h-dvh pt-2 text-2xl font-popin">
    <form class="max-w-sm mx-auto">
      <div class="mt-4">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >Name</label
        >
        <input
          type="text"
          id="name"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div class="mt-4">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >Email</label
        >
        <input
          type="text"
          id="email"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>

      <div class="mt-4">
        <label
          for="phone"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >phone</label
        >
        <input
          type="number"
          id="phone"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your phone number"
        />
      </div>

      <div class="mt-4">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >password</label
        >
        <input
          type="text"
          id="password"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        class="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create new user
      </button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
