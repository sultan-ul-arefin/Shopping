import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { CoreModule } from '@core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let statusBarSpy: jasmine.Spy;
  let splashScreenSpy: jasmine.Spy;
  let keyboardSpy: jasmine.Spy;

  beforeEach(
    waitForAsync(() => {
      statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
      splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
      keyboardSpy = jasmine.createSpyObj('Keyboard', ['hideFormAccessoryBar']);

      TestBed.configureTestingModule({
        imports: [RouterTestingModule, TranslateModule.forRoot(), CoreModule],
        declarations: [AppComponent],
        providers: [
          { provide: Keyboard, useValue: keyboardSpy },
          { provide: StatusBar, useValue: statusBarSpy },
          { provide: SplashScreen, useValue: splashScreenSpy },
        ],
      }).compileComponents();
    })
  );

  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    }),
    30000
  );
});
