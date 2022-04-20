import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BlurView } from "expo-blur";
import styles from "../../screens/Home/HomeScreen.styles";
import { movieDetail } from "../../types";

const ModalView: React.FC<movieDetail> = ({
  movie,
  setState,
  setDeleted,
  setFav,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!movie.selected?.Title}
    >
      <BlurView intensity={12} style={styles.blurView}>
        <View style={styles.modalView}>
          <TouchableHighlight
            underlayColor={"transparent"}
            style={{ marginTop: 20 }}
            onPress={() =>
              setState((previousState) => {
                return { ...previousState, selected: {} };
              })
            }
          >
            <Ionicons
              style={styles.iconStyle}
              name="close"
              size={32}
              color="white"
            />
          </TouchableHighlight>
          <Text style={styles.resultTitle}>{movie.selected?.Title}</Text>
          <Image
            style={styles.insideImage}
            source={{ uri: movie.selected?.Poster }}
          />
          <Text style={styles.insidePlot}>{movie.selected?.Plot}</Text>
          <Text style={styles.insideRating}>
            IMDB Rating : {movie.selected?.imdbRating}
          </Text>
          <TouchableOpacity
            underlayColor={"transparent"}
            onPress={() =>
              movie.favorites.includes(movie.selected?.imdbID)
                ? alert("already added")
                : setFav()
            }
          >
            <View style={styles.watchlist}>
              <Text style={styles.buttonLabel}>Add To Watchlist</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={setDeleted} underlayColor={"transparent"}>
            <View style={styles.hideButton}>
              <Text style={styles.hideText}>Hide</Text>
              <Ionicons name="eye" size={20} color={"white"} />
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
};

export default ModalView;
