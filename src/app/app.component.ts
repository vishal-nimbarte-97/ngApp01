import { Component } from '@angular/core';
import { NetworkService } from './core/services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOnline = true;

  constructor(private networkService: NetworkService) {}

  ngOnInit() {
    this.networkService.networkStatus$.subscribe(status => {
      this.isOnline = status;
    });
  }
}
