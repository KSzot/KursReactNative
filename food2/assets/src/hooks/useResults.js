import {useEffect, useState} from "react";
import yelp from "../api/yelp";


export default () => {
    
    const[results, setResults] = useState([]);
    const[errorMessage, setErrorMessage] = useState("");

    const searchApi = async searchTerm => {
    try {
        const response = await yelp.get("/search", {
            params: { //dodatkowe doczytac 
                limit: 50,
                term: searchTerm,
                location: "san jose"
            }
        });
        setResults(response.data.businesses);
    } catch(error) {
        setErrorMessage("Something went wrong ;(");
    }
    };

    //Wykona sie tylko raz (najpierw funkcja)
    //pozniej pusta tablica
    //funkcja plus tablica danych/zmienna
    //uruchomi sie za kazdym razem gdy
    //zmienimy dane
    useEffect(() => {
        searchApi("pasta");
    }, []);

    return [searchApi, results, errorMessage];
}