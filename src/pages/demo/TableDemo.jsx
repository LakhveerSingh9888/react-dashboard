import React, { useState } from 'react';
import DataTable from '@components/common/datatable/DataTable';
import ConfirmationModal from '@components/common/modals/ConfirmationModal';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const INITIAL_DATA = [
    {
        id: 1,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        status: 'Active',
        age: 27,
        role: 'Admin',
    },
    {
        id: 2,
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        title: 'Product Directives Officer',
        department: 'Intranet',
        status: 'Inactive',
        age: 43,
        role: 'Owner',
    },
    {
        id: 3,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        title: 'Forward Response Developer',
        department: 'Directives',
        status: 'Active',
        age: 32,
        role: 'Member',
    },
    {
        id: 4,
        name: 'Jenny Wilson',
        email: 'jenny.wilson@example.com',
        avatar: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        title: 'Central Security Manager',
        department: 'Program',
        status: 'Offline',
        age: 29,
        role: 'Member',
    },
    {
        id: 5,
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        avatar: 'https://images.unsplash.com/photo-1532417344469-368f9df6d9b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        title: 'Lean Implementation Liaison',
        department: 'Mobility',
        status: 'Inactive',
        age: 36,
        role: 'Admin',
    },
    {
        id: 6,
        name: 'Cameron Williamson',
        email: 'cameron.williamson@example.com',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
        title: 'Internal Applications Engineer',
        department: 'Security',
        status: 'Active',
        age: 24,
        role: 'Member',
    },
];

const TableDemo = () => {
    const [data, setData] = useState(INITIAL_DATA);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            setData((prev) => prev.filter((item) => item.id !== userToDelete.id));
            toast.success('User deleted successfully');
            setDeleteModalOpen(false);
            setUserToDelete(null);
        }
    };

    // Recalculate pagination based on current data
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Adjust current page if it exceeds total pages after deletion
    if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
    }

    const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const columns = [
        {
            key: 'name',
            header: 'Name',
            render: (row) => (
                <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={row.avatar} alt="" />
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
                        <div className="text-gray-500 dark:text-gray-400">{row.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'title',
            header: 'Title',
            render: (row) => (
                <div className="text-gray-900 dark:text-white">{row.title}</div>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            render: (row) => (
                <span
                    className={clsx(
                        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                        row.status === 'Active'
                            ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30'
                            : row.status === 'Inactive'
                                ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/30 dark:text-yellow-400 dark:ring-yellow-500/30'
                                : 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/30' // Offline
                    )}
                >
                    {row.status.toUpperCase()}
                </span>
            ),
        },
        {
            key: 'age',
            header: 'Age',
            render: (row) => <div className="text-gray-500 dark:text-gray-400">{row.age}</div>,
        },
        {
            key: 'role',
            header: 'Role',
            render: (row) => <div className="text-gray-500 dark:text-gray-400">{row.role}</div>,
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-right',
            cellClassName: 'text-right',
            render: (row) => (
                <button
                    onClick={() => handleDeleteClick(row)}
                    className="text-gray-400 hover:text-red-600 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                    title="Delete User"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            ),
        },
    ];

    return (
        <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Users</h1>
                <DataTable
                    columns={columns}
                    data={currentData}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={setPageSize}
                    onSelectionChange={(selected) => console.log('Selected:', selected)}
                />
            </div>

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
                confirmText="Delete"
                type="danger"
            />
        </div>
    );
};

export default TableDemo;

