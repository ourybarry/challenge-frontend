import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesISharedComponent } from './files-i-shared.component';

describe('FilesISharedComponent', () => {
  let component: FilesISharedComponent;
  let fixture: ComponentFixture<FilesISharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesISharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesISharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
