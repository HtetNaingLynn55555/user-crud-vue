<template>
  <div
    class="font-popin bg-black text-2xl text-white h-dvh flex flex-col justify-start gap-5 pt-2 items-center"
  >
    User List
    <div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">name</th>
              <th scope="col" class="px-6 py-3">email</th>
              <th scope="col" class="px-6 py-3">phone</th>
              <th scope="col" class="px-6 py-3">create time</th>
              <th scope="col" class="px-6 py-3">update time</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
              class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ user.name }}
              </th>
              <td class="px-6 py-4">{{ user.email }}</td>
              <td class="px-6 py-4">{{ user.phone }}</td>
              <td class="px-6 py-4">{{ formatDate(user.createdAt) }}</td>
              <td class="px-6 py-4">{{ formatDate(user.updatedAt) }}</td>
              <td class="px-6 py-4">
                <a
                  href="#"
                  class="font-medium text-blue-600 px-1 dark:text-blue-500 hover:underline"
                  @click.prevent="openEditModal(user)"
                  >Edit</a
                >
                <a
                  href="#"
                  class="font-medium text-blue-600 px-1 dark:text-blue-500 hover:underline"
                  @click.prevent="deleteUser(user._id)"
                  >Delete</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div
      v-if="showEditModal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
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
            <div class="flex justify-end">
              <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
import Swal from "sweetalert2";

const users = ref([]);
const showEditModal = ref(false);
const editForm = reactive({ id: "", name: "", email: "", phone: "" });

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

function openEditModal(user) {
  editForm.id = user._id || user.id;
  editForm.name = user.name;
  editForm.email = user.email;
  editForm.phone = user.phone;
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
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/${editForm.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          phone: editForm.phone,
        }),
      }
    );
    if (!res.ok) throw new Error("Failed to update user");
    await fetchUsers();
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

async function fetchUsers() {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`);
    if (!res.ok) throw new Error("Failed to fetch users");
    users.value = await res.json();
  } catch (err) {
    console.error(err);
  }
}

async function deleteUser(id) {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (!result.isConfirmed) return;
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete user");
    await fetchUsers();
    await Swal.fire({
      title: "Deleted!",
      text: "User has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Error deleting user", "error");
  }
}

onMounted(fetchUsers);
</script>

<style></style>
