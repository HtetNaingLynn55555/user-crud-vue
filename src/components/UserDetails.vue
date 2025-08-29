<template>
  <div
    class="bg-black min-h-screen text-white flex flex-col items-center pt-8 px-2 md:px-0"
  >
    <div class="w-full max-w-lg bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold mb-4">User Details</h2>
      <div v-if="user">
        <div class="mb-2">
          <span class="font-semibold">Name:</span> {{ user.name }}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Email:</span> {{ user.email }}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Phone:</span> {{ user.phone }}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Password:</span> {{ user.password }}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Created At:</span>
          {{ formatDate(user.createdAt) }}
        </div>
        <div class="mb-2">
          <span class="font-semibold">Updated At:</span>
          {{ formatDate(user.updatedAt) }}
        </div>
        <div class="flex gap-2 mt-8 flex-col sm:flex-row">
          <button
            @click="goBack"
            class="w-full sm:w-auto text-white bg-blue-700 hover:bg-blue-800 font-medium rounded px-3 py-1"
          >
            Back
          </button>
          <button
            @click="openEditModal"
            class="w-full sm:w-auto text-white bg-blue-700 hover:bg-blue-800 font-medium rounded px-3 py-1"
          >
            Edit
          </button>
        </div>
      </div>
      <div v-else class="text-center">Loading...</div>
    </div>
    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 px-2"
    >
      <div class="relative p-4 w-full max-w-md h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex justify-between items-center p-4 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Edit User
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="closeEditModal"
            >
              <span class="material-icons">close</span>
            </button>
          </div>
          <form class="p-4" @submit.prevent="updateUser">
            <div class="mb-4">
              <label
                for="editName"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Name</label
              >
              <input
                type="text"
                id="editName"
                v-model="editForm.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="editEmail"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Email</label
              >
              <input
                type="email"
                id="editEmail"
                v-model="editForm.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="editPhone"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Phone</label
              >
              <input
                type="text"
                id="editPhone"
                v-model="editForm.phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="editPassword"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                type="text"
                id="editPassword"
                v-model="editForm.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const user = ref(null);
const showEditModal = ref(false);
const editForm = reactive({ name: "", email: "", phone: "", password: "" });

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

async function fetchUser() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/${route.params.id}`
    );
    if (!res.ok) throw new Error("Failed to fetch user");
    user.value = await res.json();
  } catch (err) {
    console.error(err);
  }
}

function goBack() {
  router.push("/");
}

function openEditModal() {
  if (!user.value) return;
  editForm.name = user.value.name;
  editForm.email = user.value.email;
  editForm.phone = user.value.phone;
  editForm.password = user.value.password;
  showEditModal.value = true;
}

function closeEditModal() {
  showEditModal.value = false;
}

async function updateUser() {
  // Simple validation
  if (!editForm.name.trim()) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Name is required.",
    });
    return;
  }
  if (!editForm.email.trim() || !/^\S+@\S+\.\S+$/.test(editForm.email)) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Valid email is required.",
    });
    return;
  }
  if (
    !String(editForm.phone).trim() ||
    String(editForm.phone).trim().length < 7
  ) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Phone must be at least 7 digits.",
    });
    return;
  }
  if (!editForm.password || editForm.password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Validation Error",
      text: "Password must be at least 6 characters.",
    });
    return;
  }
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/${route.params.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      }
    );
    if (!res.ok) throw new Error("Failed to update user");
    await fetchUser();
    closeEditModal();
    await Swal.fire({
      icon: "success",
      title: "User Updated!",
      text: "User has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.fire({ icon: "error", title: "Error", text: err.message });
  }
}

onMounted(fetchUser);
</script>

<style></style>
