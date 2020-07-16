import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  
  product:Product = {
    id: null,
    name:'',
    price: null
  }

  constructor(
     private productService: ProductService,
     private router: Router,
     private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.productService.readById(id).subscribe( product =>{
      this.product = product
    })
  }

  cancel():void{
    this.router.navigate(['/products'])
  }

  updateProduct(){
    this.productService.update(this.product).subscribe(()=>{
      this.productService.showMessage("Produto atualizado com sucesso!");
      this.router.navigate(['/products']);
    })
  }


}
