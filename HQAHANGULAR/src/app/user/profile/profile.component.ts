import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


// import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { MatDialog } from '@angular/material';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })

// export class ProfileComponent implements OnInit {
//   @ViewChild('profileInfo', {static: false}) profileInfo: TemplateRef<any>;

//   profileUrl = 'assets/images/profile.png' as any;
//   constructor(
//     private dialog: MatDialog,
//   ) { }

//   ngOnInit() {
//   }

//   onProfileChange(event) {
//     if (event.target.files.length > 0) {
//       const reader = new FileReader();
//       reader.onload = (newEvent: ProgressEvent) => {
//         this.profileUrl = (newEvent.target as FileReader).result;
//       };
//       reader.readAsDataURL(event.target.files[0]);
//     }
//   }

//   displayProfile() {
//     const dialogRef = this.dialog.open(this.profileInfo, { width: '600px' });
//   }


// }
