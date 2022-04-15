import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import envs from "../../env";
import ModalView from "../components/modal";
import { State, Movie } from "../types";

const HomeScreen: React.FC = () => {
  const { API_URL } = envs;
  const netInfo = useNetInfo();

  const [state, setState] = useState<State>({
    search: "",
    results: [],
    selected: {},
    favorites: [],
    deleted: [],
  });

  const searchResults = async function () {
    try {
      const res = await axios(`${API_URL}&s=${state.search}`);
      const data = res?.data?.Search;

      setState((previousState) => {
        return {
          ...previousState,
          results:
            data?.filter(
              (movie: any) => !state.deleted.includes(movie.imdbID)
            ) || [],
        };
      });
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };
  //change with string literal
  const selectByID = (id: string) => {
    axios(API_URL + "&i=" + id).then(({ data }) => {
      let idResult = data;
      setState((previousState) => {
        return { ...previousState, selected: idResult };
      });
    });
  };

  const setFav = async function () {
    const selectedFav = JSON.stringify([...state.favorites, state.selected]);
    state.favorites.find((imdbID) => state.selected?.imdbID)
      ? alert("already added")
      : setState((previousState: any) => {
          return {
            ...previousState,
            favorites: [...previousState.favorites, state.selected],
          };
        });

    try {
      await AsyncStorage.setItem("favorite", selectedFav);
    } catch (err) {
      console.log(err);
    }
  };

  const setDeleted = async () => {
    const selectedDel = JSON.stringify([
      ...state.deleted,
      state.selected.imdbID,
    ]);
    setState((previousState: any) => {
      return {
        ...previousState,
        deleted: [...previousState.deleted, state.selected.imdbID],
      };
    });
    try {
      await AsyncStorage.setItem("deleted", selectedDel);
    } catch (err) {
      console.log(err);
    }
  };

  const getFavorites = async () => {
    // await AsyncStorage.removeItem("favorite");
    try {
      const jsonValue = await AsyncStorage.getItem("favorite");

      return jsonValue != null
        ? setState((previousState: any) => {
            return {
              ...previousState,
              favorites: [...previousState.favorites, ...JSON.parse(jsonValue)],
            };
          })
        : null;
    } catch (e) {
      // error reading value
    }
  };
  const getDeleted = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("deleted");

      return jsonValue != null
        ? setState((previousState: any) => {
            return {
              ...previousState,
              deleted: [...previousState.deleted, ...JSON.parse(jsonValue)],
            };
          })
        : null;
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    getFavorites();
    getDeleted();
  }, []);
  return netInfo.isConnected ? (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.header}>Movies & TV Shows</Text>

          <Text style={styles.subHeader}>My favorites</Text>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={state.favorites}
            keyExtractor={(favItem, index) => favItem.imdbID}
            renderItem={(favItem) => {
              return (
                <TouchableHighlight
                  underlayColor={"transparent"}
                  onPress={() => selectByID(favItem.item.imdbID)}
                  key={favItem.item.imdbID}
                >
                  <View style={styles.favView}>
                    <Text style={styles.favTitle}>{favItem.item.Title}</Text>
                    <Image
                      resizeMode="cover"
                      style={styles.favPoster}
                      source={{ uri: favItem.item.Poster }}
                    />
                  </View>
                </TouchableHighlight>
              );
            }}
          />

          <Text style={styles.subHeader}>Explore</Text>
          <TextInput
            style={styles.inputStyle}
            placeholderTextColor={"gray"}
            onChangeText={(text) =>
              setState((previousState) => {
                return { ...previousState, search: text };
              })
            }
            value={state.search}
            placeholder="Search"
            onSubmitEditing={searchResults}
          />
          <View style={styles.exploreContainer}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={state.results}
              renderItem={(item) => (
                <TouchableHighlight
                  underlayColor={"transparent"}
                  onPress={() => selectByID(item.item.imdbID)}
                  key={item.item.imdbID}
                >
                  <View style={styles.resultView}>
                    <Text style={styles.resultTitle}>{item.item.Title}</Text>
                    <Image
                      resizeMode="cover"
                      style={styles.resultPoster}
                      source={{ uri: item.item.Poster }}
                    />
                  </View>
                </TouchableHighlight>
              )}
              keyExtractor={(item) => {
                return item.imdbID;
              }}
            />
          </View>

          <ModalView
            movie={state}
            setState={setState}
            setDeleted={setDeleted}
            setFav={setFav}
          />
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B2A41",
    flex: 1,
  },
  scrollView: { backgroundColor: "#1B2A41" },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 15,
    color: "white",
    marginTop: 50,
  },
  subHeader: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 15,
    color: "white",
    marginTop: 10,
  },

  favoritesContainer: {
    backgroundColor: "transparent",
    marginTop: 8,
    flexDirection: "row",
  },
  favView: {
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
    marginHorizontal: 10,
  },

  favTitle: {
    marginVertical: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    alignSelf: "center",
    maxWidth: 150,
  },
  favPoster: {
    height: 150,
    width: 100,
    borderRadius: 8,
  },

  inputStyle: {
    height: 30,
    width: "92%",
    borderWidth: 0.5,
    borderRadius: 8,
    color: "black",
    borderColor: "white",
    marginTop: 8,
    alignSelf: "center",
    backgroundColor: "white",
    paddingLeft: 10,
  },

  exploreContainer: {
    backgroundColor: "transparent",
    marginTop: 8,
  },
  insideImage: { width: 150, height: 200, alignSelf: "center" },

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

export default HomeScreen;
