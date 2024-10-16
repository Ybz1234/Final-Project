import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Alert,
    TouchableOpacity,
    Text,
    TextInput,
} from "react-native";
import { useUser } from "../context/UserContext";
import CryptoJS from "crypto-js";

export default function Profile({ navigation }) {
    const { user, setUser: setGlobalUser } = useUser();
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState(""); // Password for updates

    useEffect(() => {
        // Update state with user data when component mounts
        if (user && user.user) {
            const userInfo = user.user; // Access the nested user object
            setFirstName(userInfo.firstName);
            setLastName(userInfo.lastName);
            setEmail(userInfo.email);
            console.log("User data loaded:", userInfo);

            // Log each field of the user
            console.log("Current User Details:");
            console.log("First Name:", userInfo.firstName);
            console.log("Last Name:", userInfo.lastName);
            console.log("Email:", userInfo.email);
            console.log("User ID:", userInfo._id); // Log user ID if needed
        } else {
            console.warn("User context is null or malformed:", user);
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user || !user.user) {
            console.error("User context is null when trying to update profile:", user);
            Alert.alert("Update Failed", "User information is not available.");
            return;
        }

        try {
            const payload = {
                firstName,
                lastName,
                email,
            };

            if (password) {
                payload.password = CryptoJS.SHA256(password).toString();
            }

            const response = await fetch(
                `https://final-project-sqlv.onrender.com/api/users/user/${user.user._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                console.error("Failed to update profile:", response.status, response.statusText);
                const errorData = await response.json();
                console.error("Error data:", errorData);
                Alert.alert("Update Failed", errorData.message || "Failed to update profile.");
                return;
            }

            const data = await response.json();
            console.log("Profile updated successfully:", data);
            console.log("Updated User Details:", { firstName, lastName, email });
            setGlobalUser(data);
            Alert.alert("Profile Updated", "Your profile has been updated successfully.");
            setPassword("");
        } catch (error) {
            console.error("Error in updating profile:", error);
            Alert.alert("Update Failed", error.message);
        }
    };

    const handleDeleteProfile = async () => {
        if (!user || !user.user) {
            console.error("User context is null when trying to delete profile:", user);
            Alert.alert("Deletion Failed", "User information is not available.");
            return;
        }

        try {
            const response = await fetch(
                `https://final-project-sqlv.onrender.com/api/users/user`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({ id: user.user._id }),
                }
            );

            if (!response.ok) {
                console.error("Failed to delete profile:", response.status, response.statusText);
                const errorData = await response.json();
                console.error("Error data:", errorData);
                Alert.alert("Deletion Failed", errorData.message || "Failed to delete profile.");
                return;
            }

            const data = await response.json();
            console.log("Profile deleted successfully:", data);
            Alert.alert("Profile Deleted", "Your profile has been deleted successfully.");
            setGlobalUser(null);
            navigation.navigate("Signup");
        } catch (error) {
            console.error("Error in deleting profile:", error);
            Alert.alert("Deletion Failed", error.message);
        }
    };

    const handleSignOut = async () => {
        if (!user || !user.user) {
            console.error("User context is null when trying to sign out:", user);
            Alert.alert("Sign Out Failed", "User information is not available.");
            return;
        }
    
        try {
            const token = user.token; // Ensure you're retrieving the token from the user context or storage
    
            const response = await fetch(
                'https://final-project-sqlv.onrender.com/api/users/signout',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                }
            );
    
            if (!response.ok) {
                console.error("Failed to sign out:", response.status, response.statusText);
                const errorData = await response.json();
                console.error("Error data:", errorData);
                Alert.alert("Sign Out Failed", errorData.message || "Failed to sign out.");
                return;
            }
    
            const data = await response.json();
            console.log("Signed out successfully:", data);
            Alert.alert("Signed Out", data.message);
            setGlobalUser(null); // Clear user from context
            navigation.navigate("SignUp"); // Redirect to SignUp screen after sign out
        } catch (error) {
            console.error("Error in signing out:", error);
            Alert.alert("Sign Out Failed", error.message);
        }
    };      

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDeleteProfile}>
                <Text style={styles.buttonText}>Delete Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#70DBDB",
    },
    title: {
        fontSize: 38,
        fontWeight: "800",
        color: "#FFFFFF",
        textAlign: "center",
        marginBottom: 24,
        textShadowColor: "rgba(0, 0, 0, 0.8)",
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        letterSpacing: 2,
        fontFamily: "Roboto-BoldItalic",
    },
    input: {
        height: 50,
        width: "90%",
        borderColor: "#29A3A3",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    button: {
        backgroundColor: "#1B3E90",
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        width: "60%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
