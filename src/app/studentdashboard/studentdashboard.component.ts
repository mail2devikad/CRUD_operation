import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './studentdashboard.model';

@Component({
  selector: 'app-studentdashboard',
  templateUrl: './studentdashboard.component.html',
  styleUrls: ['./studentdashboard.component.css']
})
export class StudentdashboardComponent implements OnInit {
  formValue !:FormGroup;
  studentModelObj:StudentModel=new StudentModel();
  studentData !:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      phone:[''],
      grade:['']
    })
    this.getAllStudent();
  }

  clickAddStudent(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postStudentDetails(){
    this.studentModelObj.firstName=this.formValue.value.firstName;
    this.studentModelObj.lastName=this.formValue.value.lastName;
    this.studentModelObj.email=this.formValue.value.email;
    this.studentModelObj.phone=this.formValue.value.phone;
    this.studentModelObj.grade=this.formValue.value.grade;

    this.api.postStudent(this.studentModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Student Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    },
    err=>{
      alert("Something went wrong")
    }
    )
  }
  getAllStudent(){
    this.api.getStudent()
    .subscribe(res=>{
      this.studentData=res;
    })
  }

 
  deleteStudent(row:any){
    this.api.deleteStudent(row.id)
    .subscribe(res=>{
      alert("Employee deleted successfully");
      this.getAllStudent();
    })
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.studentModelObj.id=row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['grade'].setValue(row.grade);
  }

  updateStudentDetails(){
    this.studentModelObj.firstName=this.formValue.value.firstName;
    this.studentModelObj.lastName=this.formValue.value.lastName;
    this.studentModelObj.email=this.formValue.value.email;
    this.studentModelObj.phone=this.formValue.value.phone;
    this.studentModelObj.grade=this.formValue.value.grade;

    this.api.updateStudent(this.studentModelObj,this.studentModelObj.id)
    .subscribe(res=>{
      alert("updated successfully")
      console.log(res);
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllStudent();
    })
  }
}
