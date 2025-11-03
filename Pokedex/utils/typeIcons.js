// Maps Pokemon types to MaterialCommunityIcons names
export const getTypeIconName = (type) => {
  const t = type?.toLowerCase?.();
  switch (t) {
    case "fire":
      return "fire";
    case "water":
      return "water";
    case "electric":
      return "lightning-bolt";
    case "grass":
      return "leaf";
    case "ice":
      return "snowflake";
    case "fighting":
      return "boxing-glove";
    case "poison":
      return "biohazard";
    case "ground":
      return "terrain";
    case "flying":
      return "feather";
    case "psychic":
      return "brain";
    case "bug":
      return "ladybug";
    case "rock":
      return "diamond-stone";
    case "ghost":
      return "ghost";
    case "dragon":
      return "sword";
    case "dark":
      return "weather-night";
    case "steel":
      return "cog-outline";
    case "fairy":
      return "magic-staff";
    case "normal":
    default:
      return "circle-outline";
  }
};
