import {APP_INITIALIZER, NgModule} from '@angular/core';
import {ConfigService} from "./config.service";
import {take} from "rxjs";



@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (config: ConfigService) => {
        return () => {
          config.fetchEndpoints();
          return config.api$.pipe(take(1))
        }
      },
      deps: [ConfigService]
    }
  ]
})
export class InitializerModule { }
