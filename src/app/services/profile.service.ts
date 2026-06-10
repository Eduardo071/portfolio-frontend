import { Injectable, inject, makeStateKey, TransferState, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Profile } from '../models/profile.model';

const PROFILE_KEY = makeStateKey<Profile>('profile');

const STATIC_PROFILE: Profile = {
  personal: {
    name: 'Eduardo Borges',
    firstName: 'Eduardo',
    lastName: 'Borges',
    title: 'Backend Engineer II',
    company: 'PicPay',
    location: 'Uberlândia, MG',
    bio: `<p>Desenvolvedor Backend com foco em sistemas de <strong>alta disponibilidade</strong>
          e alto volume no setor de pagamentos digitais. Atualmente Backend Engineer II na
          <strong>PicPay</strong>, uma das maiores fintechs do Brasil.</p>
          <p>Sólida experiência em arquitetura de microsserviços com <strong>Java &amp; Spring Boot</strong>,
          mensageria assíncrona com <strong>Apache Kafka</strong> e <strong>Amazon SQS</strong>,
          e background fullstack com <strong>Angular + TypeScript</strong>.</p>
          <p>Atuo com autonomia, forte <em>ownership</em> e comprometimento com boas práticas:
          <strong>SOLID, Clean Code</strong> e arquitetura evolutiva orientada ao negócio.</p>`,
    email: 'eduardoborges.developer@gmail.com',
    linkedin: 'https://linkedin.com/in/eduardopereiraborges',
    phone: '+5534993398973',
    available: true,
  },
  experience: [
    {
      company: 'PicPay',
      location: 'Remoto',
      roles: [
        { title: 'Backend Engineer II', period: 'Jul/2025 – Presente', current: true },
        { title: 'Backend Engineer I',  period: 'Ago/2024 – Jun/2025', current: false },
      ],
      bullets: [
        'Desenvolve e mantém microsserviços com Java e Spring Boot em ambiente de <strong>alta escala</strong>, garantindo disponibilidade e performance em produção',
        'Atua com autonomia e forte <strong>ownership</strong> na resolução de problemas complexos, conduzindo iniciativas de ponta a ponta',
        'Colabora com times multidisciplinares na evolução da arquitetura de microsserviços, assegurando integração confiável entre sistemas',
        'Suporte à produção: identificação e resolução de incidentes, reduzindo instabilidades e melhorando confiabilidade',
      ],
      tags: ['Java', 'Spring Boot', 'Microsserviços', 'Kafka', 'Amazon SQS', 'AWS', 'REST APIs'],
    },
    {
      company: 'Ibrowse Consultoria e Informática',
      location: 'Uberlândia, MG · Presencial',
      roles: [
        { title: 'Desenvolvedor de Software Júnior', period: 'Out/2023 – Ago/2024', current: false },
      ],
      bullets: [
        'Atuou como desenvolvedor <strong>fullstack</strong>: backend com Java/Spring Boot e frontend com Angular/TypeScript',
        'Projetou e consumiu APIs REST, garantindo integração eficiente entre camadas da aplicação',
        'Escrita de testes unitários, correção de bugs e manutenção de código legado',
        'Modelagem e consultas com PostgreSQL em ambiente relacional',
      ],
      tags: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'PostgreSQL', 'JUnit'],
    },
  ],
  skills: [
    { name: 'Backend',       icon: '⚙️', primary: ['Java', 'Spring Boot'],   secondary: ['Spring MVC', 'Spring Security', 'Spring Data JPA'] },
    { name: 'Frontend',      icon: '🖥',  primary: ['Angular', 'TypeScript'], secondary: ['JavaScript'] },
    { name: 'Mensageria',    icon: '📨', primary: ['Apache Kafka'],           secondary: ['Amazon SQS'] },
    { name: 'Banco de Dados',icon: '🗄', primary: ['PostgreSQL'],             secondary: ['MongoDB', 'Redis'] },
    { name: 'Cloud & Infra', icon: '☁️', primary: ['AWS'],                   secondary: ['Amazon S3', 'ElastiCache', 'Docker'] },
    { name: 'Testes',        icon: '🧪', primary: [],                        secondary: ['JUnit', 'Mockito', 'Jest'] },
    { name: 'Arquitetura',   icon: '🏛', primary: ['Microsserviços'],         secondary: ['REST APIs', 'SOLID', 'Clean Code'] },
    { name: 'Ferramentas',   icon: '🛠',  primary: [],                        secondary: ['Git', 'Scrum', 'Kanban'] },
  ],
  education: [
    { degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas', institution: 'UNIPAC — Centro Universitário Presidente Antônio Carlos', period: 'Mar/2023 – Jun/2025', icon: '🎓' },
    { degree: 'Formação Fullstack — DevQuest', institution: 'Dev em Dobro · JavaScript, TypeScript, Angular, Node.js, Jest, CI/CD', period: 'Jan/2022 – Jan/2023', icon: '📜' },
  ],
};

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http         = inject(HttpClient);
  private readonly transferState = inject(TransferState);
  private readonly platformId   = inject(PLATFORM_ID);

  getProfile(): Observable<Profile> {
    if (this.transferState.hasKey(PROFILE_KEY)) {
      const cached = this.transferState.get(PROFILE_KEY, null)!;
      this.transferState.remove(PROFILE_KEY);
      return of(cached);
    }

    return this.http.get<Profile>(`${environment.apiUrl}/api/profile`).pipe(
      tap(profile => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(PROFILE_KEY, profile);
        }
      }),
      catchError(() => of(STATIC_PROFILE))
    );
  }
}
