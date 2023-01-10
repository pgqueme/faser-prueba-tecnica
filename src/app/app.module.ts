import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
// importacion de la libreria FormsFomule
import { FormsModule } from '@angular/forms';
@NgModule({
	declarations: [
		AppComponent
	],
	// se importo FormsModule
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule
	],
	providers: [ AppService ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
