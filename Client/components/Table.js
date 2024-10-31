import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";

const TableExample = () => {
    const [users, setUsers] = useState([]); // State to hold user data

    // Fetch all users from API
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
                setUsers(data); // Set users data if the response is OK
            } else {
                console.log("Error fetching users:", data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        GetAllUsers();
    }, []);

    const handleEdit = (email) => {
        Alert.alert(`Edit user: ${email}`);
        // Add your edit logic here
    };

    const handleDelete = (email) => {
        Alert.alert(`Delete user: ${email}`);
        // Add your delete logic here
    };

    const tableHead = ["Mail", "Role", "Edit", "Delete"];

    const renderRow = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.email}</Text>
            </View>
            <View style={styles.cell}>
                <Text style={styles.cellText}>{item.role || "N/A"}</Text>
            </View>
            <View style={styles.cell}>
                <TouchableOpacity onPress={() => handleEdit(item.email)}>
                    <View style={styles.btn}>
                        <Text style={styles.btnText}>Edit</Text>
                    </View>
                </TouchableOpacity>
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
                    <Text key={index} style={styles.headText}>{head}</Text>
                ))}
            </View>
            <FlatList
                data={users}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        backgroundColor: "#808B97",
        paddingVertical: 15,
        justifyContent: "space-around",
    },
    headText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
    },
    row: {
        flexDirection: "row",
        backgroundColor: "#FFF1C1",
        marginVertical: 2,
        height: 60,
    },
    cell: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    btn: {
        width: 80,
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
