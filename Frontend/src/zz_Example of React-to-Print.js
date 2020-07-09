// ===== Example -1 ==== working well ==================================
import React from "react";
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {
    render() {
        return (
            <table>
                <thead>
                    <th>column 1</th>
                    <th>column 2</th>
                    <th>column 3</th>
                </thead>
                <tbody>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

class Example extends React.Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => <a href="#">Print this out!</a>}
                    content={() => this.componentRef}
                />
                <ComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
        );
    }
}

export default Example;

// ======= Example -2 ===========================================================
// This's an alternative for stateless component:

import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

class ComponentToPrint extends React.PureComponent {
    render() {
        return (
            <table>
                <thead>
                    <th>column 1</th>
                    <th>column 2</th>
                    <th>column 3</th>
                </thead>
                <tbody>
                    <tr>
                        <td>data 1</td>
                        <td>data 2</td>
                        <td>data 3</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const Example = () => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />
            <ComponentToPrint ref={componentRef} />
        </div>
    );
};
export default Example;


// ======= Example -3 ======  OMS code =========================================

<Accordion.Content active={activeIndex === index}>
    <Icon name='envelope' />
    <Button inverted color='red' size='small'
        onClick={this.emailDetailHandler(order.id)}>Email</Button>
    <Icon name='print' />
    <ReactToPrint
        trigger={() => <Button inverted color='red' size='small'>Print</Button>}
        content={() => localRef} />
    <OrderToPrint order={order} ref={el => (localRef = el)} key={order.id} />

</Accordion.Content>