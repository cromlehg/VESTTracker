import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, from, of, defer, combineLatest, BehaviorSubject } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Result } from '../models';
import { LoggerService } from './logger.service';

@Injectable()
export class ChainParserService {

  private apiEndpointSource = new BehaviorSubject<string>(environment.chainParserUrl);

  public apiEndpoint$ = this.apiEndpointSource.asObservable();
  public eos: any;

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  setApiEndpoint(url: string) {
    this.apiEndpointSource.next(url);
  }

  // Note: to convert chain promise to cold observable, use defer

  private getResult<T>(source$: Observable<T>): Observable<Result<T>> {
    return source$.pipe(
      map(data => {
        return {
          isError: false,
          value: data
        };
      }),
      catchError(error => {
        this.logger.error('CHAIN_ERROR', error);
        return of({
          isError: true,
          value: error
        });
      })
    );
  }

  getTxs(): Observable<any> {
    return this.getResult(this.http.get(environment.chainParserUrl + '/txs/recent'));
  }


}
