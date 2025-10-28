import { Injectable } from '@angular/core';

export interface SavedCity {
  name: string;
  temperature: number;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cities: SavedCity[] = [];

  constructor() {
    const data = localStorage.getItem('savedCities');
    if (data) {
      this.cities = JSON.parse(data);
    }
  }

  getCities(): SavedCity[] {
    return this.cities;
  }

  addCity(city: SavedCity): void {
    if (!this.cities.some(c => c.name.toLowerCase() === city.name.toLowerCase())) {
      this.cities.push(city);
      this.saveToStorage();
    }
  }

  removeCity(name: string): void {
    this.cities = this.cities.filter(c => c.name.toLowerCase() !== name.toLowerCase());
    this.saveToStorage();
  }

  private saveToStorage() {
    localStorage.setItem('savedCities', JSON.stringify(this.cities));
  }
}