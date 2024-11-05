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
    
            const responseData = await response.text();
            if (response.ok) {
                const data = JSON.parse(responseData);
                return data._id;
            } else {
                console.log("Error fetching user ID:", responseData);
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
            console.log(id);
            if (!id) {
                Alert.alert("Failed to fetch user ID");
                return;
            }

            const response = await fetch(
                "https://final-project-sqlv.onrender.com/api/users/deleteUser",
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
                const data = await response.json();
                console.log("Error deleting user:", data);
                Alert.alert("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            Alert.alert("An error occurred while deleting the user");
        }
    };

    useEffect(() => {
        GetAllUsers();
    }, []);

    const tableHead = ["Mail", "Role", "Delete"];

    const renderRow = ({ item }) => (
        <View style={styles.row}>
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
    },
    headerCell: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 1,
        borderColor: "#ddd",
        width: '33%',
    },
    headText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
    row: {
        flexDirection: "row",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        marginVertical: 2,
        height: 60,
    },
    cell: {
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    btn: {
        width: 60,
        height: 40,
        backgroundColor: "red",
        borderRadius: 2,
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
