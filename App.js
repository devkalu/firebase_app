import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  FlatList,
} from "react-native";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./src/firebase/firebase";

export default function App() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // collection refrence

  const colRef = collection(db, "books");

  // real time collection data
  const getData = () => {
    // await getDocs(colRef)
    //   .then((snapshot) => {
    //     let books = [];
    //     snapshot.docs.forEach((doc) => {
    //       books.push({ ...doc.data(), id: doc.id });
    //     });
    //     setBooks(books);
    //   })
    //   .catch((err) => console.log(err));
    try {
      onSnapshot(colRef, (snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setBooks(books);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addRecord = async () => {
    try {
      await addDoc(colRef, {
        author: author,
        title: title,
      });
      setAuthor("");
      setTitle("");
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const docRef = doc(db, "books", id);
      await deleteDoc(docRef);
      await getData();
      setId("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30, textAlign: "center" }}>Book Database</Text>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <Text style={{ fontSize: 18 }}>Author: </Text>
        <TextInput
          style={{ borderBottomColor: "black", borderBottomWidth: 2, flex: 1 }}
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />
      </View>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <Text style={{ fontSize: 18 }}>Title: </Text>
        <TextInput
          style={{ borderBottomColor: "black", borderBottomWidth: 2, flex: 1 }}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <Button title="Save Book" onPress={addRecord} />
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <Text style={{ fontSize: 18 }}>Title: </Text>
        <TextInput
          style={{ borderBottomColor: "black", borderBottomWidth: 2, flex: 1 }}
          value={id}
          onChangeText={(text) => setId(text)}
        />
      </View>
      <Button
        title="Delete Book"
        color={"red"}
        onPress={() => deleteRecord(id)}
      />
      <View>
        <FlatList
          data={books}
          renderItem={({ item }) => {
            return (
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontWeight: "bold" }}>{item.id}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{item.title}</Text>
                  <Text>{item.author}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
});
