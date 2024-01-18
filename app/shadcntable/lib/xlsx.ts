import xlsx, {IJsonSheet, IContent} from "json-as-xlsx";

import { Person, people } from "./people";


export type dataProps<TData> = {
    data: TData[]
};

export function Specificdownloadtoxls<TData>({data}: dataProps<TData> )
{

    let columns: IJsonSheet[] = [
        {
          sheet: "Persons",
          columns: [
            { label: "Person ID", value: "id" },
            { label: "First Name", value: "first_name" },
            { label: "Last Name", value: "last_name" },
            { label: "Email", value: "email" },
            { label: "Gender", value: "gender" },
            {
              label: "Date of Birth",
              value: (row) => new Date(row.dateofbirth as string).toLocaleDateString(),
            },
          ],
          content: data as IContent[]//people,
        },
      ];
    
      let settings = {
        fileName: "People Excel",
      };
    
      xlsx(columns, settings);

}


export function downloadtoxls()
{

    let columns: IJsonSheet[] = [
        {
          sheet: "Persons",
          columns: [
            { label: "Person ID", value: "id" },
            { label: "First Name", value: "first_name" },
            { label: "Last Name", value: "last_name" },
            { label: "Email", value: "email" },
            { label: "Gender", value: "gender" },
            {
              label: "Date of Birth",
              value: (row) => new Date(row.dateofbirth as string).toLocaleDateString(),
            },
          ],
          content: people,
        },
      ];
    
      let settings = {
        fileName: "People Excel",
      };
    
      xlsx(columns, settings);

}

