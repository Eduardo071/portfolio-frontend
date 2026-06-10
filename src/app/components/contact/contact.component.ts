import { Component, Input, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PersonalInfo } from '../../models/profile.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  @Input() personal!: PersonalInfo;

  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  status = signal<'idle' | 'sending' | 'success' | 'error'>('idle');

  form = this.fb.nonNullable.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(4)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.status.set('sending');
    this.contactService.send(this.form.getRawValue()).subscribe({
      next:  () => { this.status.set('success'); this.form.reset(); },
      error: () => this.status.set('error'),
    });
  }

  hasError(field: string) {
    const c = this.form.get(field);
    return c?.invalid && c?.touched;
  }
}
