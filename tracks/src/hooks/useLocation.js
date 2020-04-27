/*Zabralem funkcje z trackCreateScreen. To jest stworzony hook
Mozliwe do wielokrotnego uzywania. Zadanie pobrac z expo-location obecna lokalizacje, sprawdza czy moze sie polaczyc (lokalizacja udostepniona) jesli nie zwraca blad. Jako parametr otrzymuje funkcje ktora aktualizuje tablice
Dostep do lokalizacji uzytkownika */
import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
      } catch (error) {
        setErr(error);
      }
    };
    if (shouldTrack) {
      startWatching();
    } else {
      //stop watching (musi uzyskac dostep do zmiennej)
      //zastostujemy hook useState
      if (subscriber) {
        subscriber.remove();
      }

      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);
  //drugi argument pusta tablica wykonaj ta funkcje tylko raz
  //a jesli dodamy tam element [shouldTrack] wykona sie za kazdym razem
  //gdy element sie (odswiezy, zmieni sie)
  return [err];
};

//Omówinie sledzenia.
/* Gdy wchodzę na ekran TrackCreateScreen Zdarzenie withNavigationFocus sprawdza czy jestem na tym ekranie. Następnie Laduje sie komponent map. On sprawdza czy state.currentLocation cos przechowuje, wiec czeka na wywolanie funkcji useLocation. useLocation jako parametr dostaje sprawdzenie isFocused i funkcje addlocation. Przechodzimy teraz do useLocation. Tutaj jest wywoływany hook(funckja). useEffect sprawdza czy jestem na TrackCreateScreen (should === true) i wywoluje funckje. Ta uruchamia bibiloteke Expo-location i pobiera aktualna pozycje uzytkownika. I działa nieprzerwanie. Gdy wychodze sie z TrackCreateScreen isFocussed się zmienia i useEffect wykonuje sie ponownie a subsrciber.remove zatrzymuje bibiloteke Expo.location.
Teraz zaczyna sie problem z callback function. Dostaje nowy stan ale on nie jest aktualizowany. Aby temu zaradzić używam useCallback i tam wrzucam moja funkcje. Ponadto muszę to wywoływać useEffect przy zmianie stanu więc jako drugi parametr dodaje tą funkcje. Ustawiam return i zatrzymuje. W dużym uproszczeniu. Mam tutaj problem z ciągłym wywoływaniem funkcji. Tworzeniem nowej tablicy w pamieci ? A ponadto ciagle wywolywanie metody expo.location. Te opisane zmiany mają temu zaradzić. Te wyżej.*/
/*Aktualizacja pokazał dwa rozwiązania ze spoleczności react na temat problemow ze stanami. Odcinek 58 folder 15in-app authentication*/
