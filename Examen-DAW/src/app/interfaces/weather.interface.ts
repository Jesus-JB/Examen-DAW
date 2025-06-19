export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastResponse {
  list: ForecastItem[];
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
}