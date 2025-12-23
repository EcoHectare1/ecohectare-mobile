export interface MetaDataPage {
  total: number;
  available: number;
  sponsored: number;
  page: number | string;
  limit: string | number;
}

export type Page<Data> = MetaDataPage & {
  data: Data[];
};
