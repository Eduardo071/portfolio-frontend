import { Component, Input } from '@angular/core';
import { PersonalInfo } from '../../models/profile.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input() personal!: PersonalInfo;
}
