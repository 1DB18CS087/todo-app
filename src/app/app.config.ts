import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {
        path: '',
        component: TodoComponent,
      },
    ]),
  ],
};
