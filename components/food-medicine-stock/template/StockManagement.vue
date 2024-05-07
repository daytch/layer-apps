<script setup lang="ts">
import type { FoodMedicineStock } from "~/types/food-medicine-stock";
import { TOAST_SUCCESS_UI } from "~/constants/ui";

const toast = useToast();

const DUMMY_DATA = ref<Array<FoodMedicineStock>>([
  {
    id: "1",
    itemID: "G10000000851",
    cageName: "Kandang Jatisari",
    itemName: "Stres Block",
    pricePerItem: 50000,
    quantityItem: 10,
    createdDate: new Date(),
  },
  {
    id: "2",
    itemID: "G10000000851",
    cageName: "Kandang Jatisari",
    itemName: "Stres Block",
    pricePerItem: 50000,
    quantityItem: 10,
    createdDate: new Date(),
  },
]);
const { showFormModal } = useFoodMedicineStockForm();

const handleAddStock = (newStock: Omit<FoodMedicineStock, "id">) => {
  const addedStock = {
    ...newStock,
    id: (DUMMY_DATA.value.length + 1).toString(),
  };
  toast.add({
    icon: "i-heroicons-check-circle-16-solid",
    title: "Data berhasil ditambahkan",
    ui: {
      ...TOAST_SUCCESS_UI,
    },
  });
  DUMMY_DATA.value.push(addedStock);
};
</script>

<template>
  <FoodMedicineTableFilter
    :show-add-button="true"
    :add-button-text="'Tambah Data'"
    @handle-add-data="showFormModal = true"
  />
  <FoodMedicineStockTable :items="DUMMY_DATA" />
  <FoodMedicineModalForm @handle-add-stock="handleAddStock" />
</template>
