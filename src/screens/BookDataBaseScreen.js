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
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export default function BookDataBaseScreen() {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [id, setId] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [singleData, setSingleData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  // collection refrence

  const colRef = collection(db, "books");
  const docRef = doc(db, "books", "uU2VY1tZV62Eamd1NDGN");

  // get a single document
  const getSingle = async () => {
    try {
      // const doc = await getDoc(docRef);
      onSnapshot(docRef, (doc) => {
        setSingleData({ ...doc.data(), id: doc.id });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateSingle = async () => {
    try {
      const docRef = doc(db, "books", "uU2VY1tZV62Eamd1NDGN");
      await updateDoc(docRef, {
        title: "Updated title",
      });
    } catch (error) {
      console.log(error);
    }
  };
  // real time collection data
  const getData = () => {
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

  //real time collection with onSnapshot
  const filterData = (author) => {
    try {
      // querries
      const queryRef = query(colRef, where("author", "==", author));
      onSnapshot(queryRef, (snapshot) => {
        let books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setFilteredBooks(books);
        setFilterAuthor("");
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
        createdAt: serverTimestamp(),
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
      getData();
      setId("");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(singleData);
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
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        <Text style={{ fontSize: 18 }}>Author: </Text>
        <TextInput
          style={{ borderBottomColor: "black", borderBottomWidth: 2, flex: 1 }}
          value={filterAuthor}
          onChangeText={(text) => setFilterAuthor(text)}
        />
      </View>
      <Button
        title="Filter Books"
        color={"green"}
        onPress={() => filterData(filterAuthor)}
      />
      <Button
        title="Get Single Data"
        color={"orange"}
        onPress={() => getSingle()}
      />
      <Button
        title="Update Single Data"
        color={"purple"}
        onPress={() => updateSingle()}
      />
      <View style={{ flex: 2 }}>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>
          Unfiltered Data
        </Text>
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
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>Filtered Data</Text>
        <FlatList
          data={filteredBooks}
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
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Get a Single Doc
        </Text>
        <Text>{singleData.title}</Text>
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
