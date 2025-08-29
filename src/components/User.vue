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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";

const users = ref([]);

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
