import * as React from "react";

export interface HomeProps { compiler: string; framework: string; }

// Functional component
/* export const Home = (props: HomeProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>; */

// Class Component
export class Home extends React.Component<HomeProps, undefined> {
    render() {
        return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}