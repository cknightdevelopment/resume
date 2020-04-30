import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ResumeService } from './resume.service';
import { environment } from 'src/environments/environment';
import { ResumeDataModel } from 'src/app/models/resume/resume-data.model';

describe('ResumeService', () => {
  let resumeSvc: ResumeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ResumeService
      ]
    });

    resumeSvc = TestBed.get(ResumeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(resumeSvc).toBeTruthy();
  });

  it('should get data from local JSON file', () => {
    const response = { facts: ['Fact1', 'Fact2'] } as ResumeDataModel;

    resumeSvc.getData().subscribe(data => expect(data).toEqual(response));

    const req = httpMock.expectOne(environment.dataFile);
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });
});