<template>
  <div class="bg-black h-dvh pt-2 text-2xl font-popin">
    <form class="max-w-sm mx-auto" @submit.prevent="handleSubmit">
      <div class="mt-4">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="form.name"
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
          type="email"
          id="email"
          v-model="form.email"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div class="mt-4">
        <label
          for="phone"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >Phone</label
        >
        <input
          type="text"
          id="phone"
          v-model="form.phone"
          class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your phone number"
        />
      </div>
      <div class="mt-4">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >Password</label
        >
        <input
          type="password"
          id="password"
          v-model="form.password"
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

<script setup>
import { reactive } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
});

function validateForm() {
  if (!form.name.trim()) return "Name is required.";
  if (!form.email.trim()) return "Email is required.";
  // Simple email regex
  if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Email is invalid.";
  if (!form.phone.trim() || form.phone.trim().length < 7)
    return "Phone is required and must be at least 7 digits.";
  if (!form.password || form.password.length < 6)
    return "Password must be at least 6 characters.";
  return "";
}

async function handleSubmit() {
  const error = validateForm();
  if (error) {
    Swal.fire({ icon: "error", title: "Validation Error", text: error });
    return;
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error("Failed to create user");
    await Swal.fire({
      icon: "success",
      title: "User Created!",
      text: "User has been created successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
    // Optionally, reset form
    form.name = "";
    form.email = "";
    form.phone = "";
    form.password = "";
    router.push("/");
  } catch (err) {
    Swal.fire({ icon: "error", title: "Error", text: err.message });
  }
}
</script>

<style></style>
