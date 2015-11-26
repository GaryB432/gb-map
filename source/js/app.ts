/// <reference path="../../typings/tsd.d.ts" />

namespace GbMap {
  export interface ILocation {
    lat: number;
    lng: number;
    name: string;
  }

  export class Boxer {
    getContainingBounds(latlngs: google.maps.LatLng[] = []): google.maps.LatLngBounds {
      let bounds = new google.maps.LatLngBounds();
      latlngs.forEach((latLng) => bounds.extend(latLng));
      return bounds;
    }
  }

  export class Map {
    private gmap: google.maps.Map;

    constructor(private element: HTMLElement) {
      this.gmap = new google.maps.Map(element, { center: new google.maps.LatLng(30, 0), zoom: 2 });
    }

    private markerClick(loc: ILocation) {
      console.log(loc);
    }

    init(): void {
      this.getLatLngs().then((locations) => {

        let bounds = new google.maps.LatLngBounds();

        locations.forEach((location) => {
          let latlng = new google.maps.LatLng(location.lat, location.lng);
          let marker = new google.maps.Marker({
            position: latlng,
            map: this.gmap,
            title: `${location.name} (${latlng.toString() })`
          })
          bounds.extend(latlng);
          marker.addListener("click", () => this.markerClick(location));
        })

        this.gmap.fitBounds(bounds);
      });
    }
    /*
    http://www.historicmysteries.com/google-earth-coordinates-historic/
    1. RMS Titanic Coordinates: 41.7325° N, 49.9469° W
    2. Tunguska Event Coordinates: 60°54’59″N, 101°57’0″E
    3. Jonestown Suicide Coordinates: 7.7050° N, 59.9061° W
    4. Spahn Ranch Coordinates: 34.2728° N, 118.6230° W
    5. Colossus of Rhodes Coordinates: 36.4511° N, 28.2278° E
    6. Roanoke Colony Coordinates: 35°56’18.79″N, 75°42’33.74″W
    7. The Black Dahlia Murder Coordinates: 34° 0’59.62″N, 118°19’58.81″W
    8. Death of Ferdinand Magellan Coordinates:  10°18’49.03″N, 124° 0’55.15″E
    9. HMS Bounty Coordinates: 25.0687° S, 130.0951° W
    10. John F. Kennedy Assassination Coordinates:  32°46’44.57″N,  96°48’31.17″W
    */
    private getLatLngs(): Promise<ILocation[]> {
      let events: ILocation[] = [

        { lat: 41.7325, lng: -49.9489, name: "RMS Titanic" },
        { lat: 60.916, lng: 101.95, name: "Tunguska Event" },
        { lat: 7.705, lng: -59.9061, name: "Jonestown Suicide" },
        { lat: 34.424, lng: -118.643, name: "Spahn Ranch" },
        { lat: 36.4511, lng: 28.2278, name: "Colossus of Rhodes" },
        { lat: 35.939, lng: -75.709, name: "Roanoke Colony" },
        { lat: 34.017, lng: -118.333, name: "The Black Dahlia Murder" },
        { lat: 10.3136, lng: 124.0153, name: "Death of Ferdinand Magellan" },
        { lat: -25.0687, lng: -130.0951, name: "HMS Bounty" },
        { lat: 32.779, lng: -96.809, name: "John F. Kennedy Assassination" }
      ];
      return new Promise<ILocation[]>((resolve, reject) => {
        if (true) {
          resolve(events.filter((e) => e.lat !== 0));
        }
        else {
          reject(Error("It broke"));
        }
      });
    }
  }

}

document.addEventListener("DOMContentLoaded", () => new GbMap.Map(document.getElementById("map")).init(), false);
