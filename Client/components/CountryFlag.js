import React from 'react';
import Flag from 'react-world-flags';
import { View, Text, StyleSheet } from 'react-native';

const cityCountryCodeMap = {
    "Tel Aviv": "IL",
    "Tirana": "AL",
    "Vienna": "AT",
    "Klagenfurt": "AT",
    "Liège": "BE",
    "Brussels": "BE",
    "Sarajevo": "BA",
    "Sofia": "BG",
    "Zagreb": "HR",
    "Dubrovnik": "HR",
    "Larnaca": "CY",
    "Prague": "CZ",
    "Copenhagen": "DK",
    "Aalborg": "DK",
    "Tallinn": "EE",
    "Helsinki": "FI",
    "Nantes": "FR",
    "Paris": "FR",
    "Lyon": "FR",
    "Nice": "FR",
    "Berlin": "DE",
    "Frankfurt": "DE",
    "Munich": "DE",
    "Athens": "GR",
    "Thessaloniki": "GR",
    "Budapest": "HU",
    "Dublin": "IE",
    "Rome": "IT",
    "Milan": "IT",
    "Naples": "IT",
    "Florence": "IT",
    "Bologna": "IT",
    "Riga": "LV",
    "Vilnius": "LT",
    "Luxembourg": "LU",
    "Luqa": "MT",
    "Amsterdam": "NL",
    "Groningen": "NL",
    "Eindhoven": "NL",
    "Rotterdam": "NL",
    "Oslo": "NO",
    "Warsaw": "PL",
    "Lisbon": "PT",
    "Bucharest": "RO",
    "Moscow": "RU",
    "Belgrade": "RS",
    "Bratislava": "SK",
    "Ljubljana": "SI",
    "Madrid": "ES",
    "Barcelona": "ES",
    "Stockholm": "SE",
    "Zurich": "CH",
    "Kyiv": "UA",
    "Edinburgh": "GB",
    "London": "GB"
};

const CountryFlag = ({ city }) => {
    const countryCode = cityCountryCodeMap[city];
    return (
        <View style={styles.container}>
            {countryCode ? <Flag code={countryCode} style={styles.flag} /> : null}
            <Text style={styles.cityText}>{city}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        width: 24,
        height: 16,
        marginRight: 8,
    },
    cityText: {
        fontSize: 16,
    },
});

export default CountryFlag;
