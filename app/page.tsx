import React from 'react'


import PeopleDataTable from './shadcntable/persons/data-table';


import {columns} from './shadcntable/persons/columns';
import { people } from './shadcntable/lib/people';

type Props = {}

const page = (props: Props) => {
    return (
        <div className='container mx-auto py-4'>
            <PeopleDataTable columns={columns} data={people} />


        </div>
    )
}

export default page