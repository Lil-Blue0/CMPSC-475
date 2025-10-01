import { StyleSheet } from "react-native";

// Pokémon-inspired red color palette
export const Colors = {
  // Primary Pokédex red colors
  primaryRed: "#DC143C",
  lightRed: "#ffe3e3",
  darkRed: "#B22222",
  cherryRed: "#CD5C5C",

  // Background colors
  backgroundLight: "#fafafa",
  backgroundMedium: "#FFE4E4",
  cardBackground: "#FFFFFF",

  // Text colors
  textPrimary: "#2c3e50",
  textSecondary: "#3c3c3c",
  textLight: "#A0522D",
  textWhite: "#FFFFFF",

  // Accent colors
  gold: "#FFD700",
  silver: "#C0C0C0",
  shadow: "#000000",

  // Status colors
  success: "#32CD32",
  warning: "#FFA500",
  error: "#FF4444",
};

// Shared component styles
export const SharedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: 5,
    paddingTop: 20,
  },

  centeredContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },

  placeholder: {
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 15,
  },

  subtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },

  // Card styles
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.backgroundMedium,
  },

  // List styles
  listContainer: {
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },

  // Loading styles
  loadingFooter: {
    paddingVertical: 20,
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textSecondary,
    fontStyle: "italic",
  },

  // Feature list styles
  featureList: {
    alignSelf: "stretch",
    backgroundColor: Colors.backgroundMedium,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryRed,
  },

  feature: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginVertical: 2,
  },
});

// Header styles for navigation
export const HeaderStyles = {
  headerStyle: {
    backgroundColor: Colors.darkRed,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTintColor: Colors.textWhite,
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
  },
};

// Drawer styles for navigation
export const DrawerStyles = {
  drawerStyle: {
    backgroundColor: Colors.backgroundLight,
    width: 280,
  },
  drawerActiveTintColor: Colors.primaryRed,
  drawerInactiveTintColor: Colors.textSecondary,
  drawerLabelStyle: {
    fontSize: 16,
    fontWeight: "500",
  },
};
