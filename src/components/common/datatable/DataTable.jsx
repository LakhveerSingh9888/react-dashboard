import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import clsx from 'clsx';

const DataTable = ({
    columns,
    data,
    totalItems,
    pageSize = 10,
    onPageChange,
    onPageSizeChange,
    onSelectionChange,
    isLoading = false,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSize, setCurrentSize] = useState(pageSize);
    const [selectedRows, setSelectedRows] = useState(new Set());

    // Reset selection when data changes (optional, depends on requirements)
    // For now, we keep it simple.

    useEffect(() => {
        if (onPageChange) {
            // Controlled pagination
        } else {
            // Local pagination logic if needed, but for this demo we assume controlled or simple
        }
    }, [currentPage, onPageChange]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = new Set(data.map((row) => row.id));
            setSelectedRows(allIds);
            onSelectionChange?.(Array.from(allIds));
        } else {
            setSelectedRows(new Set());
            onSelectionChange?.([]);
        }
    };

    const handleSelectRow = (id) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
        onSelectionChange?.(Array.from(newSelected));
    };

    const isAllSelected = data.length > 0 && selectedRows.size === data.length;
    const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length;

    // Calculate pages
    const totalPages = Math.ceil(totalItems / currentSize);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        onPageChange?.(page);
    };

    const handlePageSizeChange = (size) => {
        setCurrentSize(size);
        setCurrentPage(1); // Reset to first page
    };

    return (
        <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg bg-white dark:bg-gray-800 dark:ring-gray-700">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 z-10 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
                            </div>
                        )}
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                                        <input
                                            type="checkbox"
                                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                            checked={isAllSelected}
                                            ref={(input) => {
                                                if (input) input.indeterminate = isIndeterminate;
                                            }}
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            scope="col"
                                            className={clsx(
                                                "py-3.5 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300 sm:pl-0",
                                                col.className
                                            )}
                                        >
                                            {col.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                                {data.map((row) => (
                                    <tr key={row.id} className={selectedRows.has(row.id) ? 'bg-gray-50 dark:bg-gray-700/50' : undefined}>
                                        <td className="relative px-7 sm:w-12 sm:px-6">
                                            {selectedRows.has(row.id) && (
                                                <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600 dark:bg-indigo-400" />
                                            )}
                                            <input
                                                type="checkbox"
                                                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                                                checked={selectedRows.has(row.id)}
                                                onChange={() => handleSelectRow(row.id)}
                                            />
                                        </td>
                                        {columns.map((col) => (
                                            <td
                                                key={`${row.id}-${col.key}`}
                                                className={clsx(
                                                    "whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0 text-gray-900 dark:text-gray-200",
                                                    col.cellClassName
                                                )}
                                            >
                                                {col.render ? col.render(row) : row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            pageSize={currentSize}
                            onPageSizeChange={handlePageSizeChange}
                            totalItems={totalItems}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            header: PropTypes.string.isRequired,
            render: PropTypes.func,
            className: PropTypes.string,
            cellClassName: PropTypes.string,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    onPageChange: PropTypes.func,
    onPageSizeChange: PropTypes.func,
    onSelectionChange: PropTypes.func,
    isLoading: PropTypes.bool,
};

export default DataTable;
