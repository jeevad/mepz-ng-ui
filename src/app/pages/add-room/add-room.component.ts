import { Component, OnInit } from '@angular/core';
import {RoomService} from 'src/app/service/room/room.service';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent  implements OnInit{
  roomData:any;
  active:any = ['Active','Inactive']
  message='';
  messageclass ='';
  error:boolean = false;
  isEdit:boolean = false;
  roomid:any;
  editdata:any;
  submitted:boolean = false;
  addRoom!:FormGroup;


constructor(private room : RoomService,private router:Router,private route:ActivatedRoute,private formBuilder:FormBuilder ) {}

  ngOnInit(): void {
    console.log("ngOnint");
    this.roomid = this.route.snapshot.paramMap.get('id');
    console.log(this.roomid);
    this.route.params.subscribe(param=>{
      if(param && param['id']){
        console.log("Param >> ",param['id']);
        this.room.LoadbyID(param['id']).subscribe(resp=>{
          this.isEdit = true;
          this.addRoom.patchValue(resp);
        })
      }
    })
    this.addRoom = this.formBuilder.group({
      'roomcode':['',Validators.required],
      'roomname':['',Validators.required],
      'active' : ['']
    })
  }

//   SaveData(){
//     this.room.SaveData(this.addRoom.value).subscribe(result =>{
//       console.log(this.addRoom.value);
//   });

// }
// SaveData(){
//       if(this.addRoom.valid){
//             this.room.SaveData(this.addRoom.value).subscribe(result => {
//               // console.log(result);
//               if(result != null){
//                  this.error=false;
//                 this.router.navigate(['/room-detail']);
//               }
//             });
//           } else{
//             this.error=true;
//             this.message="please enter valid data"
//             this.messageclass = "error"
//             console.log("ere")
//           }
//     }

    // SaveData(){
    //   if(!this.isEdit){
    //     this.room.SaveData(this.addRoom.value).subscribe(result => {
    //       console.log(result);
    //       if(result != null){
    //         this.error=false;
    //          this.router.navigate(['/room-detail']);
    //        }
    //     });
    //   } else if(this.isEdit){
    //   console.log(this.isEdit);
    //   console.log(this.roomid,this.editdata);
    //     this.updateRecord(this.roomid,this.editdata);  
    //     this.router.navigate(['/room-detail']);
    //   }
    //    else {
    //      this.message="please enter valid data"
    //       this.messageclass = "error"
    // }
     
    // }  

    SaveData(){
      if(!this.isEdit){
        this.submitted = true;
        if(this.addRoom.valid){
          this.room.SaveData(this.addRoom.value).subscribe(result => {
            console.log("result",result);
            this.router.navigate(['/room-detail']);
          });
        }
      }else if(this.isEdit){
        this.submitted = true;
        if(this.addRoom.valid){
          this.room.update(this.roomid,this.addRoom.value).subscribe(data =>{
            this.isEdit=false;
            this.router.navigate(['/room-detail']);
          })
        }
      }
    }
  
  change(e: any) {
    this.active?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
}
