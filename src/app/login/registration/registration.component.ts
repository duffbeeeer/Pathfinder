import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });


    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'login';
  }

  onSubmit() {
    this.submitted = true;
    this.router.navigate([this.returnUrl]);
  }
}
