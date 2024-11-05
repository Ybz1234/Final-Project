import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";

const TableExample = () => {
    const [users, setUsers] = useState([]);
    const [emailCellWidth, setEmailCellWidth] = useState(100);

    const GetAllUsers = async () => {
        try {
            const response = await fetch(
                "https://final-project-sqlv.onrender.com/api/admin/getAllUsers",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    }
                }
            );
            const data = await response.json();
            if (response.ok) {
                setUsers(data.users);

                const longestEmail = data.users.reduce((max, user) =>
                    Math.max(max, user.email.length), 0);
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
        try {
            const id = await getUserIdByEmail(email);
            if (!id) {
                Alert.alert("Failed to fetch user ID");
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
                Alert.alert("User deleted successfully");
                setUsers(users.filter((user) => user._id !== id));
            } else {
                const errorData = await response.json();
                console.log("-handleDelete- Error deleting user:", errorData);
                Alert.alert("Failed to delete user");
            }
        } catch (error) {
            console.error("-handleDelete- Error deleting user:", error);
            Alert.alert("An error occurred while deleting the user");
        }
    };

    useEffect(() => {
        GetAllUsers();
    }, []);

    const tableHead = ["Mail", "Role", "Delete"];

    const renderRow = ({ item, index }) => (
        <View style={[styles.row, { backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }]}>
            <View style={[styles.cell, { width: emailCellWidth }]}>
                <Text style={styles.cellText}>{item.email}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.role || "N/A"}</Text>
            </View>
            <View style={styles.cell}>
                <TouchableOpacity onPress={() => handleDelete(item.email)}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Delete</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {tableHead.map((head, index) => (
                    <View key={index} style={[styles.headerCell, { width: index === 0 ? emailCellWidth : undefined }]}>
                        <Text style={styles.headText}>{head}</Text>
                    </View>
                ))}
            </View>
            <FlatList
                data={users}
                renderItem={renderRow}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        backgroundColor: "#1B3E90",
        justifyContent: "space-around",
        paddingVertical: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    headerCell: {
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    headText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        marginVertical: 2,
        height: 60,
        alignItems: "center",
    },
    cell: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    btn: {
        width: 80,
        height: 40,
        backgroundColor: "red",
        borderRadius: 5,
        justifyContent: "center",
    },
    btnText: { textAlign: "center", color: "#fff", fontSize: 16 },
    cellText: {
        textAlign: "center",
        color: "#000",
        fontSize: 16,
    },
});

export default TableExample;
