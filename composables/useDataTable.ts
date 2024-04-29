const HeaderVisibleToogleColumn = [
  {
    key: "date",
    label: "Tanggal",
  },
  {
    key: "age_day",
    label: "Umur (Hr)",
  },
  {
    key: "age_week",
    label: "Umur (Mgg)",
  },
  {
    key: "pop",
    label: "POP",
  },
  {
    key: "m",
    label: "M",
  },
  {
    key: "afk",
    label: "AFK",
  },
  {
    key: "sell",
    label: "Jual",
  },
  {
    key: "last_pop",
    label: "Pop Akhir",
  },
];

const COLUMN_KEY = [
  "date",
  "age_day",
  "age_week",
  "pop",
  "m",
  "afk",
  "sell",
  "last_pop",
] as const;

function _useDataTable() {
  const visibleColumns = ref([
    "date",
    "age_day",
    "age_week",
    "pop",
    "m",
    "afk",
    "sell",
    "last_pop",
  ]);
  const isUpdateView = ref(false);

  const checkVisibleColumn = computed(() => {
    return (key: (typeof COLUMN_KEY)[number]) =>
      visibleColumns.value.includes(key);
  });

  const checkAll = computed({
    get() {
      return visibleColumns.value.length === COLUMN_KEY.length;
    },
    set() {
      const isAllChecked = visibleColumns.value.length === COLUMN_KEY.length;
      visibleColumns.value = isAllChecked ? [] : (COLUMN_KEY as any);
    },
  });

  return {
    visibleColumns,
    HeaderVisibleToogleColumn,
    checkAll,
    checkVisibleColumn,
    isUpdateView,
  };
}

export const useDataTable = createSharedComposable(_useDataTable);
