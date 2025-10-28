import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityService, SavedCity } from '../services/city.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-saved-cities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saved-cities.html',
  styleUrls: ['./saved-cities.css'],
})
export class SavedCities {
  cities: SavedCity[] = [];

  constructor(private cityService: CityService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadCities();
      }
    });
  }

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.cities = this.cityService.getCities();
    console.log(this.cities)
  }

  removeCity(name: string) {
    this.cityService.removeCity(name);
    this.loadCities();
  }
}