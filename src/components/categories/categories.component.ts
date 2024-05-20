import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/class/category';
import { CategoryService } from 'src/service/category.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
    allCategories:Array<Category> = []
    newCategory:FormGroup = new FormGroup({})
    hidden:boolean = true
    constructor(public categoryS:CategoryService, public router:Router, public userS:UserService){}

    ngOnInit() {
      this.categoryS.getAll().subscribe(
        suc => {
          this.categoryS.allCategories = suc
          console.log(this.categoryS.allCategories)
        },
        err => {
          console.log(err)
        }
      )
      this.hidden = true
      this.restart()
    }

    restart() {
      this.newCategory = new FormGroup({
        "name":new FormControl(null, [Validators.required, Validators.pattern("[א-ת ]*")])
      })
    }

    get getName() {
      return this.newCategory.controls["name"]
    }

    add() {
      if(!this.getName.invalid && this.userS.currentUser.isAdvertiser) {
        this.categoryS.create(this.newCategory.value).subscribe(
          suc => {
            this.categoryS.allCategories.push(suc)
            alert("הקטגוריה נוספה בהצלחה")
          },
          err => {
            alert(err.message)
          }
        )
        
      }
      else {
        alert("לא ניתן לבצע שמירה")
      }
    }

}
