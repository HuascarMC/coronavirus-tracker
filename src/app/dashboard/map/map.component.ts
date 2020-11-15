import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { MapInfoWindow, MapMarker } from "@angular/google-maps";

@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
    @Input() latitude: number;
    @Input() longitude: number;

    center = { lat: 24, lng: 12 };

    markerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [];
    zoom = 7;
    display?: google.maps.LatLngLiteral;
    options: google.maps.MapOptions = {
        mapTypeId: "roadmap",
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        maxZoom: 27,
        styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{ color: "#746855" }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }]
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }]
            }
        ]
    };
    ngOnInit() {}

    ngOnChanges() {
        if (this.latitude && this.longitude) {
            this.center = {
                lat: this.latitude,
                lng: this.longitude
            };
        }
    }
    addMarker(event: google.maps.MouseEvent) {
        this.markerPositions.push(event.latLng.toJSON());
    }

    move(event: google.maps.MouseEvent) {
        this.display = event.latLng.toJSON();
    }

    openInfoWindow(marker: MapMarker) {
        this.infoWindow.open(marker);
    }

    removeLastMarker() {
        this.markerPositions.pop();
    }
}
