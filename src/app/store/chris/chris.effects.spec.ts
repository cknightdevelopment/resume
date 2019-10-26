import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { ChrisEffects } from './chris.effects';
import { LoadStaticData, LoadStaticDataSuccess } from './chris.actions';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { ChrisService } from 'src/app/core/chris/chris.service';

class MockChrisService {
  facts = [
    'Chris does Crossfit.' ,
    'Chris went to music school for bass guitar.' ,
    'Chris loves stand up comedy.' ,
  ];

  getFacts(): Observable<string[]> {
    return of(this.facts);
  }
}

let actions$: Observable<Action>;

describe('NGRX Effetcs: Chris', () => {
  let facade: ChrisEffects;
  let chrisSvc: MockChrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChrisEffects,
        provideMockActions(() => actions$),
        { provide: ChrisService, useClass: MockChrisService }
      ],
    });

    facade = TestBed.get(ChrisEffects);
    chrisSvc = TestBed.get(ChrisService);
  });

  it('should dispatch load static data on root effects init', () => {
    actions$ = cold('a', { a: { type: ROOT_EFFECTS_INIT } });
    const expected = cold('a', { a: new LoadStaticData() });

    expect(facade.init$).toBeObservable(expected);
  });

  it('should load static data', () => {
    actions$ = cold('a', { a: new LoadStaticData() });
    const expected = cold('a', { a: new LoadStaticDataSuccess({ facts: chrisSvc.facts }) });

    expect(facade.loadStaticData$).toBeObservable(expected);
  });
});