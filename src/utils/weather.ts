import { WeatherDataMDP } from '../types';

export async function fetchMDPWeather(): Promise<WeatherDataMDP> {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-38.0055&longitude=-57.5426&current=temperature_2m,precipitation,wind_speed_10m,weather_code&daily=precipitation_probability_max,wind_speed_10m_max&timezone=America%2FArgentina%2FBuenos_Aires';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al consultar clima');
    const data = await res.json();

    const temp = Math.round(data.current?.temperature_2m ?? 17);
    const viento = Math.round(data.current?.wind_speed_10m ?? 24);
    const probLluvia = data.daily?.precipitation_probability_max?.[0] ?? 10;
    const precip = data.current?.precipitation ?? 0;

    let desc = 'Condiciones estables en la costa';
    let esAlerta = false;
    let alertaMotivo = '';

    if (precip > 0 || probLluvia > 65) {
      desc = 'Probabilidad alta de precipitaciones en Mar del Plata';
      esAlerta = true;
      alertaMotivo = 'Lluvia inminente en zona costa. Recomendado pasar a Zoom o entrenamiento en casa.';
    } else if (viento > 40) {
      desc = 'Fuertes ráfagas de viento del Atlántico';
      esAlerta = true;
      alertaMotivo = `Viento costero de ${viento} km/h. Sugerir reparo o modalidad Zoom.`;
    } else if (temp < 8) {
      desc = 'Baja temperatura matutina';
      esAlerta = false;
    } else {
      desc = 'Clima ideal para trotar al aire libre';
    }

    return {
      temperatura: temp,
      vientoKmH: viento,
      probabilidadLluvia: probLluvia,
      descripcion: desc,
      esAlertaClima: esAlerta,
      alertaMotivo,
      horaActualizacion: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    };
  } catch {
    // Fallback realista para Mar del Plata
    return {
      temperatura: 16,
      vientoKmH: 26,
      probabilidadLluvia: 20,
      descripcion: 'Brisa marina típica en Mar del Plata. Bueno para trote costero.',
      esAlertaClima: false,
      horaActualizacion: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    };
  }
}

export function getMockSudestadaMDP(): WeatherDataMDP {
  return {
    temperatura: 11,
    vientoKmH: 48,
    probabilidadLluvia: 85,
    descripcion: 'Sudestada con lloviznas y viento intenso en la costa',
    esAlertaClima: true,
    alertaMotivo: 'Alerta meteorológica en costa MDP: Viento 48 km/h y 85% lluvia. Conviene pasar a Zoom.',
    horaActualizacion: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
  };
}
