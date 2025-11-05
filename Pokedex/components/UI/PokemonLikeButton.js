import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite,
} from "../../store/favoritesSlice";
import { Colors } from "../../styles/SharedStyles";

const PokemonLikeButton = ({ pokemon }) => {
  const dispatch = useDispatch();

  // Early return if pokemon or pokemon.id is not available
  if (!pokemon || !pokemon.id) {
    return null;
  }

  const isLiked = useSelector(selectIsFavorite(pokemon.id));

  const toggleLike = () => {
    if (isLiked) {
      dispatch(removeFavorite(pokemon.id));
    } else {
      dispatch(addFavorite(pokemon.id));
    }
  };

  return (
    <TouchableOpacity
      style={{
        marginRight: 16,
        padding: 4,
      }}
      onPress={toggleLike}
    >
      <MaterialCommunityIcons
        name={isLiked ? "heart" : "heart-outline"}
        size={24}
        color={isLiked ? "#FF6B6B" : Colors.textWhite}
      />
    </TouchableOpacity>
  );
};

export default PokemonLikeButton;
