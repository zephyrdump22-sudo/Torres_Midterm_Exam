import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { CityService, SavedCity } from '../services/city.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  cityName: string = '';
  weather: any = null;
  errorMessage: string = '';
  saveMessage: string = '';

  constructor(private weatherService: WeatherService, private cityService: CityService) {}

  async fetchWeather() {
    this.errorMessage = '';
    this.saveMessage = '';
    this.weather = null;

    if (!this.cityName.trim()) {
      this.errorMessage = 'Please enter a city name.';
      return;
    }

    try {
      this.weather = await this.weatherService.getWeather(this.cityName.trim());
    } catch (error: any) {
      this.errorMessage = error?.error?.message || 'Could not fetch weather data.';
    }
  }

  saveCity() {
    if (this.weather) {
      this.cityService.addCity({
        name: this.weather.name,
        temperature: this.weather.main.temp
      });
      this.saveMessage = `Saved ${this.weather.name} successfully!`;
    }
  }
}