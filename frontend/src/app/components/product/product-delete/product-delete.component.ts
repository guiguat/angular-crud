import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe(product =>{
      this.product = product
    })
  }

  deleteProduct(id:string){
    this.productService.delete(id).subscribe(()=>{
      this.snackBar.open('Produto deletado com sucesso', '', 
        {
          duration:3000,
          horizontalPosition:"right",
          verticalPosition:"top"
        }
      )
      this.router.navigate(['/products'])
    })
    
  }

  cancel(){
    this.router.navigate(['/products'])
  }
}
