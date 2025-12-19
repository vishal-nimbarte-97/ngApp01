import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;
  error = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submit() {
  if (this.loginForm.invalid) return;

  this.loading = true;
  this.error = '';

  this.auth.login(this.loginForm.value as any).subscribe({
    next: () => {
      this.router.navigate(['/dashboard']);
      this.loading = false;
    },
    error: (err) => {
      // Extract backend error message if available
      if (err.error?.message) {
        this.error = err.error.message;
      } else {
        this.error = 'Something went wrong';
      }
      this.loading = false;
    }
  });
}

}
