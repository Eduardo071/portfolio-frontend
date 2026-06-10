import { Component, Input } from '@angular/core';
import { SkillCategory } from '../../models/profile.model';

@Component({
  selector: 'app-stack',
  standalone: true,
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css',
})
export class StackComponent {
  @Input() skills: SkillCategory[] = [];
}
