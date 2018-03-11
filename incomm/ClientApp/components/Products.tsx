import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface Product {
     id: number;
     name: string;
     description: string;
}

interface ProductsState {
     loading: boolean;
     products: Product[];
     selected: number;
     selectionMade: boolean;
}

export class Products extends React.Component<RouteComponentProps<{}>, ProductsState> {
     constructor() {
          super();
          this.state = {
               loading: true,
               products: [{ id: 0, name: "", description: "" }],
               selected: 0,
               selectionMade: false
          };
     }

     public render() {
          let contents = this.state.loading ? <p><em>Loading...</em></p> : this.showProducts(this.state.products);

          return <div>
               <h1>Products</h1>
               <label>Product ID:</label>
               <input type="number" className="numberInput" onChange={(e) => this.setSelected(parseInt(e.target.value))} />
               <div className="fetchButtons">
                    <button disabled={!this.state.selectionMade} onClick={() => { this.fetchProduct(this.state.selected) }}>Get Product</button>
                    <button onClick={() => { this.fetchProducts() }}>Get All</button>
               </div>
               {contents}
          </div>;
     }

     private setSelected(selectedId: number) {
          this.setState({
               loading: this.state.loading,
               products: this.state.products,
               selected: selectedId,
               selectionMade: true
          });
          if (isNaN(selectedId) || selectedId < 1) {
               this.setState({
                    selectionMade: false
               });
          };
     }

     private showProducts(products: Product[]) {
          return <table className='table'>
               <thead>
                    <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Description</th>
                    </tr>
               </thead>
               <tbody>
                    {products.map(p =>
                         <tr key={p.id}>
                              <td>{p.id}</td>
                              <td>{p.name}</td>
                              <td>{p.description}</td>
                         </tr>
                    )}
               </tbody>
          </table>;
     }

     private fetchProduct(id: number) {
          fetch('http://localhost:60355/api/products/' + id)
               .then(response => response.json() as Promise<Product>)
               .then(responsedata => {
                    this.setState({ loading: false, products: [responsedata], selected: this.state.selected, selectionMade: this.state.selectionMade });
               });

     }

     private fetchProducts() {
          fetch('http://localhost:60355/api/products')
               .then(response => response.json() as Promise<Product[]>)
               .then(responsedata => {
                    this.setState({ loading: false, products: responsedata, selected: this.state.selected, selectionMade: this.state.selectionMade });
               });

     }

}
