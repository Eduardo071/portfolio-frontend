import { Component, OnInit, signal, inject } from '@angular/core';
import { NavComponent }        from './components/nav/nav.component';
import { HeroComponent }       from './components/hero/hero.component';
import { AboutComponent }      from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { StackComponent }      from './components/stack/stack.component';
import { EducationComponent }  from './components/education/education.component';
import { ContactComponent }    from './components/contact/contact.component';
import { ProfileService }      from './services/profile.service';
import { Profile }             from './models/profile.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavComponent, HeroComponent, AboutComponent,
    ExperienceComponent, StackComponent, EducationComponent, ContactComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly profileService = inject(ProfileService);
  profile = signal<Profile | null>(null);

  ngOnInit() {
    this.profileService.getProfile().subscribe(p => this.profile.set(p));
  }
}
