import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PoButtonModule, PoComboFilter, PoComboOption, PoContainerModule, PoFieldModule, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { PedidosService } from '../../services/pedidos.service';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-formulario-pedidos',
  standalone: true,
  imports: [PoButtonModule, PoFieldModule, FormsModule, PoContainerModule, PoTableModule],
  templateUrl: './formulario-pedidos.component.html',
  styleUrl: './formulario-pedidos.component.css'
})
export class FormularioPedidosComponent implements OnInit {

  item: any = {
    id_produto: 0,
    descricao: "",
    quantidade: 0,
    preco_unitario: 0
  }

  pedido:any = {
    id: 0,
    id_cliente: 0,
    condicao_pagamento: '',
    observacao: '',
    itens: []
  }

  cliente:any 
  clientes:any = []

  constructor(private router: Router, private pedidosService: PedidosService, private clientesService: ClientesService){
    let state = router.getCurrentNavigation()?.extras.state;

    if(state){
      this.pedido = state['pedidoAlterar']
    }
  }

  async ngOnInit() {
    this.pedido.itens = await this.getItens()
    this.clientes = await this.getCliente()
  }

  async getItens() {
    return new Promise( (resolve) => {
      this.pedidosService.getItensPedidoApi(this.pedido).subscribe({
        next: (p) => {
          resolve(p)
        }
      })
    })
  }

  async getCliente(path = '') {
    return new Promise( (resolve) => {
      this.clientesService.getClientesApi(path).subscribe({
        next: (c) => { 
          resolve(c)
        }
      })
    })
  }

  paginaListarPedidos(){
    this.router.navigate(['/listagem-pedidos'])
  }

  public readonly colunasItens: Array<PoTableColumn> = [
    { property: "id_produto", label: "ID Produto" },
    { property: "descricao", label: "Descrição" },
    { property: "quantidade", label: "Quantidade" },
    { property: "preco_unitario", label: "Preço Unitário" },

  ]

  adicionarItem(){
    this.pedido.itens.push(this.item);
    this.item = {
          id_produto: 0,
          descricao: "",
          quantidade: 0,
          preco_unitario: 0
        }
  }

  salvar(){
    if(this.pedido.id == 0){
      this.addPedido(this.pedido);
    }else{
      this.editPedido(this.pedido);
    }
    this.router.navigate(['/listagem-pedidos']);
  }

  addPedido(pedido: any){
    this.pedidosService.postPedidosApi(pedido).subscribe({
      next: (dado) => {
        console.log(dado)  
      },
      error: (error) => console.log(error)
    })
  }

  editPedido(pedido: any){
    this.pedidosService.editPedidosApi(pedido).subscribe({
      next: (pedido) => console.log(pedido),
      error: (error) => console.log(error)
    })
  }

}
