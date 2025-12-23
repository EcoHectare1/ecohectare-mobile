export interface IHectare {
  _id: string;
  hectare_code: string;
  status: "disponivel" | "apadrinhado";
  land_plot_id: {
    name: string;
  };
  value: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}
