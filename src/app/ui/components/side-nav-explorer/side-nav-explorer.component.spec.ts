import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavExplorerComponent } from './side-nav-explorer.component';

describe('SideNavExplorerComponent', () => {
  let component: SideNavExplorerComponent;
  let fixture: ComponentFixture<SideNavExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
