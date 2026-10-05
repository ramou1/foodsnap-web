export function formatTimeAgo(timestamp?: string) {
  if (!timestamp) return "Recentemente";

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Recentemente";

  const diffSec = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  const steps = [
    { limit: 60, div: 1, singular: "segundo", plural: "segundos" },
    { limit: 3600, div: 60, singular: "minuto", plural: "minutos" },
    { limit: 86400, div: 3600, singular: "hora", plural: "horas" },
    { limit: 2592000, div: 86400, singular: "dia", plural: "dias" },
    { limit: 31536000, div: 2592000, singular: "mês", plural: "meses" },
  ];

  for (const step of steps) {
    if (diffSec < step.limit) {
      const value = Math.max(1, Math.floor(diffSec / step.div));
      return `há ${value} ${value === 1 ? step.singular : step.plural}`;
    }
  }

  const years = Math.max(1, Math.floor(diffSec / 31536000));
  return `há ${years} ${years === 1 ? "ano" : "anos"}`;
}
