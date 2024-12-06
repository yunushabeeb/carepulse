'use client';

import {
  getPaginationRowModel, // Function to handle pagination for rows
  ColumnDef, // Type for defining columns
  flexRender, // Function to render column content dynamically
  getCoreRowModel, // Function to get core row model
  useReactTable, // Hook to manage the table state and functionality
} from '@tanstack/react-table';
import Image from 'next/image'; // For rendering images (like for the pagination arrows)
import { redirect } from 'next/navigation'; // For redirecting if conditions aren't met
import { useEffect } from 'react'; // For side effects in functional components

import { Button } from '@/components/ui/button'; // Custom Button component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Custom Table components
import { decryptKey } from '@/lib/utils'; // Utility function for decrypting the key

// Props definition for the DataTable component
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; // Columns definition for the table
  data: TData[]; // Data for populating the table
}

// The DataTable component itself
const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  // Retrieving the encrypted access key from local storage (only on the client side)
  const encryptedKey =
    typeof window !== 'undefined'
      ? window.localStorage.getItem('accessKey')
      : null;

  // UseEffect to handle the redirection if the access key is invalid
  useEffect(() => {
    // Decrypt the access key and compare it to the stored environment variable
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (accessKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
      redirect('/'); // If the key is invalid, redirect to the homepage
    }
  }, [encryptedKey]); // Dependency on encryptedKey to trigger the effect when it changes

  // Setting up the table using useReactTable hook
  const table = useReactTable({
    data, // Data to be rendered in the table
    columns, // Columns to be rendered in the table
    getCoreRowModel: getCoreRowModel(), // Core row model handling
    getPaginationRowModel: getPaginationRowModel(), // Pagination row model handling
  });

  return (
    <div className="data-table">
      {/* Main Table structure */}
      <Table className="shad-table">
        {/* Table Header */}
        <TableHeader className=" bg-dark-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="shad-table-row-header">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null // Do not render anything for placeholders
                      : flexRender(
                          header.column.columnDef.header, // Render dynamic column headers
                          header.getContext() // Get context for the header rendering
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {/* If there are rows in the data, render them */}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="shad-table-row"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
                    {/* Render each cell dynamically */}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // If no rows, show a message
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="table-actions">
        {/* Button for previous page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()} // Handle previous page action
          disabled={!table.getCanPreviousPage()} // Disable if there are no previous pages
          className="shad-gray-btn"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="arrow"
          />
        </Button>

        {/* Button for next page */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()} // Handle next page action
          disabled={!table.getCanNextPage()} // Disable if there are no next pages
          className="shad-gray-btn"
        >
          <Image
            src="/assets/icons/arrow.svg"
            width={24}
            height={24}
            alt="arrow "
            className="rotate-180" // Rotate the arrow for next page
          />
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
