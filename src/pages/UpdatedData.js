import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminNavbar from '../components/AdminNavbar';

export default function UpdatedData() {
    const tableRef = useRef();

    const [data, setData] = useState([])

    async function customerData() {
        const response = await axios.get("http://localhost:5000/customer/customer")
        setData(response.data.customer)
    };

    async function refreshData() {
        try {
            const response = await axios.get("http://localhost:5000/customer/customer");
            setData(response.data.customer);
            Swal.fire({
                title: 'Data Refreshed',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error(error.message);
        }
    };
    function handleDelete(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/customer/delete/${id}`)
                    .then((res) => {
                        Swal.fire({
                            title: 'Deleted',
                            text: "Your file has been deleted",
                            icon: 'success',
                            confirmButtonColor: 'Black',
                            confirmButtonText: 'Ok'
                        })
                            .then(() => {
                                refreshData();
                            });
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        });
    };
    useEffect(() => {
        customerData();
    }, [])
    return (
        <div>
            <AdminNavbar />
            <h2 className='customer-data text-center my-2'>Customers Data</h2><br />
            <div className="text-center mb-3">
                <Link to={"/addcustomer"}><button type="submit" className='btn btn-dark'> Add new customer</button></Link><br />
            </div>
            <div className='container d-flex align-items-center justify-content-center '>
                <div className='card p-4 w-100 my-3 mx-auto' style={{ width: 'auto' }}>
                    <TableContainer ref={tableRef}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Phone</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.map((val, index) => {
                                        const { name, email, address, contact, _id } = val
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>{email}</TableCell>
                                                <TableCell>{address}</TableCell>
                                                <TableCell>{contact}</TableCell>
                                                <TableCell>
                                                    <Link to={'/viewfile'}><Button>View</Button></Link>
                                                    <Link to={`/updateform/${_id}`}><Button>Edit</Button></Link>
                                                    <Button onClick={() => handleDelete(_id)}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
