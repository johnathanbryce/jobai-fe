export const getLabelColors = (label: string) => {
  let colour = "#CCCCCC";

  switch (label.toLowerCase()) {
    case "intern":
      colour = "#B388FF"; // Light Purple
      break;
    case "junior":
      colour = "#82B1FF"; // Light Blue
      break;
    case "mid-level":
      colour = "#C75D32"; // Burnt Sienna (Avoids clash with In Person)
      break;
    case "senior":
      colour = "#EF5350"; // Strong Red
      break;
    case "in person":
      colour = "#FF8F00"; // Dark Amber
      break;
    case "on-site":
      colour = "#FF8F00"; // Dark Amber
      break;
    case "hybrid remote":
      colour = "#00796B"; // Deep Teal
      break;
    case "hybrid":
      colour = "#00897B"; // Muted Cyan-Green
      break;
    case "remote":
      colour = "#00BFA5"; // Deep Aqua
      break;
    default:
      colour = "#CCCCCC"; // Default Grey
  }

  return colour;
};
