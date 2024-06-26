import { MessageService } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { GetAllProductsResponse } from 'src/app/Models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashbord-home',
  templateUrl: './dashbord-home.component.html',
  styleUrls: [],
})
export class DashbordHomeComponent implements OnInit , OnDestroy {
  private destroy$ = new Subject<void>();

  public productsList: Array<GetAllProductsResponse> = [];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private produtsDtService: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productsService.getAllProducts()
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.productsList = response;
          this.produtsDtService.setProductsDatas(this.productsList);
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao Buscar Produtos',
          life: 2500,
        });
      },
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
