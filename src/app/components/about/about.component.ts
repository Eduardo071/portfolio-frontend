import { Component, Input } from '@angular/core';
import { PersonalInfo } from '../../models/profile.model';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  @Input() personal!: PersonalInfo;
}
