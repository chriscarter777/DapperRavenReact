import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface Customer {
     id: number;
     name: string;
     address: string;
}
interface CustomersState {
     customers: Customer[];
     loading: boolean;
     selected: number;
     selectionMade: boolean;
}

export class Customers extends React.Component<RouteComponentProps<{}>, CustomersState> {
     constructor() {
          super();
          this.state = {
               customers: [{ id: 0, name: "", address: "" }],
               loading: true,
               selected: 0,
               selectionMade: false
          };
     }

     public render() {
          let contents = this.state.loading ? <p><em>Loading...</em></p> : this.showCustomers(this.state.customers);

          return <div>
               <h1>Customers</h1>
               <label>Customer ID:</label>
               <input type="number" className="numberInput" onChange={(e) => this.setSelected(parseInt(e.target.value))} />
               <div className="fetchButtons">
                    <button disabled={!this.state.selectionMade} onClick={() => { this.fetchCustomer(this.state.selected) }}>Get Customer</button>
                    <button onClick={() => { this.fetchCustomers() }}>Get All</button>
               </div>
               {contents}
          </div>;
     }

     private setSelected(selectedId: number) {
          this.setState({
               customers: this.state.customers,
               loading: this.state.loading,
               selected: selectedId,
               selectionMade: true
          });
          if (isNaN(selectedId) || selectedId < 1){
               this.setState({
                    selectionMade: false
               });
          };
     }

     private showCustomers(customers: Customer[]) {
          return <table className='table'>
               <thead>
                    <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Address</th>
                    </tr>
               </thead>
               <tbody>
                    {customers.map(c =>
                         <tr key={c.id}>
                              <td>{c.id}</td>
                              <td>{c.name}</td>
                              <td>{c.address}</td>
                         </tr>
                    )}
               </tbody>
          </table>;
     }

     private fetchCustomer(id: number) {
          fetch('http://localhost:60352/api/customers/' + id)
               .then(response => response.json() as Promise<Customer>)
               .then(responsedata => {
                    this.setState({ customers: [responsedata], loading: false, selected: this.state.selected, selectionMade: this.state.selectionMade });
               });
     }

     private fetchCustomers() {
          fetch('http://localhost:60352/api/customers')
               .then(response => response.json() as Promise<Customer[]>)
               .then(responsedata => {
                    this.setState({ customers: responsedata, loading: false, selected: this.state.selected, selectionMade: this.state.selectionMade });
               });
     }
}
