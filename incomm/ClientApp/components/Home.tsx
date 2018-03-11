import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Hello, InComm!</h1>
            <p>This is a demonstrator of contemporary technologies used at InComm:</p>
            <ul>
                  <li>React</li>
                  <li>Extension methods</li>
                  <li>Dapper to SQL</li>
                  <li>Raven NoSQL</li>
                  <li>Microservice architecture</li>
            </ul>
        </div>;
    }
}
