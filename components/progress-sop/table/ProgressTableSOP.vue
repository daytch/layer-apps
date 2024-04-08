<template>
  <div class="w-full overflow-auto mt-6">
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="py-[18px] px-4 text-base leading-6 font-medium text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            Nama
          </th>
          <th
            class="py-[18px] px-4 text-sm leading-[22px] font-normal text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            <div class="line-clamp-2">
              Cek sampling ayam (ayam ngorok, cekrek, sakit dll)
            </div>
          </th>
          <th
            class="py-[18px] px-4 text-sm leading-[22px] font-normal text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            <div class="line-clamp-2">
              Cek keberishan pipa minum (kebersihan dan kondisi pipa)
            </div>
          </th>
          <th
            class="py-[18px] px-4 text-sm leading-[22px] font-normal text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            <div class="line-clamp-2">
              Cek pipa makanan (ketebalan makanan & keberihan)
            </div>
          </th>
          <th
            class="py-[18px] px-4 text-sm leading-[22px] font-normal text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            <div class="line-clamp-2">Cek stock pakan dan obat-obatan</div>
          </th>
          <th
            class="py-[18px] px-4 text-sm leading-[22px] font-normal text-[--app-dark-900] bg-[--app-gray-100] text-left"
          >
            <div class="line-clamp-2">Cek sanitasi air dan filter air</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-b-[--app-gray-500]"
          v-for="(name, index) in [
            'AHMAD ROZIKIN',
            'SOLIHIN',
            'RIDWAN',
            'SETIANTO',
            'MANDOR 1',
            'MANDOR 2',
          ]"
        >
          <td class="text-left whitespace-nowrap p-4 bg-white uppercase">
            {{ name }}
          </td>
          <td class="p-4 bg-white text-center">
            <UIcon
              v-if="index % 2 === 0"
              name="i-heroicons-check-circle"
              class="w-6 h-6 text-[#3758F9]"
            />
            <UIcon
              v-else
              name="i-heroicons-x-circle"
              class="w-6 h-6 text-[--app-danger-300]"
            />
          </td>
          <td class="p-4 bg-white text-center">
            <UIcon
              v-if="index % 2 === 0"
              name="i-heroicons-check-circle"
              class="w-6 h-6 text-[#3758F9]"
            />
            <UIcon
              v-else
              name="i-heroicons-x-circle"
              class="w-6 h-6 text-[--app-danger-300]"
            />
          </td>
          <td class="p-4 bg-white text-center">
            <UIcon
              v-if="index % 2 === 0"
              name="i-heroicons-check-circle"
              class="w-6 h-6 text-[#3758F9]"
            />
            <UIcon
              v-else
              name="i-heroicons-x-circle"
              class="w-6 h-6 text-[--app-danger-300]"
            />
          </td>
          <td class="p-4 bg-white text-center">
            <UIcon
              v-if="index % 2 === 0"
              name="i-heroicons-check-circle"
              class="w-6 h-6 text-[#3758F9]"
            />
            <UIcon
              v-else
              name="i-heroicons-x-circle"
              class="w-6 h-6 text-[--app-danger-300]"
            />
          </td>
          <td class="p-4 bg-white text-center">
            <UIcon
              v-if="index % 2 === 0"
              name="i-heroicons-check-circle"
              class="w-6 h-6 text-[#3758F9]"
            />
            <UIcon
              v-else
              name="i-heroicons-x-circle"
              class="w-6 h-6 text-[--app-danger-300]"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
