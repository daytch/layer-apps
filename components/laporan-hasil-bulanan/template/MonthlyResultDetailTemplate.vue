<script setup lang="ts"></script>

<template>
  <div class="w-full p-6 border border-[--app-gray-500] bg-white rounded-lg">
    <div class="w-full overflow-x-auto">
      <table class="w-full">
        <tr>
          <th class="w-44 py-1">ID Pelanggan</th>
          <td>100000000921</td>
        </tr>
        <tr>
          <th class="w-44 py-1">Nama Kandang</th>
          <td>Kandang Jatisari</td>
        </tr>
        <tr>
          <th class="w-44 py-1">Alamat</th>
          <td>-</td>
        </tr>
      </table>
    </div>
    <div class="w-full max-w-[775px]">
      <div class="w-full overflow-x-auto result-table">
        <table class="w-full">
          <thead>
            <tr>
              <th></th>
              <th>Jumlah</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Saldo Awal Bulan</th>
              <td>-</td>
              <td>Rp11.194.800</td>
            </tr>
            <tr>
              <th>Pengambilan</th>
              <td>Rp42.232.700</td>
              <td>Rp42.232.700</td>
            </tr>
            <tr>
              <th>Pembayaran</th>
              <td>Rp42.232.700</td>
              <td>Rp42.232.700</td>
            </tr>
            <tr>
              <th>Koreksi*</th>
              <td>Rp42.232.700</td>
              <td>Rp42.232.700</td>
            </tr>
            <tr>
              <th>Saldo Akhir Bulan</th>
              <td></td>
              <td>Rp42.232.700</td>
            </tr>
            <tr>
              <th>Check</th>
              <td></td>
              <td>Rp42.232.700</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
table th {
  @apply text-left text-sm font-normal leading-[22px] text-[--app-dark-100] whitespace-nowrap;
}
table td {
  @apply text-left py-1 text-sm font-normal leading-[22px] text-[--app-dark-100];
}
.result-table td,
.result-table th {
  @apply p-4;
}
.result-table tbody tr {
  @apply border-b border-[--app-gray-500];
}
</style>
