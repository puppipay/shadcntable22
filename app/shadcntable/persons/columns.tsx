"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../lib/people";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {MoreHorizontal} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Person>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    {
        header: 'Person id',
        accessorKey: "id"
    },
    {
        header: 'Email',
        accessorKey: "email"
    },
    {
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => {
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    } >
                    First
                </Button >
            )


        },
        //enableSorting: true,
        accessorKey: "first_name"
    },
    {
        header: 'Last',
        accessorKey: "last_name"
    },
    {
        header: 'Date of birth',
        accessorKey: "dateofbirth",
        cell: ({ row }) => {
            return new Date(row.getValue("dateofbirth")).toLocaleDateString();

        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const user = row.original
            return (
                <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.first_name)}
            >
              Copy first name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
          </DropdownMenuContent>
        </DropdownMenu>
            )
        }
    }



];


