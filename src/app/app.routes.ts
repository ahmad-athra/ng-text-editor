import { Routes } from '@angular/router';
import { QuillComponent } from './quill/quill.component';

export const routes: Routes = [
  {
    path: 'ngx-editor',
    component: QuillComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ngx-editor'
  }
];
