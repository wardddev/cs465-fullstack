import { Component, OnInit } from '@angular/core';
import { trips } from '../data/trips';
import { JsonPipe } from '@angular/common'; // v18 Angular requires


@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Array<any> = trips;

  constructor() {}

  ngOnInit(): void {

  }
}
