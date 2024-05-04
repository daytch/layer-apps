import type { NitroFetchRequest, $Fetch } from "nitropack";

export type FetchType<T> = $Fetch<T, NitroFetchRequest>;
