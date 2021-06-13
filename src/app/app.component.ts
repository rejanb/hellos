import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FontApiService } from './font-api.service';
import { defineFont } from '@progress/kendo-drawing/pdf';
import {Observable} from 'rxjs';

defineFont({
  'Verdana'             : 'https://fonts.googleapis.com/css?family=limelight',
})
var hello ;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  data = new Array();
  workbook:XLSX.WorkBook;
  sheetlists = new Array();
  element;

  fonts: any = [];
  font = new Array();
//Filtered Fonts List 
  filteredOptions;

  //include exclute
  salutations:string = "false";

  salutationss = true;
  //set the positon of the fonts 
  setPosition:string="false";

  //name of generated pdf 
  public name:String="hello"
  //excel sheets
  selectedExcel;
  //sheets in the excel file 
  selectedSheet:number;
  //certificate hight width
  certificateHeight:number;
  certificateWidth:number;
  //font variables
  fontFamilyInput: string="";
  fontUri: string = null;
  fontBold: string = 'normal';
  fontStyle: string = 'normal';
  fontUnderline: string = 'blink';
  fontSizes = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
    67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  ];
  selectedFontSize: number;

  //for color disable number
  colorbutton:boolean= true;


  //image border

  //sidebar
  opened = false; //siderbar
  url; //image url
  rotation = 0;

  // defining form Group
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private fontApi: FontApiService) {}
  ngOnInit() {
    this.initForm()
    
    return this.fontApi.fontApi().subscribe((data) => {
      this.fonts=data
      for (const iterator of this.fonts.items) {
        this.font.push(iterator.family)
    }this.filteredOptions = this.font});
    

  }
  initForm(){
    this.myForm = this.fb.group({
      image: [''], 
      sheet: [''],
      fonts:['']
    });

    this.myForm.get('fonts').valueChanges.subscribe(response =>{
      this.filerFonts(response);
    })

    this.myForm.valueChanges.subscribe(console.log);


  }
  

  filerFonts(enteredData){
    this.filteredOptions = this.font.filter(items=>{return items.toLowerCase().indexOf(enteredData.toLowerCase()) > -1})
  }

  myFunction() {}
  // excel file
  onFileChange(evt: any) {
    const target: DataTransfer = evt.target as DataTransfer;
    this.selectedExcel = target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }

    const reader = new FileReader();
     reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {

      //read workbook
      const bstr: string = e.target.result;
      this.workbook = XLSX.read(bstr, { type: 'binary' });
     
      // grab the sheet list 

       this.sheetlists  = this.workbook.SheetNames;

       /* grab first sheet */
       const wsname: string = this.workbook.SheetNames[0];
       const ws: XLSX.WorkSheet = this.workbook.Sheets[wsname];
       this.data = XLSX.utils.sheet_to_json(ws, { header: 0 });
       this.data = this.data.map((value) => { return { ...value, Salu: value.Age.includes("Male") ? "Mr." : "Mrs." } } )
       document.getElementById('text').textContent= `${this.data[0].Salu} ${this.data[0].Name} `
  
    };
  // 
  }

  // selectedSheet
  selectChange(){
    if(this.selectedExcel){}{
      const wsname: string = this.workbook.SheetNames[this.selectedSheet];
      const ws: XLSX.WorkSheet = this.workbook.Sheets[wsname];
      this.data = XLSX.utils.sheet_to_json(ws, { header: 0 });
      this.data = this.data.map((value) => { return { ...value, Salu: value.Age.includes("M") || value.Age.includes("m") || value.Age.includes("Male") || value.Age.includes("male") ? "Mr." : value.Age.includes("F") || value.Age.includes("f") || value.Age.includes("Female") || value.Age.includes("female") ?"Mrs.": ""} } )
     if (this.salutationss) {
      document.getElementById('text').textContent= `${this.data[0].Salu} ${this.data[0].Name}`
       
     } else {
      document.getElementById('text').textContent= ` ${this.data[0].Name}`
       
     }
      
      this.data.forEach(element=>{console.log(element.Name)})
    }

  }



  //to load an image in the view
  selectFile(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  //to rotate the image
  rotate() {
    this.rotation += 90; // add 90 degrees, you can change this as you want
    if (this.rotation === 360) {
      // 360 means rotate back to 0
      this.rotation = 0;
    }
    document.getElementById('sidebar').style.transform =`rotate(${this.rotation}deg)`;
  }

  //font change
  update(input) {
    this.fontFamilyInput = input;
    this.fontUri = `https://fonts.googleapis.com/css?family=${this.fontFamilyInput}`;
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', this.fontUri);
    document.head.appendChild(link);
  }

  bold() {
    this.fontBold === 'normal'
      ? (this.fontBold = 'bold')
      : (this.fontBold = 'normal');
  }

  italic() {
    this.fontStyle === 'normal'
      ? (this.fontStyle = 'italic')
      : (this.fontStyle = 'normal');
  }

  underline() {
    this.fontUnderline === 'blink'
      ? (this.fontUnderline = 'underline 1px')
      : (this.fontUnderline = 'blink');
  }

  resize(height, width){
    let image=document.getElementById('certificate');
    image.style.height=height+'px' 
    image.style.width=width+'px'
  }

 

  color(colors){  
    let color = document.getElementById('text')
    color .style.color=`#${colors}`;
    console.log('working' + colors)
  }

  exportss(){
    if (this.salutationss ) {
      console.log("this is true ")
      this.exports();
     } else {
      console.log("this is false")
      this.export();
  
     }
      
  }

  exports() {
    let j = 0;

    function a(data) {  
      if (j < data.length) {
        setTimeout(() => {
             document.getElementById('text').textContent= `${data[j].Salu} ${data[j].Name} `;
             document.getElementById('pdfnames').innerHTML =`${data[j].Salu} ${data[j].Name}.pdf`;
             document.getElementById('clickMe').click();
          j++;
          a(data);
        }, 2000);
      }
    }
    a(this.data);
    
  }

  export() {
    let j = 0;

    function a(data) {  
      if (j < data.length) {
        setTimeout(() => {
             document.getElementById('text').textContent= `${data[j].Name} `;
             document.getElementById('pdfnames').innerHTML =`${data[j].Name}.pdf`;
             document.getElementById('clickMe').click();
          j++;
          a(data);
        }, 2000);
      }
    }
    a(this.data);
    
  }
   
  selectFont(event){
    // let path = new URL (event.target.value)
   let path = event.target.files[0];
   var blop = URL.createObjectURL(path);
   console.log(blop)
    // var paths = (window.URL || window.webkitURL).createObjectURL(event);
    // console.log('paths', path);
    // console.log(path);
    // console.log(event);

    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: Verdana;
        src: url(${blop});
      }
    `;

    document.head.appendChild(style);
    document.getElementById('mello').style.fontFamily='Verdana'
  }

  setposition(){
    this.setPosition === "false"
      ? (this.setPosition = "true")
      : (this.setPosition = "false");
  }


  salutation(){
    this.salutationss = ! this.salutationss
    console.log(this.salutationss)

   if (this.salutationss ) {
    console.log("this is true ")
    document.getElementById('text').textContent= `${this.data[0].Salu} ${this.data[0].Name}`


   } else {
    console.log("this is false")
    document.getElementById('text').textContent= ` ${this.data[0].Name}`
   }
    

    // if (this.salutationss = true){
    //   console.log("true")

    //   this.salutationss = ! this.salutationss

    // }
    // if (this.salutationss = false){
     
    //   console.log("false")
    //   this.salutationss = ! this.salutationss


    // }

    

    


  }
  


  

  
}
