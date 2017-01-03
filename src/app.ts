export interface ILocation {
  lat: number;
  lng: number;
  name: string;
  desc?: string[];
}

export class GbMap {
  private gmap: google.maps.Map;
  private infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();

  constructor(private element: HTMLElement) {
    this.gmap = new google.maps.Map(element, { center: new google.maps.LatLng(30, 0), zoom: 2 });
  }

  public init(): void {
    this.getLocations().then((locations) => {
      let bounds = new google.maps.LatLngBounds();

      locations.forEach((location) => {
        let latlng = new google.maps.LatLng(location.lat, location.lng);
        let marker = new google.maps.Marker({
          map: this.gmap,
          position: latlng,
          title: `${location.name} (${latlng.toString()})`,
        });
        bounds.extend(latlng);
        marker.addListener("click", () => this.markerClick(marker, location));
      });

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
  private getLocations(): Promise<ILocation[]> {
    let events: ILocation[] = [

      {
        desc: ["Maecenas sit amet turpis id tellus vulputate dignissim."],
        lat: 41.7325, lng: -49.9489,
        name: "RMS Titanic",
      },
      {
        desc: ["Phasellus ut massa at leo lacinia imperdiet nec in nisl."],
        lat: 60.916, lng: 101.95,
        name: "Tunguska Event",
      },
      {
        desc: ["Aliquam accumsan est id ante mollis sollicitudin."],
        lat: 7.705, lng: -59.9061,
        name: "Jonestown Suicide",
      },
      {
        desc: ["Donec elementum lorem eu risus scelerisque congue."],
        lat: 34.424, lng: -118.643,
        name: "Spahn Ranch",
      },
      {
        desc: ["In eu erat convallis, molestie ante non, blandit dui."],
        lat: 36.4511, lng: 28.2278,
        name: "Colossus of Rhodes",
      },
      {
        desc: [
          "Nunc imperdiet neque eget nunc pharetra, eu imperdiet lorem ultrices.",
          "In eu erat convallis, molestie ante non, blandit dui.",
        ],
        lat: 35.939, lng: -75.709,
        name: "Roanoke Colony",
      },
      {
        desc: ["Phasellus condimentum diam sit amet eros dapibus facilisis."],
        lat: 34.017, lng: -118.333,
        name: "The Black Dahlia Murder",
      },
      {
        desc: ["Nulla vel erat sit amet ex pretium finibus."],
        lat: 10.3136, lng: 124.0153,
        name: "Death of Ferdinand Magellan",
      },
      {
        desc: ["Mauris molestie metus nec tortor efficitur, eu eleifend quam imperdiet."],
        lat: -25.0687, lng: -130.0951,
        name: "HMS Bounty",
      },
      {
        desc: ["Ut facilisis nunc sed ex dignissim, a rutrum erat sodales."],
        lat: 32.779, lng: -96.809,
        name: "John F. Kennedy Assassination",
      },
    ];
    return new Promise<ILocation[]>((resolve, reject) => {
      resolve(events.filter((e) => e.lat !== 0));
    });
  }

  private markerClick(marker: google.maps.Marker, loc: ILocation) {
    let desc = loc.desc.map((dd) => `<p>${dd}</p>`).join("");
    let content = `<div class="infow">
    <h1>${loc.name}</h1>
    <div class="body">${desc}</div>
    <div class="source">
    <a target="_new" href="http://www.historicmysteries.com">historicmysteries.com</a>
    </div>
    </div>`;
    this.infoWindow.setContent(content);
    this.infoWindow.open(this.gmap, marker);
  }
}
