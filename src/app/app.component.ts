import { Component } from '@angular/core';
import { RxjsLoggingLevel, setLoggingLevel } from './common/debug';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setLoggingLevel(RxjsLoggingLevel.ERROR);
  }
}
