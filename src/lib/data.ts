export type AqiHistory = {
  date: string;
  aqi: number;
};

export const aqiHistoryData: AqiHistory[] = [
  { date: '7d ago', aqi: 75 },
  { date: '6d ago', aqi: 80 },
  { date: '5d ago', aqi: 70 },
  { date: '4d ago', aqi: 90 },
  { date: '3d ago', aqi: 110 },
  { date: '2d ago', aqi: 105 },
  { date: 'Yesterday', aqi: 120 },
  { date: 'Today', aqi: 151 },
];

// Tailwind classes for color-coding based on AQI levels.
// Using theme variables for consistency.
export const getAqiInfo = (aqi: number) => {
  if (aqi <= 50) return { level: 'Good', color: 'text-accent', bgColor: 'bg-accent/10' };
  if (aqi <= 100) return { level: 'Moderate', color: 'text-chart-1', bgColor: 'bg-chart-1/10' };
  if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'text-chart-2', bgColor: 'bg-chart-2/10' };
  if (aqi <= 200) return { level: 'Unhealthy', color: 'text-chart-3', bgColor: 'bg-chart-3/10' };
  if (aqi <= 300) return { level: 'Very Unhealthy', color: 'text-chart-4', bgColor: 'bg-chart-4/10' };
  return { level: 'Hazardous', color: 'text-chart-5', bgColor: 'bg-chart-5/10' };
};

export const healthAlerts = {
  good: 'Air quality is satisfactory, and air pollution poses little or no risk. It\'s a great day to be active outside.',
  moderate: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
  unhealthySensitive: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected. Limit prolonged outdoor exertion.',
  unhealthy: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects. Avoid prolonged outdoor exertion.',
  veryUnhealthy: 'Health alert: The risk of health effects is increased for everyone. Everyone should avoid all outdoor exertion.',
  hazardous: 'Health warning of emergency conditions: everyone is more likely to be affected. Everyone should avoid all physical activity outdoors.',
};

export const getHealthAlert = (aqi: number) => {
  if (aqi <= 50) return healthAlerts.good;
  if (aqi <= 100) return healthAlerts.moderate;
  if (aqi <= 150) return healthAlerts.unhealthySensitive;
  if (aqi <= 200) return healthAlerts.unhealthy;
  if (aqi <= 300) return healthAlerts.veryUnhealthy;
  return healthAlerts.hazardous;
};
