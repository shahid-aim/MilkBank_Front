import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-file',
  templateUrl: './drag-file.component.html',
  styleUrls: ['./drag-file.component.css']
})
export class DragFileComponent implements OnInit {

  
  error: string='';
  dragAreaClass: string='';
  draggedFiles: any;
  

  constructor() { }

  ngOnInit(): void {
  }

  saveFiles(files: FileList) {

    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      console.log(files[0].size,files[0].name,files[0].type);
      this.draggedFiles = files;
      console.log(files);
    }
  }

}
