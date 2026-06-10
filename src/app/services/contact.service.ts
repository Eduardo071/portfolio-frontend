import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ContactRequest, ContactResponse } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(request: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${environment.apiUrl}/api/contact`, request).pipe(
      timeout(35000)
    );
  }
}
