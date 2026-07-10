export interface ResourceConfig {
  key: string;
  title: string;
  table: string;

  columns: {
    key: string;
    label: string;
    type?: string;
  }[];

  form: {
    key: string;
    label: string;
    type?: string;
    required?: boolean;
  }[];
}
