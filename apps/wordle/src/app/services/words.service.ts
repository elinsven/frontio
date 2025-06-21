import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WordsResponse } from '../types';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
 private readonly http = inject(HttpClient);

 readonly url = "https://cheaderthecoder.github.io/5-Letter-words/words.json"

 getWords(): Observable<WordsResponse> {
   return this.http.get<WordsResponse>(this.url)
  }
}
