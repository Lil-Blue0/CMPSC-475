import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import PokemonCard from "./UI/PokemonCard";
import pokemonData from "../data/pokemon.json";
import { Colors, SharedStyles } from "../styles/SharedStyles";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TYPE_COLORS, getTypeColor } from "../utils/typeColors";
import { getTypeIconName } from "../utils/typeIcons";

const Pokedex = ({ navigation }) => {
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const ITEMS_PER_PAGE = 20;

  // Load initial data
  useEffect(() => {
    loadMorePokemon();
  }, []);

  const loadMorePokemon = useCallback(() => {
    if (loading) return;
    setLoading(true);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const newSlice = pokemonData.slice(startIndex, endIndex);
    setDisplayedPokemon((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const deduped = newSlice.filter((p) => !existingIds.has(p.id));
      return deduped.length ? [...prev, ...deduped] : prev;
    });
    setCurrentPage((prev) => prev + 1);
    setLoading(false);
  }, [loading, currentPage]);

  const handlePokemonPress = useCallback(
    (pokemon) => {
      // Find the full pokemon data from the original dataset
      const fullPokemonData = pokemonData.find((p) => p.id === pokemon.id);

      navigation.navigate("PokemonDetail", {
        pokemon: fullPokemonData || pokemon,
      });
    },
    [navigation]
  );

  // Filtered list when searching and/or filtering by type
  const filteredPokemon = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const hasQuery = q.length > 0;
    const hasTypes = selectedTypes.length > 0;
    if (!hasQuery && !hasTypes) return [];
    return pokemonData.filter((p) => {
      const nameMatch = hasQuery ? p.name?.toLowerCase().includes(q) : true;
      const idStr = p.id?.toString().padStart(3, "0");
      const idMatch = hasQuery ? idStr?.includes(q) : true;
      const queryTypeMatch = hasQuery
        ? Array.isArray(p.types) &&
          p.types.some((t) => t?.toLowerCase().includes(q))
        : true;
      const filterTypeMatch = hasTypes
        ? Array.isArray(p.types) &&
          p.types.some((t) => selectedTypes.includes(t?.toLowerCase()))
        : true;
      return (nameMatch || idMatch || queryTypeMatch) && filterTypeMatch;
    });
  }, [searchQuery, selectedTypes]);

  const listData =
    searchQuery.trim() || selectedTypes.length
      ? filteredPokemon
      : displayedPokemon;

  // Ensure unique IDs in the data fed to FlatList (safety net)
  const uniqueListData = useMemo(() => {
    const seen = new Set();
    return listData.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [listData]);

  const renderPokemonItem = useCallback(
    ({ item }) => (
      <PokemonCard
        pokemon={{
          id: item.id,
          name: item.name,
          types: item.types,
          image: item.image_url,
        }}
        onPress={handlePokemonPress}
      />
    ),
    [handlePokemonPress]
  );

  const renderFooter = useCallback(() => {
    if (!loading) return null;

    return (
      <View style={SharedStyles.loadingFooter}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
        <Text style={SharedStyles.loadingText}>Loading more Pokémon...</Text>
      </View>
    );
  }, [loading]);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const handleEndReached = useCallback(() => {
    if (!searchQuery && selectedTypes.length === 0 && !loading) {
      loadMorePokemon();
    }
  }, [searchQuery, selectedTypes, loading, loadMorePokemon]);

  const toggleFilterOpen = useCallback(() => setFilterOpen((o) => !o), []);
  const toggleType = useCallback((typeKey) => {
    setSelectedTypes((prev) => {
      const k = typeKey.toLowerCase();
      return prev.includes(k) ? prev.filter((t) => t !== k) : [...prev, k];
    });
  }, []);
  const clearTypes = useCallback(() => setSelectedTypes([]), []);

  return (
    <View style={SharedStyles.container}>
      {/* Search Bar with Filter Icon */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            placeholderTextColor={Colors.textSecondary}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.filterButtonWrap}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={24}
            color={
              selectedTypes.length ? Colors.primaryRed : Colors.textSecondary
            }
            onPress={toggleFilterOpen}
          />
        </View>
      </View>

      {filterOpen && (
        <View style={styles.filterPanel}>
          <View style={styles.typesWrap}>
            {Object.keys(TYPE_COLORS).map((typeKey) => {
              const keyLower = typeKey.toLowerCase();
              const selected = selectedTypes.includes(keyLower);
              const bg = getTypeColor(typeKey);
              const iconName = getTypeIconName(typeKey);
              return (
                <View
                  key={typeKey}
                  style={[styles.iconChip, selected && styles.iconChipSelected]}
                >
                  <MaterialCommunityIcons
                    name={iconName}
                    size={20}
                    color={bg}
                    onPress={() => toggleType(typeKey)}
                    style={styles.iconCentered}
                  />
                </View>
              );
            })}
          </View>
          {selectedTypes.length > 0 && (
            <Text onPress={clearTypes} style={styles.clearTypes}>
              Clear types
            </Text>
          )}
        </View>
      )}
      {/* Spacer between search/filter and list */}
      <View style={styles.topSpacer} />
      <FlatList
        data={uniqueListData}
        renderItem={renderPokemonItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={SharedStyles.listContainer}
        columnWrapperStyle={SharedStyles.row}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={20}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * Math.floor(index / 2),
          index,
        })}
        ListEmptyComponent={
          searchQuery || selectedTypes.length ? (
            <View style={SharedStyles.loadingFooter}>
              <Text style={SharedStyles.loadingText}>No Pokémon found.</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 8,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: Colors.backgroundLight,
    borderColor: "#6a6a6a",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  filterButtonWrap: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#6a6a6a",
    backgroundColor: Colors.backgroundLight,
  },
  filterPanel: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 10,
  },
  topSpacer: {
    height: 20,
  },
  typesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: "#6a6a6a",
  },
  iconChipSelected: {
    borderWidth: 2,
    borderColor: Colors.primaryRed,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconCentered: {
    textAlign: "center",
  },
  clearTypes: {
    marginTop: 8,
    color: Colors.primaryRed,
    fontWeight: "700",
  },
});

export default Pokedex;
