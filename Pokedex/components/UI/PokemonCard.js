import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Colors, SharedStyles } from "../../styles/SharedStyles";
import { getTypeColor } from "../../utils/typeColors";
import { getTypeIconName } from "../../utils/typeIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const PokemonCard = ({ pokemon, onPress }) => {
  const handlePress = () => onPress && onPress(pokemon);

  const primaryType =
    Array.isArray(pokemon.types) && pokemon.types.length > 0
      ? pokemon.types[0]
      : undefined;
  const cardColor = getTypeColor(primaryType);

  // Choose badge (icon background) color for best contrast with the icon color
  const getBadgeBgForIcon = (iconHexColor) => {
    if (!iconHexColor) return "rgba(255,255,255,0.96)";
    const hex = iconHexColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // relative luminance approximation [0..255]
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    // If the icon color is very light (e.g., yellow), use a dark badge; else use white badge
    return luminance > 200 ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.96)";
  };

  return (
    <TouchableOpacity
      style={[
        SharedStyles.card,
        styles.pokemonCard,
        { backgroundColor: cardColor, borderColor: cardColor },
      ]}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      {/* Watermark */}
      <MaterialCommunityIcons
        name="pokeball"
        size={84}
        color={Colors.textWhite}
        style={styles.watermark}
      />

      {/* Image on right */}
      <View style={styles.imageSlot}>
        {pokemon.image_url || pokemon.image ? (
          <Image
            source={{ uri: pokemon.image_url || pokemon.image }}
            style={styles.pokemonImage}
            contentFit="contain"
            cachePolicy="disk"
            transition={120}
          />
        ) : (
          <View style={styles.imageFallback}>
            <Text style={styles.pokemonNumber}>
              #{pokemon.id?.toString().padStart(3, "0") || "???"}
            </Text>
          </View>
        )}
      </View>

      {/* Info on left */}
      <View style={styles.infoColumn}>
        <Text style={styles.pokemonName} numberOfLines={1}>
          {pokemon.name || "Unknown"}
        </Text>
        <Text style={styles.pokemonId}>
          #{pokemon.id?.toString().padStart(3, "0") || "???"}
        </Text>
      </View>

      {/* Types icons-only bottom-left with colored icons on contrasting badges */}
      <View style={styles.typesOverlay}>
        {pokemon.types && pokemon.types.length > 0 ? (
          pokemon.types.map((type, index) => {
            const iconName = getTypeIconName(type);
            const iconColor = getTypeColor(type);
            const badgeBg = getBadgeBgForIcon(iconColor);
            return (
              <View
                key={index}
                style={[styles.typeBadge, { backgroundColor: badgeBg }]}
              >
                <MaterialCommunityIcons
                  name={iconName}
                  size={20}
                  color={iconColor || Colors.textWhite}
                />
              </View>
            );
          })
        ) : (
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: "rgba(255,255,255,0.96)" },
            ]}
          >
            <MaterialCommunityIcons
              name="help-circle"
              size={20}
              color={"#999"}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pokemonCard: {
    width: "48%",
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    padding: 12,
  },
  watermark: {
    position: "absolute",
    right: -10,
    top: -6,
    opacity: 0.15,
  },
  imageSlot: {
    position: "absolute",
    right: -6,
    bottom: -6,
    width: 105,
    height: 105,
  },
  pokemonImage: {
    width: "100%",
    height: "100%",
  },
  imageFallback: {
    width: "100%",
    height: "100%",
    borderRadius: 52,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 2,
    borderColor: Colors.textWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonNumber: {
    fontSize: 13,
    fontWeight: "bold",
    color: Colors.textWhite,
  },
  infoColumn: {
    flex: 1,
    maxWidth: "70%",
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textWhite,
    textAlign: "left",
    marginBottom: 2,
    textTransform: "capitalize",
  },
  pokemonId: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
  },
  typesOverlay: {
    position: "absolute",
    left: 12,
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  typeBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
});

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.pokemon?.id === nextProps.pokemon?.id &&
    prevProps.pokemon?.name === nextProps.pokemon?.name &&
    prevProps.pokemon?.image === nextProps.pokemon?.image &&
    JSON.stringify(prevProps.pokemon?.types) ===
      JSON.stringify(nextProps.pokemon?.types)
  );
};

export default memo(PokemonCard, areEqual);
