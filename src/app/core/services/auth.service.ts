import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(payload: { username: string; password: string }) {
    return this.http.post<any>(`${this.API}/auth/login`, payload).pipe(

      // ✅ Success handling
      tap(res => {
        if (res.success && res.data?.accessToken) {
          localStorage.setItem('token', res.data.accessToken);
        }
      }),

      // ❌ Error handling using RxJS
      catchError((error: HttpErrorResponse) => {
        let message = 'Something went wrong. Please try again.';

        // Backend error
        if (error.error?.message) {
          message = error.error.message;
        }
        // Network / CORS / server down
        else if (error.status === 0) {
          message = 'Network error. Please check your internet connection.';
        }

        return throwError(() => message);
      })
    );
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
