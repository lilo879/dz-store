import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from API or database
        const fetchOrders = async () => {
            // Replace with your API endpoint
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    const deleteOrder = async (orderId) => {
        // Logic to delete order
        await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
        setOrders(orders.filter(order => order.id !== orderId));
    };

    const markAsProcessed = async (orderId) => {
        // Logic to mark order as processed
        await fetch(`/api/orders/${orderId}/process`, { method: 'PUT' });
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, processed: true } : order
        ));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Order Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Wilaya</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.orderNumber}</td>
                            <td>{order.name}</td>
                            <td>{order.address}</td>
                            <td>{order.wilaya}</td>
                            <td>{order.products.join(', ')}</td>
                            <td>${order.total}</td>
                            <td>
                                <button onClick={() => deleteOrder(order.id)}>Delete</button>
                                <button onClick={() => markAsProcessed(order.id)}>Mark as Processed</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;