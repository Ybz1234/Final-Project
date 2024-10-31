import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, FlatList } from "react-native";

const TableExample = () => {
    const tableHead = ["Mail", "Role", "Edit", "Delete"];
    const tableData = [
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
    ];

    const renderRow = ({ item, index }) => (
        <View style={styles.row}>
            {item.map((cellData, cellIndex) => (
                <View
                    key={cellIndex}
                    style={[styles.cell, cellIndex === 3 && styles.cellButton]}
                >
                    {<Text style={styles.cellText}>{cellData}</Text>}
                </View>
            ))}
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
                data={tableData}
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
        paddingVertical: 15,  // Increased padding
        justifyContent: "space-around",
    },
    headText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,  // Increased font size for header
    },
    row: {
        flexDirection: "row",
        backgroundColor: "#FFF1C1",
        marginVertical: 2,
        height: 60, // Increased height of each row
    },
    cell: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 15, // Increased padding for cells
        borderRightWidth: 1,
        borderColor: "#ddd",
    },
    cellButton: {
        backgroundColor: "transparent",
    },
    btn: {
        width: 100, // Increased button width
        height: 40, // Increased button height
        backgroundColor: "red",
        borderRadius: 2,
        justifyContent: "center",
    },
    btnText: { textAlign: "center", color: "#fff", fontSize: 16 }, // Increased button text size
    cellText: {
        textAlign: "center",
        color: "#000",
        fontSize: 16, // Increased cell text size
    },
});

export default TableExample;
