import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../registration/registration.service';
import { RegisterDetails } from '../models/register-details';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      studentName: ['', Validators.required],
      studentEmail: ['', [Validators.required, Validators.email]],
      studentNumber: ['', Validators.required],
    });
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      let registration = this.registrationService.getRegistration(id);

      if (registration) this.registerForm.patchValue(registration);
    }
  }
  onSubmit() {
    if (this.registerForm.valid) {
      let registration: RegisterDetails = this.registerForm.value;

      let id = this.activatedRoute.snapshot.paramMap.get('id');

      if (id) {
        // Update
        this.registrationService.updateRegistration(id, registration);
      } else {
        // New
        this.registrationService.addRegistration(registration);
      }

      this.router.navigate(['/list']);
    }
  }
}
