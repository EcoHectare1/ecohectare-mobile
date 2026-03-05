export interface PointCoordinates {
  lat: number;
  lng: number;
}

export interface PolygonLocation {
  type: string;
  coordinates: number[][][];
}

export interface LandPlot {
  location: PolygonLocation;
  _id: string;
  __v: number;
  name: string;
}

export interface IHectare {
  coordinates: PointCoordinates;
  _id: string;
  hectare_code: string;
  __v: number;
  land_plot_id: LandPlot;
  status: string; // e.g., "disponivel"
  value: number;
}

export interface PolygonPoint {
  latitude: number;
  longitude: number;
}

export interface IHectareFull extends IHectare {
  polygon: PolygonPoint[];
}
