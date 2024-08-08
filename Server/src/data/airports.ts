import { IAirPort } from "../airport/airport.type";

export const airports: IAirPort[] = [
  // Israel
  {
    address: {
      full_address: "Ben Gurion Airport, 7015001, Israel",
      location: { lat: 32.000556, long: 34.870833 },
    },
    name: "Ben Gurion International Airport",
    city: "Tel Aviv",
    country: "Israel",
    iata: "TLV",
    icao: "LLBG",
  },
  // Albania
  {
    address: {
      full_address:
        "Tirana International Airport Nënë Tereza, Rruga Nene Tereza, 1504, Albania",
      location: { lat: 41.414722, long: 19.720556 },
    },
    name: "Tirana International Airport Nënë Tereza",
    city: "Tirana",
    country: "Albania",
    iata: "TIA",
    icao: "LATI",
  },
  // Austria
  {
    address: {
      full_address: "Wien-Flughafen, 1300 Schwechat, Austria",
      location: { lat: 48.110278, long: 16.569722 },
    },
    name: "Vienna International Airport",
    city: "Vienna",
    country: "Austria",
    iata: "VIE",
    icao: "LOWW",
  },
  {
    address: {
      full_address: "A-9020 Klagenfurt, Austria",
      location: { lat: 46.642778, long: 14.337222 },
    },
    name: "Klagenfurt Airport",
    city: "Klagenfurt",
    country: "Austria",
    iata: "KLU",
    icao: "LOWK",
  },
  // Belgium
  {
    address: {
      full_address: "Rue de l'Aéroport 1, 4460 Grâce-Hollogne, Belgium",
      location: { lat: 50.636667, long: 5.443333 },
    },
    name: "Liège Airport",
    city: "Liège",
    country: "Belgium",
    iata: "LGG",
    icao: "EBLG",
  },
  {
    address: {
      full_address: "Luchthaven Brussel Nationaal, 1930 Zaventem, Belgium",
      location: { lat: 50.901389, long: 4.484444 },
    },
    name: "Brussels Airport",
    city: "Brussels",
    country: "Belgium",
    iata: "BRU",
    icao: "EBBR",
  },
  // Bosnia and Herzegovina
  {
    address: {
      full_address: "Kurta Schorka 36, Sarajevo 71000, Bosnia and Herzegovina",
      location: { lat: 43.8246, long: 18.3315 },
    },
    name: "Sarajevo International Airport",
    city: "Sarajevo",
    country: "Bosnia and Herzegovina",
    iata: "SJJ",
    icao: "LQSA",
  },
  // Bulgaria
  {
    address: {
      full_address: "Bulevard Bruksel 1, 1540 Sofia, Bulgaria",
      location: { lat: 42.695, long: 23.406111 },
    },
    name: "Sofia Airport",
    city: "Sofia",
    country: "Bulgaria",
    iata: "SOF",
    icao: "LBSF",
  },
  // Croatia
  {
    address: {
      full_address: "Rudolfa Fizira 1, 10150, Zagreb, Croatia",
      location: { lat: 45.7429, long: 16.0688 },
    },
    name: "Zagreb Airport",
    city: "Zagreb",
    country: "Croatia",
    iata: "ZAG",
    icao: "LDZA",
  },
  {
    address: {
      full_address: "Čilipi, 20213, Croatia",
      location: { lat: 42.5614, long: 18.2682 },
    },
    name: "Dubrovnik Airport",
    city: "Dubrovnik",
    country: "Croatia",
    iata: "DBV",
    icao: "LDDU",
  },
  // Cyprus
  {
    address: {
      full_address: "Larnaca International Airport, Larnaca, Cyprus",
      location: { lat: 34.875117, long: 33.62485 },
    },
    name: "Larnaca International Airport",
    city: "Larnaca",
    country: "Cyprus",
    iata: "LCA",
    icao: "LCLK",
  },
  // Czech Republic
  {
    address: {
      full_address: "Aviatická, 161 08 Praha 6, Czech Republic",
      location: { lat: 50.100833, long: 14.26 },
    },
    name: "Václav Havel Airport Prague",
    city: "Prague",
    country: "Czech Republic",
    iata: "PRG",
    icao: "LKPR",
  },
  // Denmark
  {
    address: {
      full_address: "Lufthavnsboulevarden 6, 2770 Kastrup, Denmark",
      location: { lat: 55.618056, long: 12.656111 },
    },
    name: "Copenhagen Airport",
    city: "Copenhagen",
    country: "Denmark",
    iata: "CPH",
    icao: "EKCH",
  },
  {
    address: {
      full_address: "Ny Lufthavnsvej 24, 9400 Nørresundby, Denmark",
      location: { lat: 57.092789, long: 9.849243 },
    },
    name: "Aalborg Airport",
    city: "Aalborg",
    country: "Denmark",
    iata: "AAL",
    icao: "EKYT",
  },
  // Estonia
  {
    address: {
      full_address: "Tartu mnt 101, 10112 Tallinn, Estonia",
      location: { lat: 59.413317, long: 24.832844 },
    },
    name: "Lennart Meri Tallinn Airport",
    city: "Tallinn",
    country: "Estonia",
    iata: "TLL",
    icao: "EETN",
  },
  // Finland
  {
    address: {
      full_address: "Lentäjäntie, 01530 Vantaa, Finland",
      location: { lat: 60.317222, long: 24.963333 },
    },
    name: "Helsinki Airport",
    city: "Helsinki",
    country: "Finland",
    iata: "HEL",
    icao: "EFHK",
  },
  // France
  {
    address: {
      full_address: "BP 81007, 44381 Nantes Cedex 3, France",
      location: { lat: 47.153333, long: -1.610833 },
    },
    name: "Nantes Atlantique Airport",
    city: "Nantes",
    country: "France",
    iata: "NTE",
    icao: "LFRS",
  },
  {
    address: {
      full_address:
        "Aéroport de Lyon-Saint Exupéry, 69125 Colombier-Saugnieu, France",
      location: { lat: 45.720833, long: 5.079444 },
    },
    name: "Lyon-Saint Exupéry Airport",
    city: "Lyon",
    country: "France",
    iata: "LYS",
    icao: "LFLL",
  },
  {
    address: {
      full_address: "Aéroport Nice Côte d'Azur, 06206 Nice, France",
      location: { lat: 43.665278, long: 7.215 },
    },
    name: "Nice Côte d'Azur Airport",
    city: "Nice",
    country: "France",
    iata: "NCE",
    icao: "LFMN",
  },
  // Germany
  {
    address: {
      full_address: "60547 Frankfurt, Germany",
      location: { lat: 50.037933, long: 8.562152 },
    },
    name: "Frankfurt Airport",
    city: "Frankfurt",
    country: "Germany",
    iata: "FRA",
    icao: "EDDF",
  },
  {
    address: {
      full_address: "München-Flughafen, 85356 München, Germany",
      location: { lat: 48.353783, long: 11.786086 },
    },
    name: "Munich Airport",
    city: "Munich",
    country: "Germany",
    iata: "MUC",
    icao: "EDDM",
  },
  {
    address: {
      full_address: "Flughafen Berlin Brandenburg, 12529 Schönefeld, Germany",
      location: { lat: 52.3667, long: 13.5033 },
    },
    name: "Berlin Brandenburg Airport",
    city: "Berlin",
    country: "Germany",
    iata: "BER",
    icao: "EDDB",
  },
  // Greece
  {
    address: {
      full_address: "Attiki Odos, Spata Artemida 190 04, Greece",
      location: { lat: 37.936358, long: 23.947384 },
    },
    name: "Athens International Airport",
    city: "Athens",
    country: "Greece",
    iata: "ATH",
    icao: "LGAV",
  },
  {
    address: {
      full_address: "71601 Heraklion, Crete, Greece",
      location: { lat: 35.339722, long: 25.180278 },
    },
    name: "Heraklion International Airport",
    city: "Heraklion",
    country: "Greece",
    iata: "HER",
    icao: "LGIR",
  },
  {
    address: {
      full_address: "Thermi 551 03, Greece",
      location: { lat: 40.519722, long: 22.970278 },
    },
    name: "Thessaloniki Airport",
    city: "Thessaloniki",
    country: "Greece",
    iata: "SKG",
    icao: "LGTS",
  },
  // Hungary
  {
    address: {
      full_address: "Budapest, 1185 Hungary",
      location: { lat: 47.429764, long: 19.261093 },
    },
    name: "Budapest Ferenc Liszt International Airport",
    city: "Budapest",
    country: "Hungary",
    iata: "BUD",
    icao: "LHBP",
  },
  // Ireland
  {
    address: {
      full_address: "Dublin Airport, Co. Dublin, Ireland",
      location: { lat: 53.427283, long: -6.24357 },
    },
    name: "Dublin Airport",
    city: "Dublin",
    country: "Ireland",
    iata: "DUB",
    icao: "EIDW",
  },
  // Italy
  {
    address: {
      full_address:
        "Via dell'Aeroporto di Fiumicino, 320, 00054 Fiumicino RM, Italy",
      location: { lat: 41.800278, long: 12.238889 },
    },
    name: "Leonardo da Vinci–Fiumicino Airport",
    city: "Rome",
    country: "Italy",
    iata: "FCO",
    icao: "LIRF",
  },
  {
    address: {
      full_address: "Viale Enrico Forlanini, 20090 Segrate MI, Italy",
      location: { lat: 45.6306, long: 9.2761 },
    },
    name: "Milan Linate Airport",
    city: "Milan",
    country: "Italy",
    iata: "LIN",
    icao: "LIML",
  },
  {
    address: {
      full_address:
        "Aeroporto Guglielmo Marconi di Bologna, 40132 Bologna BO, Italy",
      location: { lat: 44.5354, long: 11.2887 },
    },
    name: "Bologna Guglielmo Marconi Airport",
    city: "Bologna",
    country: "Italy",
    iata: "BLQ",
    icao: "LIPE",
  },
  {
    address: {
      full_address: "Aeroporto di Firenze-Peretola, 50127 Firenze FI, Italy",
      location: { lat: 43.81, long: 11.2051 },
    },
    name: "Florence Airport",
    city: "Florence",
    country: "Italy",
    iata: "FLR",
    icao: "LIRQ",
  },
  {
    address: {
      full_address: "Aeroporto di Venezia Marco Polo, 30173 Venezia VE, Italy",
      location: { lat: 45.5053, long: 12.3519 },
    },
    name: "Venice Marco Polo Airport",
    city: "Venice",
    country: "Italy",
    iata: "VCE",
    icao: "LIPZ",
  },
  {
    address: {
      full_address: "Aeroporto di Napoli-Capodichino, 80144 Napoli NA, Italy",
      location: { lat: 40.886, long: 14.2908 },
    },
    name: "Naples International Airport",
    city: "Naples",
    country: "Italy",
    iata: "NAP",
    icao: "LIRN",
  },
  {
    address: {
      full_address: "Viale Enrico Forlanini, 20090 Segrate MI, Italy",
      location: { lat: 45.4633, long: 9.2783 },
    },
    name: "Milan Linate Airport",
    city: "Milan",
    country: "Italy",
    iata: "LIN",
    icao: "LIML",
  },
  // Latvia
  {
    address: {
      full_address:
        "Riga International Airport, Mārupes novads, LV-1053, Latvia",
      location: { lat: 56.923611, long: 23.971111 },
    },
    name: "Riga International Airport",
    city: "Riga",
    country: "Latvia",
    iata: "RIX",
    icao: "EVRA",
  },
  // Lithuania
  {
    address: {
      full_address: "Rodūnios kl. 10A, Vilnius 02189, Lithuania",
      location: { lat: 54.6341, long: 25.2858 },
    },
    name: "Vilnius Airport",
    city: "Vilnius",
    country: "Lithuania",
    iata: "VNO",
    icao: "EYVI",
  },
  // Luxembourg
  {
    address: {
      full_address: "Luxembourg Airport, 1110 Luxembourg",
      location: { lat: 49.6266, long: 6.2115 },
    },
    name: "Luxembourg Airport",
    city: "Luxembourg",
    country: "Luxembourg",
    iata: "LUX",
    icao: "ELLX",
  },
  // Malta
  {
    address: {
      full_address: "Luqa LQA 4000, Malta",
      location: { lat: 35.8575, long: 14.4775 },
    },
    name: "Malta International Airport",
    city: "Luqa",
    country: "Malta",
    iata: "MLA",
    icao: "LMML",
  },
  // Netherlands
  {
    address: {
      full_address:
        "Evert van de Beekstraat 202, 1118 CP Schiphol, Netherlands",
      location: { lat: 52.308613, long: 4.763889 },
    },
    name: "Amsterdam Airport Schiphol",
    city: "Amsterdam",
    country: "Netherlands",
    iata: "AMS",
    icao: "EHAM",
  },
  {
    address: {
      full_address: "Machlaan 14, 9761 TK Eelde, Netherlands",
      location: { lat: 53.1192, long: 6.5786 },
    },
    name: "Groningen Airport Eelde",
    city: "Groningen",
    country: "Netherlands",
    iata: "GRQ",
    icao: "EHGG",
  },
  {
    address: {
      full_address: "Luchthavenweg 25, 5657 EA Eindhoven, Netherlands",
      location: { lat: 51.4501, long: 5.3745 },
    },
    name: "Eindhoven Airport",
    city: "Eindhoven",
    country: "Netherlands",
    iata: "EIN",
    icao: "EHEH",
  },
  {
    address: {
      full_address: "Vliegveldweg 345, 3043 NT Rotterdam, Netherlands",
      location: { lat: 51.9556, long: 4.4372 },
    },
    name: "Rotterdam The Hague Airport",
    city: "Rotterdam",
    country: "Netherlands",
    iata: "RTM",
    icao: "EHRD",
  },
  // Norway
  {
    address: {
      full_address: "Edvard Munchs veg, 2061 Gardermoen, Norway",
      location: { lat: 60.193917, long: 11.100361 },
    },
    name: "Oslo Airport",
    city: "Oslo",
    country: "Norway",
    iata: "OSL",
    icao: "ENGM",
  },
  // Poland
  {
    address: {
      full_address: "Zwirki i Wigury 1, 00-906 Warszawa, Poland",
      location: { lat: 52.1657, long: 20.9671 },
    },
    name: "Warsaw Chopin Airport",
    city: "Warsaw",
    country: "Poland",
    iata: "WAW",
    icao: "EPWA",
  },
  // Portugal
  {
    address: {
      full_address:
        "Alameda das Comunidades Portuguesas, 1700-111 Lisboa, Portugal",
      location: { lat: 38.774167, long: -9.134167 },
    },
    name: "Humberto Delgado Airport",
    city: "Lisbon",
    country: "Portugal",
    iata: "LIS",
    icao: "LPPT",
  },
  // Romania
  {
    address: {
      full_address: "Calea Bucureștilor 224E, Otopeni 075150, Romania",
      location: { lat: 44.572161, long: 26.102178 },
    },
    name: "Henri Coandă International Airport",
    city: "Bucharest",
    country: "Romania",
    iata: "OTP",
    icao: "LROP",
  },
  // Russia
  {
    address: {
      full_address: "Khvoynyy 1, Moscow, Russia, 141400",
      location: { lat: 55.972642, long: 37.414589 },
    },
    name: "Sheremetyevo International Airport",
    city: "Moscow",
    country: "Russia",
    iata: "SVO",
    icao: "UUEE",
  },
  // Serbia
  {
    address: {
      full_address: "Aerodrom Beograd 59, Beograd 11180, Serbia",
      location: { lat: 44.819444, long: 20.306944 },
    },
    name: "Belgrade Nikola Tesla Airport",
    city: "Belgrade",
    country: "Serbia",
    iata: "BEG",
    icao: "LYBE",
  },
  // Slovakia
  {
    address: {
      full_address: "Ivanská cesta, 820 01 Bratislava, Slovakia",
      location: { lat: 48.1702, long: 17.2127 },
    },
    name: "M. R. Štefánik Airport",
    city: "Bratislava",
    country: "Slovakia",
    iata: "BTS",
    icao: "LZIB",
  },
  // Slovenia
  {
    address: {
      full_address: "Zgornji Brnik 130A, 4210 Brnik-Aerodrom, Slovenia",
      location: { lat: 46.223611, long: 14.4575 },
    },
    name: "Ljubljana Jože Pučnik Airport",
    city: "Ljubljana",
    country: "Slovenia",
    iata: "LJU",
    icao: "LJLJ",
  },
  // Spain
  {
    address: {
      full_address: "Ctra. Madrid-Barcelona, km. 13, 28042 Madrid, Spain",
      location: { lat: 40.471926, long: -3.56264 },
    },
    name: "Adolfo Suárez Madrid–Barajas Airport",
    city: "Madrid",
    country: "Spain",
    iata: "MAD",
    icao: "LEMD",
  },
  {
    address: {
      full_address:
        "Terminal 1, Avinguda de la Granvia, 08908 L'Hospitalet de Llobregat, Barcelona, Spain",
      location: { lat: 41.297445, long: 2.083294 },
    },
    name: "Barcelona–El Prat Airport",
    city: "Barcelona",
    country: "Spain",
    iata: "BCN",
    icao: "LEBL",
  },
  // Sweden
  {
    address: {
      full_address: "190 45 Stockholm-Arlanda, Sweden",
      location: { lat: 59.651944, long: 17.918611 },
    },
    name: "Stockholm Arlanda Airport",
    city: "Stockholm",
    country: "Sweden",
    iata: "ARN",
    icao: "ESSA",
  },
  // Switzerland
  {
    address: {
      full_address: "8058 Zurich, Switzerland",
      location: { lat: 47.458056, long: 8.555833 },
    },
    name: "Zurich Airport",
    city: "Zurich",
    country: "Switzerland",
    iata: "ZRH",
    icao: "LSZH",
  },
  // Ukraine
  {
    address: {
      full_address: "Boryspil', Kyiv Oblast, Ukraine, 08307",
      location: { lat: 50.345, long: 30.894722 },
    },
    name: "Boryspil International Airport",
    city: "Kyiv",
    country: "Ukraine",
    iata: "KBP",
    icao: "UKBB",
  },
  // United Kingdom
  {
    address: {
      full_address: "Edinburgh EH12 9DN, United Kingdom",
      location: { lat: 55.95, long: -3.3725 },
    },
    name: "Edinburgh Airport",
    city: "Edinburgh",
    country: "United Kingdom",
    iata: "EDI",
    icao: "EGPH",
  },
  {
    address: {
      full_address: "Horley, Gatwick RH6 0NP, United Kingdom",
      location: { lat: 51.153662, long: -0.182063 },
    },
    name: "Gatwick Airport",
    city: "London",
    country: "United Kingdom",
    iata: "LGW",
    icao: "EGKK",
  },
];

export default airports;
