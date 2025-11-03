import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export default function HomeScreen() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [favoriteColor, setFavoriteColor] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
    } catch (error) {
      console.error("Error loading user data:", error);
      Alert.alert("Error", "Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateColor = async () => {
    if (!favoriteColor.trim()) {
      Alert.alert("Error", "Please enter a color");
      return;
    }

    try {
    } catch (error) {
      console.error("Error updating color:", error);
      Alert.alert("Error", "Failed to update favorite color");
    }
  };

  const handleDeleteColor = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your favorite color?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
            } catch (error) {
              console.error("Error deleting color:", error);
              Alert.alert("Error", "Failed to delete favorite color");
            }
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>{userData?.firstName || "N/A"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.value}>{userData?.lastName || "N/A"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userData?.email || "N/A"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{userData?.phoneNumber || "N/A"}</Text>
        </View>

        <View style={[styles.card, styles.colorCard]}>
          <Text style={styles.label}>Favorite Color</Text>

          {!isEditing ? (
            <>
              <View style={styles.colorDisplayContainer}>
                <Text
                  style={[
                    styles.value,
                    !userData?.favoriteColor && styles.emptyValue,
                  ]}
                >
                  {userData?.favoriteColor || "Not set"}
                </Text>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>

                {userData?.favoriteColor && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteColor}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter color (e.g., red, #FF0000)"
                value={favoriteColor}
                onChangeText={setFavoriteColor}
                autoCapitalize="none"
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleUpdateColor}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditing(false);
                    setFavoriteColor(userData?.favoriteColor || "");
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  content: {
    paddingTop: 70,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  colorCard: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    fontWeight: "600",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  emptyValue: {
    color: "#999",
    fontStyle: "italic",
  },
  colorDisplayContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#8E8E93",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
