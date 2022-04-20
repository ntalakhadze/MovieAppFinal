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
import envs from "../../../env";
import ModalView from "../../components/ModalView/modal";
import { State } from "../../types";
import styles from "./HomeScreen.styles";

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

export default HomeScreen;
