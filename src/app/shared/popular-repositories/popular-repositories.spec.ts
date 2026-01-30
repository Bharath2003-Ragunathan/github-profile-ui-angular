import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularRepositories } from './popular-repositories';

describe('PopularRepositories', () => {
  let component: PopularRepositories;
  let fixture: ComponentFixture<PopularRepositories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularRepositories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularRepositories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
