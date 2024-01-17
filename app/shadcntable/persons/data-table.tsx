"use client";

import React from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


type Props = {}

export function PeopleDataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

// row select change

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        
        
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            rowSelection,
            columnFilters
        }
    },
    )

    return (
        <div className="py-4 my-4">
            
        <div className='flex flex-col items-start p-3 bg-gray-100'>
            
            <ol >
                <li>
                - Search (filter) by - Email, first name , last name                
                </li>
                <li>
                - Action on row - To copy first name to clipboard  
                </li>
                <li>
                - Sort by - First name  
                </li>
                <li>
                - Navigation - At bottom 
                </li>

                <li>
                - Row Check in first column - Display checked items as action, 
                - also list total selected at bottom
                </li>

                <li>
                  -   Visibility control - not done
                </li>
            </ol>

        </div>



            <div className='flex item-center p-3 mx-auto'>
                <Input placeholder='search email' className='align-left mx-2' 
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("email")?.setFilterValue(event.target.value)
                }
                />
              
              <Input placeholder='search first name' className='align-left mx-2' 
                value={(table.getColumn("first_name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("first_name")?.setFilterValue(event.target.value)
                }
                />
              
              <Input placeholder='search last name' className='align-left mx-2' 
                value={(table.getColumn("last_name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("last_name")?.setFilterValue(event.target.value)
                }
                />
            </div>  
               
            <div className="flex start-2 p-3">
            <Button variant="ghost" onClick={() => {
                    alert("Act on selection " + JSON.stringify(rowSelection));
                }}> Selected Action</Button>
               
                
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup, index) => {
                        return (
                            <TableRow key="index" >

                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key="header.id">

                                            {header.isPlaceholder ? null :
                                                flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )
                                            }
                                        </TableHead>
                                    )
                                })
                                }
                            </TableRow>

                        )
                    }



                    )}

                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            return (
                                <TableRow key="row.id">
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <TableCell key="cell.id">
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }

                                            </TableCell>
                                        ))

                                    }
                                </TableRow>

                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className='h-24 text-center'>
                                No data
                            </TableCell>

                        </TableRow>
                    )
                    }

                </TableBody>
            </Table>
            
            <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
        </div >
        

<div className="flex-1 pb-4 text-sm">
    Selected {table.getFilteredSelectedRowModel().rows.length} of  {"  "}   
    {table.getFilteredRowModel().rows.length}
    </div>            
            
            
            
            </div >
            
    )
}

export default PeopleDataTable