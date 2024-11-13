import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import PageFrame from "./PageFrame";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native-paper";

const TableExample = () => {
  const [users, setUsers] = useState([]);
  const [emailCellWidth, setEmailCellWidth] = useState(100);
  const [deleting, setDeleting] = useState(false);

  const GetAllUsers = async () => {
    try {
      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/admin/getAllUsers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);

        const longestEmail = data.users.reduce(
          (max, user) => Math.max(max, user.email.length),
          0
        );
        setEmailCellWidth(longestEmail * 10);
      } else {
        console.log("Error fetching users:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUserIdByEmail = async (email) => {
    try {
      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/users/getIdByEmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        return responseData.id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  const handleDelete = async (email) => {
    setDeleting(true);
    try {
      const id = await getUserIdByEmail(email);
      if (!id) {
        Toast.show({
          type: "info",
          position: "top",
          text1: "Failed to fetch user ID",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 280,
          bottomOffset: 40,
        });
        return;
      }

      const response = await fetch(
        "https://final-project-sqlv.onrender.com/api/users/user",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (response.ok) {
        Toast.show({
          type: "info",
          position: "top",
          text1: "User deleted successfully",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 280,
          bottomOffset: 40,
        });

        setUsers(users.filter((user) => user._id !== id));
        setDeleting(true);
      } else {
        setDeleting(true);

        const errorData = await response.json();
        console.log("-handleDelete- Error deleting user:", errorData);
        Toast.show({
          type: "info",
          position: "top",
          text1: "Failed to delete user",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 280,
          bottomOffset: 40,
        });
      }
    } catch (error) {
      setDeleting(true);

      console.error("-handleDelete- Error deleting user:", error);
      Toast.show({
        type: "info",
        position: "top",
        text1: "An error occurred while deleting the user",
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 280,
        bottomOffset: 40,
      });
    }
  };

  useEffect(() => {
    GetAllUsers();
  }, []);

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? "#fdfdfd" : "#f7f7f7" },
      ]}
    >
      <View style={[styles.cell, styles.emailCell]}>
        <Text style={styles.cellText} numberOfLines={1} ellipsizeMode="tail">
          {item.email}
        </Text>
      </View>
      <View style={[styles.cell, styles.roleCell]}>
        <Text style={styles.cellText}>{item.role || "N/A"}</Text>
      </View>
      <View style={[styles.cell, styles.actionCell]} disabled={deleting}>
        <TouchableOpacity onPress={() => handleDelete(item.email)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <PageFrame>
      <View style={styles.container}>
        <View style={styles.table}>
          <View style={styles.header}>
            <View style={[styles.headerCell, styles.emailCell]}>
              <Text style={styles.headerText}>Email</Text>
            </View>
            <View style={[styles.headerCell, styles.roleCell]}>
              <Text style={styles.headerText}>Role</Text>
            </View>
            <View style={[styles.headerCell, styles.actionCell]}>
              <Text style={styles.headerText}>Delete</Text>
            </View>
          </View>
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
    </PageFrame>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to expand and fill available space
    width: "95%",
    // height: "95%", // Remove this line to prevent height limitation
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: "center",
    marginBottom: 80,
  },
  table: {
    flex: 1, // Allow the table to expand within the container
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#1B3E90",
  },
  headerCell: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  emailCell: {
    flex: 3,
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  roleCell: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  actionCell: {
    flex: 1,
  },
  cellText: {
    fontSize: 14,
    color: "#333",
  },
  deleteText: {
    color: "red",
    fontWeight: "bold",
  },
});
export default TableExample;
