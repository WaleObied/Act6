import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { C404Component } from "./components/c404/c404.component";
import { HomeComponent } from "./components/home/home.component";
import { UserDetailsComponent } from "./components/home/user-details/user-details.component";
import { UserFormComponent } from "./components/user-form/user-form.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'user/:id', component: UserDetailsComponent},
    {path: 'update/:userid', component: UserFormComponent},
    {path: 'newuser', component: UserFormComponent},
    {path: '**', component: C404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

