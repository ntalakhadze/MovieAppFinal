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

import { movieDetail } from "../types";

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
const styles = StyleSheet.create({
  resultView: {
    shadowColor: "#000",
    borderRadius: 5,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    backgroundColor: "transparent",
    alignSelf: "center",
    marginHorizontal: 20,
  },
  insideImage: { width: 150, height: 200, alignSelf: "center" },
  blurView: { flex: 1 },
  iconStyle: { alignSelf: "flex-end", marginRight: 10 },

  resultTitle: {
    marginVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  resultPoster: {
    height: 300,
    width: 200,
    borderRadius: 8,
  },
  insidePlot: {
    maxWidth: 320,
    maxHeight: 80,
    alignSelf: "center",
    color: "white",
    marginTop: 10,
  },
  modalView: {
    flex: 0.75,
    backgroundColor: "#2D4356",
    marginTop: 120,
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
  },
  buttonContainer: {
    width: 100,
    height: 60,
    backgroundColor: "blue",
  },
  insideRating: {
    color: "yellow",
    marginTop: 10,
    alignSelf: "center",
  },
  watchlist: {
    height: 32,
    width: 120,
    backgroundColor: "#226F54",
    borderRadius: 48,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  buttonLabel: {
    alignSelf: "center",
    color: "white",
    fontSize: 12,
  },
  hideButton: {
    height: 32,
    width: 120,
    backgroundColor: "red",
    borderRadius: 48,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  hideText: {
    alignSelf: "center",
    color: "white",
    fontSize: 12,
    marginRight: 5,
  },
});

export default ModalView;
