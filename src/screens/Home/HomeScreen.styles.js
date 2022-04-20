import { StyleSheet } from "react-native";
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

export default styles;
