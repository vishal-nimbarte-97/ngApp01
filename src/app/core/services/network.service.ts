import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private online$ = new BehaviorSubject<boolean>(navigator.onLine);

  constructor(private zone: NgZone) {
    this.monitorNetwork();
  }

  private monitorNetwork() {
    this.zone.runOutsideAngular(() => {
      const online$ = fromEvent(window, 'online').pipe(mapTo(true));
      const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));

      merge(online$, offline$).subscribe(status => {
        this.zone.run(() => this.online$.next(status));
      });
    });
  }

  get networkStatus$(): Observable<boolean> {
    return this.online$.asObservable();
  }

  isOnline(): boolean {
    return this.online$.value;
  }
}
